import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { SearchBar } from "react-native-elements";
import ScreenComponent from "../components/ScreenComponent";
import appColors from "../styles/appColors";
import { useProductsContext } from "../context/productsContext";
import SearchComponent from "../components/SearchComponent";

const SearchScreen = () => {
  const [search, setSearch] = useState("");
  const { products } = useProductsContext();

  return (
    <ScreenComponent>
      <View style={styles.search}>
        <SearchBar
          placeholder="Busca tu producto"
          containerStyle={styles.bar}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <SearchComponent search={search} products={products} />
          </View>
        </View>
      </ScrollView>
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  bar: {
    backgroundColor: appColors.primary,
    borderRadius: 4,
  },
  inputContainer: {
    backgroundColor: "white",
  },
  searchContainer: {
    marginTop: 20,
  },
  search: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
});

export default SearchScreen;
