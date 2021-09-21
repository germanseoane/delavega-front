import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useProductsContext } from "../context/productsContext";
import { Button } from "react-native-paper";
import appColors from "../styles/appColors";

const CartList = () => {
  const { cart, removeFromCart, subQuantity, addQuantity } =
    useProductsContext();

  return (
    <View>
      {cart &&
        cart.map((product) => {
          return (
            <View key={product._id} style={styles.container}>
              <Image source={{ uri: product.image }} style={styles.image} />
              <View style={styles.button}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>
                  Precio: ${(product.price * product.qty).toFixed(2)}
                </Text>
                <View style={styles.newStyle}>
                  <View style={styles.btnView}>
                    <Button
                      mode="contained"
                      labelStyle={styles.btn}
                      contentStyle={styles.back}
                      style={styles.btnContent}
                      onPress={() => removeFromCart(product._id)}
                    >
                      Remover
                    </Button>
                  </View>
                  <View style={styles.chevronView}>
                    <Button
                      labelStyle={{ color: appColors.primary }}
                      style={styles.chevron}
                      onPress={() => addQuantity(product._id)}
                    >
                      <AwesomeIcon name="plus" size={16} />
                    </Button>
                    <Text style={{ marginLeft: 8, marginTop: 6 }}>
                      Items: {product.qty}
                    </Text>
                    <Button
                      labelStyle={{ color: appColors.primary }}
                      style={styles.chevron}
                      onPress={() => subQuantity(product._id)}
                    >
                      <AwesomeIcon name="minus" size={16} />
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
    </View>
  );
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
    fontSize: 14,
    fontWeight: "bold",
  },
  price: {
    color: "grey",
  },
  btn: {
    color: "white",
    fontSize: 12,
  },
  back: {
    backgroundColor: appColors.appred,
  },
  btnContent: {
    marginTop: 8,
    width: 100,
    height: 34,
  },
  btnView: {
    flexDirection: "row",
  },
  chevron: {
    width: 5,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  chevronView: {
    marginTop: -50,
  },
  newStyle: {
    flexDirection: "row",
    justifyContent: "space-between",

    width: "74%",
  },
});

export default CartList;
