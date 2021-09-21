import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useToast } from "react-native-toast-notifications";

import { useAuthContext } from "../context/authContext";
import { registerApi } from "../api/authApi";
import ScreenComponent from "../components/ScreenComponent";
import btnStyles from "../styles/btnStyles";
import AccountScreen from "./AccountScreen";
import { setAuthInStorageApi } from "../api/authApi";

const RegisterScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useAuthContext();
  const Toast = useToast();

  useEffect(() => {
    if (auth) {
      navigation.navigate("account");
    }
  }, [auth]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", repeatPassword: "" },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(4).max(250),
      repeatPassword: Yup.string()
        .required()
        .min(4)
        .max(250)
        .oneOf([Yup.ref("password")]),
    }),
    onSubmit: async (formData) => {
      try {
        setLoading(true);
        const { name, email, password } = formData;
        const newData = { name, email, password };
        const response = await registerApi(newData);
        if (response.error) {
          Toast.show(response.error);
          setLoading(false);
          return;
        }
        await setAuthInStorageApi(response);
        setAuth(response);
        setLoading(false);
      } catch (err) {
        Toast.show("Error registering user");
        setLoading(false);
      }
    },
  });

  if (auth) {
    return <AccountScreen />;
  }
  return (
    <ScreenComponent>
      <View style={styles.container}>
        <TextInput
          label="Nombre"
          style={styles.input}
          value={formik.values.name}
          error={formik.errors.name}
          onChangeText={(text) => formik.setFieldValue("name", text)}
        />
        <TextInput
          label="Email"
          style={styles.input}
          value={formik.values.email}
          error={formik.errors.email}
          autoCapitalize="none"
          onChangeText={(text) => formik.setFieldValue("email", text)}
        />
        <TextInput
          label="Password"
          style={styles.input}
          value={formik.values.password}
          error={formik.errors.password}
          autoCapitalize="none"
          secureTextEntry={showPassword}
          onChangeText={(text) => formik.setFieldValue("password", text)}
        />
        <TextInput
          label="Repetir Password"
          style={styles.input}
          value={formik.values.repeatPassword}
          error={formik.errors.repeatPassword}
          secureTextEntry={showPassword}
          autoCapitalize="none"
          onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        />
        <Button
          mode="contained"
          style={btnStyles}
          labelStyle={{ color: "white" }}
          onPress={() => formik.handleSubmit()}
          loading={loading}
        >
          Registrarse
        </Button>
        <Button
          onPress={() => setShowPassword(!showPassword)}
          style={btnStyles}
        >
          Mostrar Password
        </Button>
      </View>
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  input: {
    marginBottom: 10,
  },
});

export default RegisterScreen;
