import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";

const ScreenComponent = ({ children, style }) => {
  const heightConst = Constants.statusBarHeight;

  return (
    <View style={[{ marginTop: heightConst, flex: 1 }, style]}>{children}</View>
  );
};

export default ScreenComponent;
