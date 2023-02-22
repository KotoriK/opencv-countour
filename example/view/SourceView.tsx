import {
  coordInspecingSignal,
  srcCanvasSignal,
  sourceSignal,
  srcImageSizePromiseSignal
} from "../state";
import { createEffect } from "solid-js";

export function SourceView() {

  createEffect(async () => {
    const source = sourceSignal[0];
    const currentSource = source();
    const sourceCanvas = srcCanvasSignal[0]
    if (currentSource) {
      const bitmapPromise = createImageBitmap(currentSource)
      srcImageSizePromiseSignal[1](bitmapPromise.then(bitmap => [bitmap.width, bitmap.height] as [number, number]))
      const bitmap = await bitmapPromise
      const canvas = sourceCanvas()!
      canvas.width = bitmap.width
      canvas.height = bitmap.height
      canvas.getContext('2d')!.drawImage(bitmap, 0, 0)
    }
  })
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const files = (e.target as HTMLInputElement).files;
          if (files!.length === 1) {
            sourceSignal[1](files![0]);
          }
        }}
      />
      <canvas
        ref={srcCanvasSignal[1]}
        style={{ "max-height": "400px" }}
        onClick={(e) => {
          const coord = getOriginalCoord(e.currentTarget, e.offsetX, e.offsetY);
          /* const coord = [e.offsetX, e.offsetY] as const
 */
          coordInspecingSignal[1](coord);
        }}
      />
    </div>
  );
}

/**
 * 找到在原图像尺度上的坐标
 */
function getOriginalCoord(img: HTMLCanvasElement, x: number, y: number) {
  const {
    width: renderWidth,
    height: renderHeight
  } = img.getBoundingClientRect();
  const rateX = img.width / renderWidth;
  const rateY = img.height / renderHeight;
  return [x * rateX, y * rateY] as const;
}
