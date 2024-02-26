import { createContext, useReducer } from "react";
import storeReducer, { initialState } from "./BasketReducer";
import Proptypes from "prop-types";
import { Axios } from "../api/Axios";
import Cookie from "cookie-universal";

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  const cookies = Cookie();
  const userId = cookies.get("userId");

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
            item._id === productId ? { ...item, quantity } : item
          );

    updatePrice(updatedCartItems);

    console.log(updatedCartItems);

    updateBD(updatedCartItems);

    dispatch({
      type: "UPDATE",
      payload: updatedCartItems,
    });
  };

  const removeAll = () => {
    dispatch({
      type: "REMOVE_ALL",
      payload: [],
    });
  };

  

  const updateBD = async (newBasket) => {
    const basket = newBasket.map((product) => {
      return {
        name: product.name,
        price: product.price,
        image: product.images[0],
        ingrediants: [...product.ingrediants],
        quantity: product.quantity,
      };
    });

    try {
      await Axios.put("/Carts", {
        userId,
        items:[...basket] || [],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updatePrice = (newBasket) => {
    let total = 0;

    for (const product of newBasket) {
      total += product.price * product.quantity;
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

  BasketProvider.propTypes = {
    children: Proptypes.node,
  };

  return (
    <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
  );
};
