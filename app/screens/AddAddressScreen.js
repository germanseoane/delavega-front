import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useFormik } from "formik";
import { useToast } from "react-native-toast-notifications";
import * as Yup from "yup";
import { useAuthContext } from "../context/authContext";

import ScreenComponent from "../components/ScreenComponent";
import btnStyles from "../styles/btnStyles";
import { postAddressApi } from "../api/addressesApi";

const AddAddressScreen = ({ navigation }) => {
  const { auth } = useAuthContext();
  const userId = auth.email;
  const [loading, setLoading] = useState(false);
  const Toast = useToast();

  const formik = useFormik({
    initialValues: {
      userId: userId,
      title: "",
      address: "",
      phone: "",
      city: "",
      country: "",
    },
    validationSchema: Yup.object({
      userId: Yup.string(),
      title: Yup.string().required().min(1).max(50),
      address: Yup.string().required().min(1).max(50),
      phone: Yup.string().required().min(1).max(50),
      city: Yup.string().required().min(1).max(50),
      country: Yup.string().required().min(1).max(50),
    }),
    onSubmit: async (formData) => {
      try {
        setLoading(true);
        const result = await postAddressApi(formData);
        setLoading(false);
        navigation.navigate("addresses");
      } catch (err) {
        console.log(err);
        Toast.show("error al subir la direccion");
        setLoading(false);
      }
    },
  });

  return (
    <ScreenComponent>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          label="Nombre direccion (ej. Casa o Trabajo)"
          value={formik.values.title}
          error={formik.errors.title}
          onChangeText={(text) => formik.setFieldValue("title", text)}
        />
        <TextInput
          style={styles.input}
          label="Direccion"
          value={formik.values.address}
          error={formik.errors.address}
          onChangeText={(text) => formik.setFieldValue("address", text)}
        />
        <TextInput
          style={styles.input}
          label="Telefono"
          value={formik.values.phone}
          error={formik.errors.phone}
          onChangeText={(text) => formik.setFieldValue("phone", text)}
        />
        <TextInput
          style={styles.input}
          label="Ciudad"
          value={formik.values.city}
          error={formik.errors.city}
          onChangeText={(text) => formik.setFieldValue("city", text)}
        />
        <TextInput
          style={styles.input}
          label="Pais"
          value={formik.values.country}
          error={formik.errors.country}
          onChangeText={(text) => formik.setFieldValue("country", text)}
        />
        <Button
          mode="contained"
          style={btnStyles}
          labelStyle={{ color: "white" }}
          onPress={formik.handleSubmit}
          loading={loading}
        >
          Ingresar direccion
        </Button>
      </View>
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: -12,
  },
  input: {
    marginBottom: 6,
  },
});

export default AddAddressScreen;
