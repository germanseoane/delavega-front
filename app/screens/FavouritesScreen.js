import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import FavouritesList from "../components/FavouritesList";
import ScreenComponent from "../components/ScreenComponent";
import { useProductsContext } from "../context/productsContext";
import appColors from "../styles/appColors";

const FavouritesScreen = () => {
  const { products } = useProductsContext();

  return (
    <ScreenComponent>
      <Text style={styles.title}>Tus favoritos</Text>
      <ScrollView style={styles.container}>
        <FavouritesList products={products} />
        <View style={{ height: 40 }}></View>
      </ScrollView>
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: {
    fontSize: 18,
    color: appColors.dark,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
});

export default FavouritesScreen;
