import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { useToast } from "react-native-toast-notifications";

import { useFocusEffect } from "@react-navigation/core";
import { useAuthContext } from "../context/authContext";
import AddressesList from "../components/AddressesList";
import ScreenComponent from "../components/ScreenComponent";
import { getAddressesApi } from "../api/addressesApi";
import LoadingScreen from "../components/LoadingScreen";
import { useProductsContext } from "../context/productsContext";

const AddressesScreen = ({ navigation }) => {
  const { auth } = useAuthContext();
  const { logAddresses, address } = useProductsContext();
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);
  const userId = auth.email;
  const [addresses, setAddresses] = useState([]);
  const Toast = useToast();

  const getAddresses = async () => {
    try {
      setLoading(true);
      const result = await getAddressesApi(userId);
      setAddresses(result);
      logAddresses(result);
      setLoading(false);
    } catch (err) {
      console.log(err);
      Toast.show("Error al solicitar direcciones del usuario");
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getAddresses();
    }, [reset])
  );

  if (loading) {
    return <LoadingScreen text="Cargando direcciones" />;
  }

  return (
    <ScreenComponent>
      <View style={styles.container}>
        <Text style={styles.title}>Tus direcciones</Text>
        {addresses.length < 3 ? (
          <Button
            icon="arrow-right"
            onPress={() => navigation.navigate("add-address")}
            mode="contained"
            labelStyle={{ color: "white" }}
            style={styles.btn}
          >
            Agregar direccion nueva
          </Button>
        ) : (
          <Text></Text>
        )}
        <ScrollView>
          <AddressesList
            addresses={addresses}
            userId={userId}
            reset={reset}
            setReset={setReset}
          />
          <View style={{ height: 20 }} />
        </ScrollView>
      </View>
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginTop: -20,
    marginBottom: -10,
  },
  btn: {
    marginBottom: 10,
    marginTop: 20,
  },
});

export default AddressesScreen;
