import { DefaultTheme } from "react-native-paper";
import appColors from "./appColors";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: appColors.primary,
    accent: appColors.light,
  },
};

export default theme;
