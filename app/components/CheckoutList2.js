import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import appColors from "../styles/appColors";

const CheckoutList2 = ({ address, modal, setModal }) => {
  const navigation = useNavigation();

  if (address && address.length === 0) {
    return (
      <View style={styles.noAdd}>
        <Text style={{ marginVertical: 20, width: "100%", fontSize: 16 }}>
          No tienes direcciones de envio!
        </Text>
        <Button
          mode="contained"
          labelStyle={{ color: "white" }}
          onPress={() => navigation.navigate("add-address")}
        >
          Ir a registrar una direccion
        </Button>
      </View>
    );
  }
  if (!address) {
    return null;
  }

  return (
    address &&
    address.map((add) => {
      return (
        <TouchableWithoutFeedback key={add._id}>
          <View style={styles.itemContainer}>
            <Text style={styles.addressTitle}>{add.title}</Text>
            <Text style={styles.addressItem}>Direccion: {add.address}</Text>
            <Text style={styles.addressItem}>Telefono: {add.phone}</Text>
            <Text style={styles.addressItem}>Ciudad: {add.city}</Text>
            <Text style={styles.addressItem}>Pais: {add.country}</Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                alignSelf: "center",
                color: appColors.primary,
                marginTop: 10,
              }}
              onPress={() => setModal(true)}
            >
              Comfirma la compra con esta direccion
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    })
  );
};

const styles = StyleSheet.create({
  container: {},
  itemContainer: {
    width: 330,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 4,
    borderColor: appColors.primary,
    borderWidth: 1,
    padding: 20,
    backgroundColor: appColors.light,
  },
  addressItem: {
    fontSize: 14,
    color: appColors.appGray,
  },
  addressTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  noAdd: {
    width: "100%",
  },
});

export default CheckoutList2;
