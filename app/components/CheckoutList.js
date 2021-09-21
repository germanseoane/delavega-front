import React from "react";
import { View, StyleSheet, Text } from "react-native";
import appColors from "../styles/appColors";

const CheckoutList = ({ cart }) => {
  return cart.map((item, index) => {
    return (
      <View style={styles.item} key={item._id}>
        <Text style={styles.title}>
          {index + 1}. {item.title}
        </Text>
        <View style={styles.info}>
          <Text style={styles.details}>Cantidad: {item.qty}</Text>
          <Text style={styles.details}>
            Subtotal: {(item.qty * item.price).toFixed(2)}
          </Text>
        </View>
        <View style={styles.separator}></View>
      </View>
    );
  });
};

const styles = StyleSheet.create({
  container: {},
  header: {
    fontSize: 18,
    marginBottom: 10,
  },
  item: {
    width: "100%",
    height: 50,
    marginTop: 6,
    padding: 4,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: appColors.primary,
  },
  details: {
    color: "#696969",
  },
});

export default CheckoutList;
