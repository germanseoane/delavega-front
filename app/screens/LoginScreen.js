import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useFormik } from "formik";
import { useToast } from "react-native-toast-notifications";
import * as Yup from "yup";
import { useAuthContext } from "../context/authContext";

import { setAuthInStorageApi } from "../api/authApi";
import { loginApi } from "../api/authApi";
import ScreenComponent from "../components/ScreenComponent";
import btnStyles from "../styles/btnStyles";
import AccountScreen from "./AccountScreen";

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useAuthContext();
  const Toast = useToast();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    onSubmit: async (formData) => {
      try {
        setLoading(true);
        const result = await loginApi(formData);
        if (result.error) {
          Toast.show(result.error);
          setLoading(false);
          return;
        }
        await setAuthInStorageApi(result);
        setAuth(result);
        setLoading(false);
      } catch (err) {
        console.log(err);
        Toast.show("Error en el login");
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
        <Button
          mode="contained"
          style={btnStyles}
          labelStyle={{ color: "white" }}
          onPress={() => formik.handleSubmit()}
          loading={loading}
        >
          Login
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

export default LoginScreen;
