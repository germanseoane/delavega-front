import React from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { Button, List } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";

import { removeAuthStorageApi } from "../api/authApi";
import ScreenComponent from "../components/ScreenComponent";
import { useAuthContext } from "../context/authContext";
import appColors from "../styles/appColors";
import { useProductsContext } from "../context/productsContext";

const AccountScreen = () => {
  const navigation = useNavigation();
  const { auth, setAuth } = useAuthContext();
  const { refresh } = useProductsContext();

  const logout = async () => {
    try {
      alert;
      await removeAuthStorageApi();
      setAuth(null);
      refresh();
      navigation.navigate("welcome");
    } catch (err) {
      console.log(err);
    }
  };

  const alertLogout = () => {
    Alert.alert("Cerrar Sesion", "Seguro que quiere cerrar sesion?", [
      { text: "NO", onPress: () => console.log("cancelado") },
      { text: "SI", onPress: () => logout() },
    ]);
  };

  return (
    <ScreenComponent>
      <View style={styles.container}>
        <Text style={styles.text}>Bienvenido: {auth && auth.name}</Text>

        <List.Item
          title="Agregar Direcciones"
          description="Agregue direcciones de entrega"
          left={() => <List.Icon icon="map" color={appColors.primary} />}
          onPress={() => navigation.navigate("addresses")}
        />
        <View style={styles.separator}></View>
        <List.Item
          title="Cerrar Sesion"
          description="Cierre la sesion de su cuenta"
          left={() => <List.Icon icon="logout" color={appColors.primary} />}
          onPress={() => alertLogout()}
        />
        <View style={styles.separator}></View>
      </View>
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  text: {
    fontSize: 18,
    color: appColors.dark,
    marginTop: 10,
    marginBottom: 20,
  },
  separator: {
    height: 2,
    backgroundColor: appColors.primary,
    width: "100%",
  },
});

export default AccountScreen;
