import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import { ScrollView } from "react-native";
import { useToast } from "react-native-toast-notifications";
import CarouselComponent from "../components/CarouselComponent";
import appColors from "../styles/appColors";
import btnStyles from "../styles/btnStyles";
import { useProductsContext } from "../context/productsContext";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";

const SingleProductScreen = ({ route }) => {
  const { product } = route.params;
  const { title, price, description, isFavourite, _id } = product;
  const { setIsFavourite, removeFavourite, addToCart, cart } =
    useProductsContext();
  const navigation = useNavigation();
  const Toast = useToast();

  return (
    <ScrollView>
      <CarouselComponent images={product.images} />
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>{title}</Text>
          <AwesomeIcon
            name="heart"
            color={appColors.appred}
            size={isFavourite ? 22 : 0}
            style={styles.icon}
          />
          <Text style={styles.iconText}>{isFavourite ? "Favorito" : ""}</Text>
        </View>
        <View style={styles.separator}></View>
        <Text style={styles.price}>Precio: ${price.toFixed(2)}</Text>
        <Text style={styles.description}>{description}</Text>
        <Button
          mode="contained"
          style={btnStyles}
          labelStyle={{ color: "white" }}
          onPress={() => {
            const sameProduct = cart.find((item) => item._id === _id);

            if (sameProduct) {
              Toast.show("El producto ya esta en el carrito");
            } else {
              addToCart(_id);
              Toast.show("Producto anadido al carrito ");
              navigation.navigate("products");
            }
          }}
        >
          Comprar
        </Button>
        <Button
          style={btnStyles}
          onPress={() => {
            isFavourite ? removeFavourite(_id) : setIsFavourite(_id);
            Toast.show(
              isFavourite
                ? "Producto removido de Favoritos"
                : "Producto anadido a Favoritos"
            );
            navigation.navigate("products");
          }}
        >
          {isFavourite ? "Remover de favoritos" : "Agregar a favoritos"}
        </Button>
        <Button
          style={styles.back}
          labelStyle={{ color: "grey", fontSize: 12 }}
          icon="arrow-left"
          onPress={() => navigation.navigate("products")}
        >
          Menu de Productos
        </Button>
      </View>
      <View style={{ height: 20 }}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: -30 },
  title: {
    marginTop: -16,
    fontSize: 24,
    marginBottom: 6,
    fontWeight: "bold",
    color: appColors.dark,
  },
  price: {
    fontSize: 16,
    color: "grey",
    marginBottom: 6,
  },
  separator: {
    width: "100%",
    backgroundColor: appColors.primary,
    height: 2,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: appColors.dark,
    marginBottom: 12,
  },
  icon: {
    marginLeft: 10,
    marginTop: -11,
  },
  iconText: {
    color: appColors.appred,
    fontSize: 8,
  },
  back: {
    alignSelf: "flex-start",
    marginTop: 8,
  },
});

export default SingleProductScreen;
