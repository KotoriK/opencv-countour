import VectorSource from "ol/source/Vector";
import { createSignal } from "solid-js";
export const sourceSignal = createSignal<Blob | undefined>();

export const srcCanvasSignal = createSignal<HTMLCanvasElement>();
export const coordInspecingSignal = createSignal<readonly [number, number]>();
export const srcImageSizePromiseSignal = createSignal<Promise<[number, number]>>()
export const vectorSource = new VectorSource({ useSpatialIndex: false })

