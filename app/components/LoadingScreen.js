import React from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import appColors from "../styles/appColors";

const LoadingScreen = ({ text }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={true}
        color={appColors.primary}
        size="large"
      />
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default LoadingScreen;
