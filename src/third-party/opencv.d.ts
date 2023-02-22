/**
 * OpenCV.js中的cv命名空间。
 * @generator ChatGPT
 */
declare namespace cv {
    //#region object
    /**
     * 代表了一个Mat对象的向量。
     * @author ChatGPT
     * @lib opencv
     */
    class MatVector {
        /**
         * 创建一个空的MatVector对象。
         */
        public constructor();

        /**
         * 创建一个指定大小的MatVector对象。
         * @param size 向量的大小。
         */
        public constructor(size: number);

        /**
         * 从一个Mat对象数组中创建一个MatVector对象。
         * @param array 要创建向量的Mat对象数组。
         */
        public constructor(array: Mat[]);

        /**
         * 删除MatVector对象并释放其内存。
         */
        public delete(): void;

        /**
         * 获取指定位置的Mat对象。
         * @param i 要获取的Mat对象的索引。
         */
        public get(i: number): Mat;

        /**
         * 向向量的末尾添加一个Mat对象。
         * @param mat 要添加到向量的Mat对象。
         */
        public push_back(mat: Mat): void;

        /**
         * 获取向量中Mat对象的数量。
         */
        public size(): number;
        /**
           * 在向量中设置指定位置的Mat对象。
           * @param i 要设置的Mat对象的索引。
           * @param mat 要设置的Mat对象。
           */
        public set(i: number, mat: Mat): void;
    }
    /**
     * 代表一个二维矩阵。
     * @author ChatGPT
     * @lib opencv
     */
    class Mat {
        /**
         * 创建一个空的Mat对象。
         */
        public constructor();

        public static zeros(rows: number, cols: number, type: number): Mat
        /**
         * 创建一个指定大小和类型的Mat对象。
         * @param rows 矩阵的行数。
         * @param cols 矩阵的列数。
         * @param type 矩阵的类型。
         */
        public constructor(rows: number, cols: number, type: number);

        /**
         * 删除Mat对象并释放其内存。
         */
        public delete(): void;

        /**
         * 获取矩阵中指定位置的像素值。
         * @param row 要获取的像素值的行坐标。
         * @param col 要获取的像素值的列坐标。
         */
        public at(row: number, col: number): number;

        /**
         * 将矩阵转换为灰度图像。
         */
        public convertToGray(): void;

        /**
         * 将矩阵的像素值全部设置为指定值。
         * @param value 要设置的像素值。
         */
        public setTo(value: number): void;

        /**
         * 获取/设置矩阵的宽度。
         */
        public cols: number;

        /**
         * 获取/设置矩阵的高度。
         */
        public rows: number;
        public row(i: number): number[]
        public col(i: number): number[]
        /**
         * 获取矩阵的总像素数。
         */
        public total(): number;

        /**
         * 获取矩阵的数据类型。
         */
        public type(): number;
        public data32S: Int32Array
        /**
         * 裁剪矩形区域，返回一个裁剪后的子矩阵
         * @param rect 需要裁剪的矩形区域
         * @returns 裁剪后的子矩阵
         */
        public roi(rect: cv.Rect): cv.Mat;
    }
    /**
     *  表示二维平面上的一个点，由 x 和 y 坐标组成。在 OpenCV 库中，它通常用于指定图像的像素坐标
     */
    class Point {
        x: number;
        y: number;
        constructor(x?: number, y?: number);
    }
    /**
     *  表示一个多通道的颜色值，由 val1、val2、val3 和 val4 四个分量组成。在 OpenCV 库中，它通常用于设置像素的颜色值，或表示图像中的一个区域的颜色特征。
     */
    class Scalar {
        val1: number;
        val2: number;
        val3: number;
        val4: number;
        constructor(v0?: number, v1?: number, v2?: number, v3?: number);
    }

    /**
     *  表示二维平面上的一个矩形区域，由左上角的点的坐标、矩形的宽度和高度组成。在 OpenCV 库中，它通常用于指定图像的一个子区域或者表示一个对象的位置和大小。
     */
    class Rect {
        x: number;
        y: number;
        width: number;
        height: number;
        constructor(x?: number, y?: number, w?: number, h?: number);
    }

    //#endregion object
    function imread(imageSource: string | HTMLImageElement | HTMLCanvasElement): Mat;
    /**
     * 在指定的 HTML 元素上显示图像。
     *
     * @param {string | HTMLCanvasElement | HTMLImageElement} canvasSource - HTML 元素的 ID 或者对 HTML 元素的引用。
     * @param {Mat} mat - 要显示的图像。
     */
    function imshow(canvasSource: string | HTMLCanvasElement | HTMLImageElement, mat: Mat): void;

    //#region IMGPROC
    /**
     * FloodFill函数，从种子点开始填充连通区域。填充时，像素的连通性由connectivity参数决定。
     *
     * @param image - 输入图像，必须是单通道或三通道8位图像。类型：cv.Mat
     * @param mask - 掩膜图像，用于指定哪些位置可以进行填充。可以为空，表示填充整个图像。类型：cv.Mat
     * @param seedPoint - 填充的起始点。类型：cv.Point
     * @param newVal - 填充的新颜色。类型：cv.Scalar
     * @param rect - 可选参数，返回最小外接矩形。默认为空。类型：cv.Rect
     * @param loDiff - 可选参数，低灰度差值。当当前像素与相邻像素之间的灰度值差异低于loDiff时，会填充这个像素。默认为0。类型：cv.Scalar
     * @param upDiff - 可选参数，高灰度差值。当当前像素与相邻像素之间的灰度值差异高于upDiff时，不会填充这个像素。默认为0。类型：cv.Scalar
     * @param flags - 可选参数，填充算法的标志。默认为4。类型：number
     *
     * @returns 填充区域的像素数量。
     *
     * @see [OpenCV Documentation - cv.floodFill()](https://docs.opencv.org/master/d9/df8/group__imgproc__draw.html#ga2aa4b04f2f23ec4d4330f3f58f4031ed)
     * @author ChatGPT
     */
    function floodFill(
        image: cv.Mat,
        mask: cv.Mat,
        seedPoint: cv.Point,
        newVal: cv.Scalar,
        rect: cv.Rect,
        loDiff: cv.Scalar,
        upDiff: cv.Scalar,
        flags: number
    ): number;

    /**
     * 在二值图像中寻找轮廓。
     * @param src 输入图像，必须是单通道、二值化的。
     * @param contours 存储输出的轮廓数组。
     * @param hierarchy 可选的输出向量，包含了图像中所有轮廓的拓扑结构。
     * @param mode 轮廓查找模式。
     * @param method 轮廓逼近方法。
     * @param offset 可选的点偏移量。
     */
    function findContours(
        src: cv.Mat,
        contours: cv.MatVector,
        hierarchy?: cv.Mat,
        mode?: cv.ContourRetrievalModes,
        method?: cv.ContourApproximationModes,
        offset?: cv.Point
    ): void;

    /**将 RGB 彩色图像转换为灰度图像 */
    const COLOR_RGB2GRAY = 6
    /**将 BGR 彩色图像转换为 HSV 颜色空间 */
    const COLOR_BGR2HSV = 40
    /**将 BGR 彩色图像转换为灰度图像 */
    const COLOR_BGR2GRAY = 6
    const COLOR_RGBA2RGB = 2
    const enum ColorConvertCode {
        /**将 RGB 彩色图像转换为灰度图像 */
        COLOR_RGB2GRAY = cv.COLOR_RGB2GRAY,
        /**将 BGR 彩色图像转换为 HSV 颜色空间 */
        COLOR_BGR2HSV = cv.COLOR_BGR2HSV,
        /**将 BGR 彩色图像转换为灰度图像 */
        COLOR_BGR2GRAY = cv.COLOR_BGR2GRAY,
        /**剔除 RGBA 彩色图像中的Alpha通道 */
        COLOR_RGBA2RGB = cv.COLOR_RGBA2RGB
    }
    /**
     * 将输入图像从一种颜色空间转换为另一种颜色空间。
     * @param src 输入图像。
     * @param dst 输出图像。
     * @param code 转换的颜色空间代码。参考 OpenCV 文档中的颜色空间转换代码。
     * @param dstCn 目标图像的通道数。可选参数，默认值为 0，表示与输入图像保持一致。
     */
    function cvtColor(src: cv.Mat, dst: cv.Mat, code: ColorConvertCode, dstCn = 0): void;

    //#endregion
    //#region Core模块常量
    const CV_8U: number;     // 无符号8位整数
    const CV_8S: number;     // 有符号8位整数
    const CV_16U: number;    // 无符号16位整数
    const CV_16S: number;    // 有符号16位整数
    const CV_32S: number;    // 有符号32位整数
    const CV_32F: number;    // 单精度浮点数
    const CV_64F: number;    // 双精度浮点数
    const CV_USRTYPE1: number;   // 用户自定义类型1
    const CV_16F: number;    // 16位浮点数
    //#endregion
    //#region  Types模块常量
    const CV_8UC: number;    // 8位无符号整数类型（单通道）
    const CV_8SC: number;    // 8位有符号整数类型（单通道）
    const CV_16UC: number;   // 16位无符号整数类型（单通道）
    const CV_16SC: number;   // 16位有符号整数类型（单通道）
    const CV_32SC: number;   // 32位有符号整数类型（单通道）
    const CV_32FC: number;   // 32位浮点数类型（单通道）
    const CV_64FC: number;   // 64位浮点数类型（单通道）
    //#endregion
    //#region  Imgproc模块常量
    const CV_8UC1C4: number;     // 8位无符号整数类型（1通道，4通道）
    const CV_8UC3C4: number;     // 8位无符号整数类型（3通道，4通道）
    const CV_16UC1C4: number;    // 16位无符号整数类型（1通道，4通道）
    const CV_16UC3C4: number;    // 16位无符号整数类型（3通道，4通道）
    const CV_32SC1C4: number;    // 32位有符号整数类型（1通道，4通道）
    const CV_32SC3C4: number;    // 32位有符号整数类型（3通道，4通道）
    const CV_32FC1C4: number;    // 32位浮点数类型（1通道，4通道）
    const CV_32FC3C4: number;    // 32位浮点数类型（3通道，4通道）
    const CV_64FC1C4: number;    // 64位浮点数类型（1通道，4通道）
    const CV_64FC3C4: number;    // 64位浮点数类型（3通道，4通道）
    //#endregion
    const BORDER_CONSTANT: number;        // 边框模式：常数边界
    const BORDER_REPLICATE: number;       // 边框模式：复制边

    //#region Contour
    /**只返回最外层轮廓 */
    const RETR_EXTERNAL = 0;
    /**返回所有轮廓，但不建立父子关系。 */
    const RETR_LIST = 1;
    /**返回所有轮廓，并将它们分为两级组织，即外层和内层轮廓。 */
    const RETR_CCOMP = 2;
    /**返回所有轮廓，并建立完整的轮廓树，包括每个轮廓的父子关系。 */
    const RETR_TREE = 3;
    /**通过洪水填充法查找轮廓。 */
    const RETR_FLOODFILL = 4;
    /**
     * 轮廓查找模式。
     */
    const enum ContourRetrievalModes {
        /** 只返回最外层轮廓。对应 cv.RETR_EXTERNAL */
        RETR_EXTERNAL = cv.RETR_EXTERNAL,
        /** 返回所有轮廓，但不建立父子关系。对应 cv.RETR_LIST */
        RETR_LIST = cv.RETR_LIST,
        /** 返回所有轮廓，并将它们分为两级组织，即外层和内层轮廓。对应 cv.RETR_CCOMP */
        RETR_CCOMP = cv.RETR_CCOMP,
        /** 返回所有轮廓，并建立完整的轮廓树，包括每个轮廓的父子关系。对应 cv.RETR_TREE */
        RETR_TREE = cv.RETR_TREE,
        /** 通过洪水填充法查找轮廓。对应 cv.RETR_FLOODFILL */
        RETR_FLOODFILL = cv.RETR_FLOODFILL
    }

    /**不进行轮廓逼近，直接存储所有轮廓上的像素点 */
    const CHAIN_APPROX_NONE = 1;
    /**进行简单的轮廓逼近，压缩冗余的点 */
    const CHAIN_APPROX_SIMPLE = 2;
    /**进行 TC89 算法的 $l_1$ 逼近 */
    const CHAIN_APPROX_TC89_L1 = 3;
    /**进行 TC89 算法的 $kcos$ 逼近 */
    const CHAIN_APPROX_TC89_KCOS = 4;
    /**
     * 轮廓逼近方法。
     */
    enum ContourApproximationModes {
        /** 不进行轮廓逼近，直接存储所有轮廓上的像素点，等价于 cv.CHAIN_APPROX_NONE。 */
        CHAIN_APPROX_NONE = cv.CHAIN_APPROX_NONE,
        /** 进行简单的轮廓逼近，压缩冗余的点，等价于 cv.CHAIN_APPROX_SIMPLE。 */
        CHAIN_APPROX_SIMPLE = cv.CHAIN_APPROX_SIMPLE,
        /** 进行 TC89 算法的 $l_1$ 逼近，等价于 cv.CHAIN_APPROX_TC89_L1。 */
        CHAIN_APPROX_TC89_L1 = cv.CHAIN_APPROX_TC89_L1,
        /** 进行 TC89 算法的 $kcos$ 逼近，等价于 cv.CHAIN_APPROX_TC89_KCOS。 */
        CHAIN_APPROX_TC89_KCOS = cv.CHAIN_APPROX_TC89_KCOS,
        /** @deprecated 已弃用，等价于 cv.CHAIN_APPROX_SIMPLE。 */
        CHAIN_APPROX_TC89_KCOS_NEW = cv.CHAIN_APPROX_SIMPLE
    }
    //#endregion
    //#region floodFill
    /**
     * 像素值在固定的范围内
     * 1 << 16
     */
    const FLOODFILL_FIXED_RANGE = 65536 // 1 << 16
    /**
     * 不填充原始图像，只操作掩膜图像
     * 1 << 17
     */
    const FLOODFILL_MASK_ONLY = 131072 // 1 << 17
    /**
     * 使用 cv::fillConvexPoly 进行内部填充
     * 1 << 20
     */
    const FLOODFILL_CVEXPOBJ = 1048576 // 1 << 20

    enum FloodFillFlags {
        FLOODFILL_FIXED_RANGE = cv.FLOODFILL_FIXED_RANGE, // 像素值在固定的范围内
        FLOODFILL_MASK_ONLY = cv.FLOODFILL_MASK_ONLY, // 不填充原始图像，只操作掩膜图像
        FLOODFILL_CVEXPOBJ = cv.FLOODFILL_CVEXPOBJ // 使用 cv::fillConvexPoly 进行内部填充
    }
    //#endregion
}

export default cv