import { Dimensions } from "react-native";

export const w = Dimensions.get("screen").width;

export const convert = (value: number): number => {
  const fontScale = Dimensions.get("screen").fontScale;

  if (value === undefined) {
    return 16 * 0.800000011920929;
  }

  if (fontScale > 0.800000011920929) {
    return value * 1;
  }

  return value;
};
