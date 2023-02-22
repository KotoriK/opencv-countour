import cv from "./third-party/opencv";
import MultiPolygon from "ol/geom/MultiPolygon";
import Polygon from "ol/geom/Polygon";
import LinearRing from "ol/geom/LinearRing";

/* const g_nLowDifference = 35
const g_nUpDifference = 35; //负差最大值、正差最大值 
const lowDiff = new cv.Scalar(g_nLowDifference, g_nLowDifference, g_nLowDifference)
const highDiff = new cv.Scalar(g_nUpDifference, g_nUpDifference, g_nUpDifference) */
const defaultFlag = 4 + (255 << 8) + cv.FLOODFILL_FIXED_RANGE

export interface FloodFillOption {
    loDiff: cv.Scalar,
    upDiff: cv.Scalar,
    flags?: number
}
export function createFloodfillFunction({ loDiff, upDiff, flags = defaultFlag }: FloodFillOption) {
    return function floodfill(srcMat: cv.Mat, coord: readonly [number, number] | [number, number], ccomp: cv.Rect) {
        // 掩模的行数设置为原始图像的行数加2，列数设置为原始图像的列数加2。这是因为洪泛算法需要在图像周围创建一个边界，以防止填充超出图像的范围。
        const maskMat = cv.Mat.zeros(srcMat.rows + 2, srcMat.cols + 2, cv.CV_8U)
        const seedPoint = new cv.Point(...coord)
        const fillColor = new cv.Scalar(1)
        try {
            cv.floodFill(srcMat,
                maskMat,
                seedPoint,
                fillColor,
                ccomp,
                loDiff,
                upDiff,
                flags
            )

            return maskMat
        } catch (error) {
            maskMat.delete()
            throw error
        }
    }
}
/**
 * 寻找边缘并以层级返回边缘点的坐标
 * @param mask 
 * @param rect 仅在指定范围寻找边缘 应该能稍微加快查找速度
 * @returns 
 */
export function findContours(mask: cv.Mat, rect?: cv.Rect) {
    const contours = new cv.MatVector();
    const hierarchy = new cv.Mat();
    try {
        cv.findContours(rect ? mask.roi(rect) : mask, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);

        const size = contours.size()
        const polygons: Record<number, number[][]> = {}

        const coordMapper = rect && ((n: number, i: number) => n + (i % 2 ? rect.y : rect.x))
        for (let i = 0; i < size; i++) {
            const flatCoords = contours.get(i).data32S
            const ring = Array.from(flatCoords, coordMapper! /** 支持这一参数置为undefined */)

            if (ring[ring.length - 1] !== ring[1] || ring[ring.length - 2] !== ring[0]) {
                ring.push(ring[0], ring[1])
            }
            const fatherPos = getHierarchyRow(hierarchy, i)[3]
            if (fatherPos === -1) {
                const polygon = polygons[i]
                if (polygon) {
                    polygon.unshift(ring)
                } else {
                    polygons[i] = [ring]
                }
            } else {
                const polygon = polygons[fatherPos]
                if (polygon) {
                    polygon.push(ring)
                } else {
                    polygons[fatherPos] = [ring]
                }
            }
        }
        return Object.values(polygons)
    } catch (error) {
        throw error
    } finally {
        contours.delete()
        hierarchy.delete()
    }
}
export function consturctOpenLayersPolygon(polygons: number[][][]) {
    /*  const ends = polygons.map(polygon => polygon.map(rings => rings.length))
     const flatCoords = polygons.flat(3).map((n, i) => n === 0 ? n : (i % 2 ? -(n - 0.5) : (n - 0.5)))
     return new MultiPolygon(flatCoords, 'XY', ends) */
    return new MultiPolygon(polygons.map(polygon => new Polygon(polygon.map(ring => new LinearRing(ring, 'XY').getCoordinates().map(([x, y]) => [x - 0.5, -y + 0.5])))))
}
function getHierarchyRow(hierarchy: cv.Mat, row: number) {
    const start = row * 4
    return hierarchy.data32S.slice(start, start + 4)
}
export function bufferRect(rect: cv.Rect, radius: number) {
    const diameter = radius * 2
    rect.x = Math.max(rect.x - radius, 0)
    rect.y = Math.max(rect.y - radius, 0)
    rect.width += diameter
    rect.height += diameter
}