import { createContext, useReducer } from "react";
import storeReducer, { initialState } from "./BasketReducer";

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  const addToBasket = (product) => {
    const inList = state.products.find((p) => p._id === product._id);

    if (inList) {
      product = { ...product, Qte: inList.Qte + 1 };
    } else {
      product = { ...product, Qte: 1 };
      const newBasket = [...state.products, product];

      updatePrice(newBasket);

      dispatch({
        type: "ADD",
        payload: newBasket,
      });
    }
  };

  const updateBasket = (productId, quantity) => {
    const prev = state.products;

    const updatedCartItems =
      quantity === 0
        ? prev.filter((item) => item._id !== productId)
        : prev.map((item) =>
            item._id === productId ? { ...item, Qte: quantity } : item
          );

    updatePrice(updatedCartItems);

    dispatch({
      type: "UPDATE",
      payload: updatedCartItems,
    });
  };

  const removeAll = () => {
    dispatch({
      type: "REMOVE_ALL",
      payload: [],
    })
  }

  const updatePrice = (newBasket) => {
    let total = 0;

    for (const product of newBasket) {
      total += product.price * product.Qte;
    }

    dispatch({
      type: "CALCULATE_TOTAL",
      payload: total,
    });
  };

  const value = {
    total: state.total,
    products: state.products,
    addToBasket,
    updateBasket,
    removeAll,
  };

  return (
    <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
  );
};
