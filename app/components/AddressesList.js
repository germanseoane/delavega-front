import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { useToast } from "react-native-toast-notifications";

import appColors from "../styles/appColors";
import { deleteAddressApi } from "../api/addressesApi";

const AddressesList = ({ addresses, reset, setReset }) => {
  const Toast = useToast();

  const deleteAddress = async (_id) => {
    try {
      const result = await deleteAddressApi(_id);
      Toast.show(result.message);

      setReset(!reset);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      {addresses &&
        addresses.map((address) => {
          return (
            <View style={styles.container} key={address._id}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {address.title}
              </Text>
              <Text style={styles.text}>Direccion: {address.address}</Text>
              <Text style={styles.text}>Telefono: {address.phone}</Text>
              <Text style={styles.text}>Ciudad: {address.city}</Text>
              <Text style={styles.text}>Pais: {address.country}</Text>
              <Button onPress={() => deleteAddress(address._id)}>
                Borrar esta direccion
              </Button>
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
    borderRadius: 4,
    marginTop: 6,
    padding: 8,
  },
  text: {
    marginTop: 4,
    color: appColors.dark,
  },
});

export default AddressesList;
