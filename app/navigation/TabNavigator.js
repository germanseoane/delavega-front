import React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";

import appColors from "../styles/appColors";
import AccountStack from "./AccountStack";
import ProductsStack from "./ProductsStack";
import FavouritesStack from "./FavouritesStack";
import CartScreen from "../screens/CartScreen";
import CartStack from "./CartStack";
import SearchStack from "./SearchStack";

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: appColors.primary }}
      inactiveColor={appColors.light}
      shifting={true}
      activeColor={appColors.light}
      initialRouteName="account-stack"
    >
      <Tab.Screen
        name="products-stack"
        component={ProductsStack}
        options={{
          title: "Productos",
          tabBarIcon: ({ color }) => (
            <AwesomeIcon name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="search-stack"
        component={SearchStack}
        options={{
          title: "Buscar",
          tabBarIcon: ({ color }) => (
            <AwesomeIcon name="search" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="favourite-stack"
        component={FavouritesStack}
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color }) => (
            <AwesomeIcon name="heart" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="cart-stack"
        component={CartStack}
        options={{
          title: "Carrito",
          tabBarIcon: ({ color }) => (
            <AwesomeIcon name="shopping-cart" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="account-stack"
        component={AccountStack}
        options={{
          title: "Mi cuenta",
          tabBarIcon: ({ color }) => (
            <AwesomeIcon name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
