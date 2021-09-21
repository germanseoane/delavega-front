import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, Platform } from "react-native";
import { useAuthContext } from "../context/authContext";
import { Button } from "react-native-paper";

import ScreenComponent from "../components/ScreenComponent";
import ImageBackground from "react-native/Libraries/Image/ImageBackground";
import btnStyles from "../styles/btnStyles";
import AccountScreen from "./AccountScreen";
import { getStoredAuthApi } from "../api/authApi";
import LoadingScreen from "../components/LoadingScreen";

const WelcomeScreen = ({ navigation }) => {
  const { auth, setAuth } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const getAuth = async () => {
    try {
      setLoading(true);
      const result = await getStoredAuthApi();
      if (result) {
        setAuth(result);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAuth();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (auth) {
    return <AccountScreen />;
  }
  return (
    <ScreenComponent>
      <ImageBackground
        source={require("../../assets/background.jpg")}
        style={styles.image}
      >
        <View style={styles.container}>
          <View style={styles.info}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logo}
            />
            <Text style={styles.text}>Cosmetica Natural</Text>
          </View>
          <Button
            style={btnStyles}
            mode="contained"
            labelStyle={{ color: "white" }}
            onPress={() => navigation.navigate("login")}
          >
            Login
          </Button>
          <Button
            style={btnStyles}
            onPress={() => navigation.navigate("register")}
          >
            Registrarse
          </Button>
        </View>
      </ImageBackground>
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 150,
    height: 150,
  },
  info: {
    alignItems: "center",
    marginBottom: 300,
  },

  text: {
    marginTop: -10,
  },
});

export default WelcomeScreen;
