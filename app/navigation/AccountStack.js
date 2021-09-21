import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import appColors from "../styles/appColors";
import AccountScreen from "../screens/AccountScreen";
import AddressesScreen from "../screens/AddressesScreen";
import AddAddressScreen from "../screens/AddAddressScreen";

const Stack = createStackNavigator();

const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="welcome"
        component={WelcomeScreen}
        options={{ headerShown: false, title: "Welcome" }}
      />
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{
          title: "Login",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        component={RegisterScreen}
        options={{
          title: "Registrate",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="account"
        component={AccountScreen}
        options={{
          title: "Mi cuenta",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="addresses"
        component={AddressesScreen}
        options={{
          title: "Direcciones",
          headerStyle: { backgroundColor: appColors.primary },
          headerTitleStyle: { color: appColors.light },
        }}
      />
      <Stack.Screen
        name="add-address"
        component={AddAddressScreen}
        options={{
          title: "Agrega una direccion",
          headerStyle: { backgroundColor: appColors.primary },
          headerTitleStyle: { color: appColors.light },
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
