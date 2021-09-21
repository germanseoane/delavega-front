import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";

import ScreenComponent from "../components/ScreenComponent";
import LoadingScreen from "../components/LoadingScreen";
import appColors from "../styles/appColors";
import { useProductsContext } from "../context/productsContext";
import ProductsList from "../components/ProductsList";
import SortComponent from "../components/SortComponent";

const ProductsScreen = () => {
  const { products, loading } = useProductsContext();

  if (loading) {
    return <LoadingScreen text="Loading Products" />;
  }
  return (
    <ScreenComponent>
      <View style={styles.dropView}>
        <Text style={styles.text}>Nuestros Productos</Text>
        <SortComponent />
      </View>
      <ScrollView style={styles.container}>
        <ProductsList products={products} />
        <View style={{ marginBottom: 40 }}></View>
      </ScrollView>
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  text: {
    fontSize: 18,
    color: appColors.dark,
    marginTop: 20,

    marginBottom: 10,
  },
  dropView: {
    flexDirection: "row",
    marginBottom: 4,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
});

export default ProductsScreen;
