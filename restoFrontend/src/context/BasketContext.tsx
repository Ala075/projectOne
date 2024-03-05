import { createContext, useReducer } from "react";
import storeReducer, { initialState } from "./BasketReducer";
import { Axios } from "../api/Axios";
import Cookie from "cookie-universal";

export const BasketContext = createContext(null);

interface BasketProviderProps {
  children: React.ReactNode;
}

export const BasketProvider = ({ children }: BasketProviderProps) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  const cookies = Cookie();
  const userId = cookies.get("userId");

  const addToBasket = (product) => {
    const existingProductIndex = state.products.findIndex((p) => p._id === product._id);
  
    if (existingProductIndex !== -1) {
      const existingProduct = state.products[existingProductIndex];
      const ingredientsMatch = existingProduct.ingrediants.every((ing, index) => {
        return ing.type === product.ingrediants[index].type;
      });
  
      if (ingredientsMatch) {
        const updatedProducts = state.products.map((item, index) => {
          if (index === existingProductIndex) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
  
        updatePrice(updatedProducts);
  
        dispatch({
          type: "ADD",
          payload: updatedProducts,
        });
        
        return;
      }
    }
  
    const newProduct = { ...product, quantity: 1 };
    const updatedProducts = [...state.products, newProduct];
  
    updatePrice(updatedProducts);
  
    dispatch({
      type: "ADD",
      payload: updatedProducts,
    });
  };
  

  const updateBasket = (product, quantity) => {
    let updatedProducts;

    if (quantity === 0) {
      updatedProducts = state.products.filter(
        (item) => item._id !== product._id
      );
    } else {
      updatedProducts = state.products.map((item) => {
        if (item._id === product._id) {
          const updatedIngredients = item.ingrediants.map((ing, index) => {
            if (ing.type === product.ingrediants[index].type) {
              return product.ingrediants[index];
            }
            return ing;
          });

          return { ...item, ingrediants: updatedIngredients, quantity };
        }
        return item;
      });
    }

    updatePrice(updatedProducts);
    updateBD(updatedProducts);

    dispatch({
      type: "UPDATE",
      payload: updatedProducts,
    });
  };

  const removeAll = () => {
    updateBD([]);
    updatePrice([]);
    
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
      await Axios.post("/Carts", {
        userId,
        items: [...basket] || [],
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
  return (
    <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
  );
};
