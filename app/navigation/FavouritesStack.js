import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductsScreen from "../screens/ProductsScreen";
import FavouritesScreen from "../screens/FavouritesScreen";

const Stack = createStackNavigator();

const FavouritesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="favourites"
        component={FavouritesScreen}
        options={{ headerShown: false, title: "Favourites" }}
      />
    </Stack.Navigator>
  );
};

export default FavouritesStack;
