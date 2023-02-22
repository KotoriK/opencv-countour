import { createEffect, createSignal, on, onMount } from "solid-js";
import Map from "ol/Map";
import { coordInspecingSignal, sourceSignal, srcImageSizePromiseSignal, vectorSource } from "../state";
import StaticImage from 'ol/source/ImageStatic'
import StaticImageLayer from 'ol/layer/Image'
import View from "ol/View";
import { getCenter } from "ol/extent";
import { Projection } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import { Pixel } from "ol/pixel";
import Modify from 'ol/interaction/Modify'
import { defaults } from 'ol/interaction/defaults'
import { MapBrowserEvent } from "ol";

export function OpenLayerView() {
  const imageLayer = new StaticImageLayer()
  const vectorLayer = new VectorLayer({ source: vectorSource, updateWhileAnimating: true, updateWhileInteracting: true })
  const interactions = defaults()
  interactions.push(new Modify({ features: vectorSource.getFeaturesCollection()! }))
  const map = new Map({
    layers: [imageLayer, vectorLayer],
    interactions: interactions
  });
  const [pos, setPos] = createSignal<[number, number] | undefined>()


  onMount(() => {
    let posMouse: Pixel
    const renderCallback = () => {
      if (!posMouse) {
        setPos(undefined);
        return;
      }
      const coord = map.getCoordinateFromPixel(posMouse);
      setPos(coord as [number, number]);

    };
    const handlePointerMove = (e: PointerEvent) => {
      const nextPos = map.getEventPixel(e);
      posMouse = nextPos;
      requestAnimationFrame(renderCallback);
    };
    const handleClick = (e: MapBrowserEvent<MouseEvent>) => {
      const [x, y] = e.coordinate
      const coord = [Math.round(x), -Math.round(y)] as const
      console.log(coord)
      coordInspecingSignal[1](coord)
    }
    imageLayer.on('postrender', renderCallback)
    map.getTargetElement().addEventListener('pointermove', handlePointerMove)
    map.addEventListener('click', handleClick as any)

  })
  createEffect(on(sourceSignal[0], async (blob) => {
    const [width, height] = await srcImageSizePromiseSignal[0]()!
    const imageExtent = [0, -height, width, 0]
    const url = URL.createObjectURL(blob!)

    const projection = new Projection({
      code: 'image',
      units: 'pixels',
      extent: imageExtent,
    });
    const source = new StaticImage({
      url: url,
      imageExtent,
      projection
    })
    if (imageLayer.getSource()) {
      imageLayer.getSource()?.dispose()
    }
    imageLayer.setSource(source)
    const view = new View({
      extent: imageExtent, center: getCenter(imageExtent), projection, zoom: 1,
      maxZoom: 16,
    })

    vectorLayer.setExtent(imageExtent)
    map.setView(view)
  }, { defer: true }))
  return (
    <>
      <div style={{ "max-width": '100vw' }} ref={(ref) => map.setTarget(ref)}>
      </div>
      <div style={{ position: 'absolute', bottom: 0 }} >{pos()?.toString()}</div></>
  );
}
