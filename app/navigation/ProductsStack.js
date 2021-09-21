import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductsScreen from "../screens/ProductsScreen";
import SingleProductScreen from "../screens/SingleProductScreen";
import appColors from "../styles/appColors";

const Stack = createStackNavigator();

const ProductsStack = () => {
  return (
    <Stack.Navigator initialRouteName="products">
      <Stack.Screen
        name="products"
        component={ProductsScreen}
        options={{ headerShown: false, title: "Productos" }}
      />

      <Stack.Screen
        name="single-product"
        component={SingleProductScreen}
        options={{
          title: "Detalles de Producto",
          headerStyle: { backgroundColor: appColors.primary },
          headerTitleStyle: { color: appColors.light },
        }}
      />
    </Stack.Navigator>
  );
};

export default ProductsStack;
