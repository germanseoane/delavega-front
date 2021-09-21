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

const reducer = (state, action) => {
  if (action.type === GET_PRODUCTS) {
    return { ...state, products: action.payload };
  }
  if (action.type === LOADING_TRUE) {
    return { ...state, loading: true };
  }
  if (action.type === LOADING_FALSE) {
    return { ...state, loading: false };
  }
  if (action.type === SET_IS_FAVOURITE) {
    return {
      ...state,
      products: state.products.map((product) => {
        if (product._id === action.payload) {
          return { ...product, isFavourite: true };
        } else {
          return product;
        }
      }),
    };
  }
  if (action.type === REMOVE_FAVOURITE) {
    return {
      ...state,
      products: state.products.map((product) => {
        if (product._id === action.payload) {
          return { ...product, isFavourite: false };
        } else {
          return product;
        }
      }),
    };
  }
  if (action.type === ADD_TO_CART) {
    state.products.find((product) => {
      if (product._id === action.payload) {
        state.cart.push(product);
      }
    });
    return { ...state };
  }
  if (action.type === REMOVE_FROM_CART) {
    return {
      ...state,
      cart: state.cart.filter((product) => {
        if (product._id !== action.payload) {
          return product;
        }
      }),
    };
  }
  if (action.type === REFRESH) {
    return {
      ...state,
      products: state.products.map((product) => {
        return { ...product, isFavourite: false };
      }),
      cart: [],
    };
  }
  if (action.type === ADD_QUANTITY) {
    return {
      ...state,
      cart: state.cart.map((product) => {
        if (product._id === action.payload && product.qty < 9) {
          return { ...product, qty: (product.qty = product.qty + 1) };
        } else {
          return product;
        }
      }),
    };
  }
  if (action.type === RESTART_APP) {
    const newProducts = state.products.map((product) => {
      return { ...product, isFavourite: false };
    });
    return { ...state, products: newProducts, cart: [] };
  }

  if (action.type === SUB_QUANTITY) {
    return {
      ...state,
      cart: state.cart.map((product) => {
        if (product._id === action.payload && product.qty > 1) {
          return { ...product, qty: (product.qty = product.qty - 1) };
        } else {
          return product;
        }
      }),
    };
  }
  if ((action.type = SORT_PRODUCTS)) {
    if (action.payload === "min") {
      return {
        ...state,
        products: state.products.sort((a, b) => {
          return a.price - b.price;
        }),
      };
    }
    if (action.payload === "max") {
      return {
        ...state,
        products: state.products.sort((a, b) => {
          return b.price - a.price;
        }),
      };
    }
    if (action.payload === "name") {
      return {
        ...state,
        products: state.products.sort((a, b) => {
          return a.title.localeCompare(b.title);
        }),
      };
    }
  }

  if ((action.type = LOG_ADDRESSES)) {
    return { ...state, address: action.payload };
  }

  return { ...state };
};

export default reducer;
