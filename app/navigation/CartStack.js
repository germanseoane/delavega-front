import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CartScreen from "../screens/CartScreen";
import CheckOutScreen from "../screens/CheckOutScreen";
import appColors from "../styles/appColors";

const Stack = createStackNavigator();

const CartStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="cart"
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="check-out"
        component={CheckOutScreen}
        options={{
          title: "Checkout",
          headerStyle: { backgroundColor: appColors.primary },
          headerTitleStyle: { color: appColors.light },
        }}
      />
    </Stack.Navigator>
  );
};

export default CartStack;
