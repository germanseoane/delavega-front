import React, { createContext, useContext, useReducer, useEffect } from "react";

import reducer from "./reducer";
import { getProductsApi } from "../api/productsApi";
import {
  GET_PRODUCTS,
  LOADING_FALSE,
  LOADING_TRUE,
  SET_IS_FAVOURITE,
  REMOVE_FAVOURITE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  REFRESH,
  ADD_QUANTITY,
  SUB_QUANTITY,
  SORT_PRODUCTS,
  LOG_ADDRESSES,
  RESTART_APP,
} from "../utils/constants";

const ProductContext = createContext();

const initialState = {
  loading: false,
  products: [],
  favourites: [],
  cart: [],
  address: [],
};

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async () => {
    try {
      dispatch({ type: LOADING_TRUE });
      const products = await getProductsApi();
      dispatch({ type: GET_PRODUCTS, payload: products });
      dispatch({ type: LOADING_FALSE });
    } catch (err) {
      console.log(err);
      dispatch({ type: LOADING_FALSE });
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const setIsFavourite = (_id) => {
    dispatch({ type: SET_IS_FAVOURITE, payload: _id });
  };
  const removeFavourite = (_id) => {
    dispatch({ type: REMOVE_FAVOURITE, payload: _id });
  };
  const addToCart = (_id) => {
    dispatch({ type: ADD_TO_CART, payload: _id });
  };
  const removeFromCart = (_id) => {
    dispatch({ type: REMOVE_FROM_CART, payload: _id });
  };

  const refresh = () => {
    dispatch({ type: REFRESH });
  };
  const addQuantity = (_id) => {
    dispatch({ type: ADD_QUANTITY, payload: _id });
  };

  const subQuantity = (_id) => {
    dispatch({ type: SUB_QUANTITY, payload: _id });
  };

  const sortProducts = (value) => {
    dispatch({ type: SORT_PRODUCTS, payload: value });
  };

  const logAddresses = (value) => {
    dispatch({ type: LOG_ADDRESSES, payload: value });
  };

  const restartApplication = () => {
    dispatch({ type: RESTART_APP });
  };

  return (
    <ProductContext.Provider
      value={{
        ...state,
        setIsFavourite,
        removeFavourite,
        addToCart,
        removeFromCart,
        refresh,
        subQuantity,
        addQuantity,
        sortProducts,
        logAddresses,
        restartApplication,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductContext);
};

export { ProductContext, ProductContextProvider };
