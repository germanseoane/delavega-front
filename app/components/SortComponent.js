import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import DropDown from "react-native-paper-dropdown";
import { useProductsContext } from "../context/productsContext";
import appColors from "../styles/appColors";
import paperTheme from "..//styles/paperTheme";

const sortList = [
  { label: "Nombre (A-Z)", value: "name" },
  { label: "Precio (Bajo)", value: "min" },
  { label: "Precio (Alto)", value: "max" },
];

const SortComponent = () => {
  const { sortProducts } = useProductsContext();
  const [showDropDown, setShowDropDown] = useState(false);
  const [sort, setSort] = useState("name");

  useEffect(() => {
    sortProducts(sort);
  }, [sort]);

  return (
    <View style={styles.container}>
      <DropDown
        label="Ordenar"
        list={sortList}
        visible={showDropDown}
        value={sort}
        setValue={setSort}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        mode="outlined"
        theme={paperTheme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    marginLeft: 10,
    borderRadius: 4,
  },
});

export default SortComponent;
