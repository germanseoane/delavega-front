import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  Image,
} from "react-native";
import { Button } from "react-native-paper";
import { getAddressesApi } from "../api/addressesApi";
import ScreenComponent from "../components/ScreenComponent";
import { useProductsContext } from "../context/productsContext";
import { useToast } from "react-native-toast-notifications";
import LoadingScreen from "../components/LoadingScreen";
import { useAuthContext } from "../context/authContext";
import CheckoutList from "../components/CheckoutList";
import appColors from "../styles/appColors";
import CheckoutList2 from "../components/CheckoutList2";
import CartScreen from "./CartScreen";

const CheckOutScreen = ({ navigation }) => {
  const { cart, address, logAddresses, restartApplication } =
    useProductsContext();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const { auth } = useAuthContext();

  const Toast = useToast();

  let totalPrice = 0;
  totalPrice = cart.reduce((total, item) => {
    const { qty, price } = item;
    total += qty * price;

    return total;
  }, 0);

  const restartApp = () => {
    setModal(false);
    restartApplication();
    navigation.goBack();
    navigation.navigate("account");
  };

  const getAddresses = async (userId) => {
    try {
      setLoading(true);
      const result = await getAddressesApi(userId);
      logAddresses(result);
      setLoading(false);
    } catch (err) {
      console.log(err);
      Toast.show("Error al solicitar direcciones del usuario");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth) {
      const userId = auth.email;
      getAddresses(userId);
    }
  }, []);

  if (loading) {
    return <LoadingScreen text="Checkout" />;
  }
  if (!auth || cart.length === 0) {
    return <CartScreen />;
  }

  return (
    <>
      <ScreenComponent>
        <Modal animationType="slide" visible={modal}>
          <View style={styles.modalView}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.image}
            />
            <Text style={{ fontSize: 16 }}>
              Gracias por comprar en Delavega!
            </Text>
            <Button
              mode="contained"
              style={{ marginTop: 20 }}
              labelStyle={{ color: "white" }}
              onPress={() => restartApp()}
            >
              Reiniciar App
            </Button>
          </View>
        </Modal>

        <Text style={styles.header}>Resumen de la compra</Text>
        <ScrollView style={styles.container}>
          <CheckoutList cart={cart} />
          <View style={{ marginBottom: 20 }}></View>
          <Text style={styles.total}>
            Total de la compra: ${totalPrice.toFixed(2)}
          </Text>
          <View style={styles.separator}></View>
          <Text style={styles.addressTitle}>Elige Direccion de Envio</Text>
          <ScrollView
            horizontal
            style={styles.listContainer}
            directionalLockEnabled
          >
            <CheckoutList2
              address={address}
              modal={modal}
              setModal={setModal}
            />
          </ScrollView>
          <View style={{ height: 20 }} />
        </ScrollView>
      </ScreenComponent>
    </>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: -14,
    marginLeft: 20,
  },
  products: {
    backgroundColor: appColors.light,
    width: "100%",
    height: "40%",
    padding: 10,
    borderWidth: 1,
    borderColor: appColors.primary,
    borderRadius: 4,
    marginBottom: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    color: appColors.dark,
    marginBottom: 10,
  },
  separator: {
    width: "100%",
    height: 2,
    backgroundColor: appColors.primary,
    marginVertical: 20,
  },
  listContainer: {
    width: "100%",
  },
  addressTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  modalView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: 150,
    height: 150,
  },
});

export default CheckOutScreen;
