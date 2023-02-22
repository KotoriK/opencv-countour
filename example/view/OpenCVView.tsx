import { createEffect, on } from "solid-js";
import {
  coordInspecingSignal,
  srcCanvasSignal,
  vectorSource
} from "../state";
import { Feature } from "ol";
import cv from "../../src/third-party/opencv";
import { bufferRect, consturctOpenLayersPolygon, createFloodfillFunction, findContours } from "../../src/proc";

export function OpenCVView() {
  let ref: HTMLCanvasElement | undefined = undefined;
  const floodfill = createFloodfillFunction({ loDiff: new cv.Scalar(50, 50, 50), upDiff: new cv.Scalar(50, 50, 50) })
  createEffect(on([srcCanvasSignal[0], coordInspecingSignal[0]], ([srcCanvas, coord]) => {
    if (coord && srcCanvas) {
      console.time('magstick')
      const srcMat = new cv.Mat()
      const tmpMat = cv.imread(srcCanvas)
      cv.cvtColor(tmpMat, srcMat, cv.COLOR_RGBA2RGB)

      const rect = new cv.Rect()
      const maskMat = floodfill(srcMat, coord, rect)
      bufferRect(rect, 1)
      const polygons = findContours(maskMat, rect)
      console.timeEnd('magstick')

      console.time('send to openlayers')
      const geometry = consturctOpenLayersPolygon(polygons)
      vectorSource.clear(true)
      vectorSource.addFeature(new Feature(geometry))
      console.timeEnd('send to openlayers')
      console.log(geometry,geometry.getPolygons())
      cv.imshow(ref!, maskMat)
      maskMat.delete()
      tmpMat.delete()
      srcMat.delete()
    }
  }, { defer: true }))
  return <>
    <canvas ref={ref} style="max-height:240px;" />
  </>;
}
