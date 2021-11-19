/*global SkiaApi*/
import type { ImageSourcePropType } from "react-native";

import type { TileMode } from "../ImageFilter";
import type { Shader } from "../Shader";
import type { Matrix } from "../Matrix";
import type { SkJsiInstane } from "../JsiInstance";

const resolveAssetSource = require("react-native/Libraries/Image/resolveAssetSource");

export enum FilterMode {
  Linear,
  Nearest,
}

export enum MipmapMode {
  None,
  Nearest,
  Linear,
}

export interface Image extends SkJsiInstane<"Image"> {
  /**
   * Returns the possibly scaled height of the image.
   */
  height(): number;

  /**
   * Returns the possibly scaled width of the image.
   */
  width(): number;

  readonly uri: string;

  /**
   * Returns this image as a shader with the specified tiling. It will use cubic sampling.
   * @param tx - tile mode in the x direction.
   * @param ty - tile mode in the y direction.
   * @param fm - The filter mode. (default nearest)
   * @param mm - The mipmap mode. Note: for settings other than None, the image must have mipmaps (default none)
   *             calculated with makeCopyWithDefaultMipmaps;
   * @param localMatrix
   */
  makeShaderOptions(
    tx: TileMode,
    ty: TileMode,
    fm: FilterMode,
    mm: MipmapMode,
    localMatrix?: Matrix
  ): Shader;

  /**
   * Returns this image as a shader with the specified tiling. It will use cubic sampling.
   * @param tx - tile mode in the x direction.
   * @param ty - tile mode in the y direction.
   * @param B - See CubicResampler in SkSamplingOptions.h for more information
   * @param C - See CubicResampler in SkSamplingOptions.h for more information
   * @param localMatrix
   */
  makeShaderCubic(
    tx: TileMode,
    ty: TileMode,
    B: number,
    C: number,
    localMatrix?: Matrix
  ): Shader;
}

export const ImageCtor = (image: ImageSourcePropType) => {
  const asset = resolveAssetSource(image);
  return SkiaApi.Image(asset.uri);
};