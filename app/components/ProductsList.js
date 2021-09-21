import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

import appColors from "../styles/appColors";

const ProductsList = ({ products }) => {
  const navigation = useNavigation();

  if (!products) {
    return null;
  }
  return products.map((product) => {
    return (
      <TouchableWithoutFeedback
        key={product._id}
        onPress={() => navigation.navigate("single-product", { product })}
      >
        <View style={styles.container}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>
              Precio: ${product.price.toFixed(2)}
            </Text>
            <Text style={styles.details}>Ver detalles</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  });
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: appColors.primary,
    marginTop: 5,
    padding: 8,
    flexDirection: "row",
    borderRadius: 4,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  info: {
    marginLeft: 12,
  },
  title: {
    fontSize: 18,
  },
  details: {
    color: appColors.primary,
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    color: "grey",
  },
});

export default ProductsList;
