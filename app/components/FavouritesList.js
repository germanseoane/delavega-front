import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import appColors from "../styles/appColors";

const FavouritesList = ({ products }) => {
  const navigation = useNavigation();

  return products.map((product) => {
    if (product.isFavourite) {
      return (
        <TouchableWithoutFeedback
          key={product._id}
          onPress={() => navigation.navigate("single-product", { product })}
        >
          <View style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <View style={styles.button}>
              <Text style={styles.title}>{product.title}</Text>
              <Text style={styles.price}>
                Precio: ${product.price.toFixed(2)}
              </Text>

              <Text
                style={{
                  color: appColors.primary,
                  fontWeight: "bold",
                  fontSize: 18,
                  marginTop: 10,
                }}
              >
                Ver Producto
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  });
};

const styles = StyleSheet.create({
  container: {
    borderColor: appColors.primary,
    borderWidth: 1,
    padding: 5,
    marginBottom: 8,
    borderRadius: 4,
    flexDirection: "row",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 4,
  },
  button: {
    marginLeft: 14,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
  },
  price: {
    color: "grey",
  },
});

export default FavouritesList;
