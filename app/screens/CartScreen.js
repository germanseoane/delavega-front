import React, { useRef } from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import CartList from "../components/CartList";
import ScreenComponent from "../components/ScreenComponent";
import { useProductsContext } from "../context/productsContext";
import { useAuthContext } from "../context/authContext";
import appColors from "../styles/appColors";
import { useToast } from "react-native-toast-notifications";

const CartScreen = ({ navigation }) => {
  const { products, cart } = useProductsContext();
  const { auth } = useAuthContext();
  const Toast = useToast();

  let totalPrice = 0;
  totalPrice = cart.reduce((total, cartItem) => {
    const { qty, price } = cartItem;

    total += qty * price;

    return total;
  }, 0);

  return (
    <ScreenComponent>
      <Text style={styles.title}>Carro de compras</Text>
      <ScrollView style={styles.container}>
        <CartList />
        <View style={{ height: 40 }}></View>
      </ScrollView>
      {cart.length > 0 ? (
        <View style={styles.info}>
          <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>
          <Text
            onPress={() => {
              if (!auth) {
                Toast.show("Tienes que estar registrado para comprar!");
              } else {
                navigation.navigate("check-out");
              }
            }}
            style={styles.checkout}
          >
            Check Out
          </Text>
        </View>
      ) : (
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
          />
          <Text style={{ alignSelf: "center", fontSize: 14, color: "black" }}>
            No tienes productos en el carro
          </Text>
        </View>
      )}
      <View style={styles.separator}></View>
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
  total: {
    fontSize: 20,
    backgroundColor: appColors.primary,
    color: "white",
    marginLeft: 20,
    fontWeight: "bold",
  },
  checkout: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginRight: 20,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "white",
  },
  info: {
    height: 48,
    backgroundColor: appColors.primary,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 140,
    height: 140,
    alignSelf: "center",
  },
  logoContainer: {
    flex: 1,

    marginTop: -400,
  },
});

export default CartScreen;
