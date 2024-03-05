import { createContext, useContext, useEffect, useState } from "react";
import { Axios } from "../api/Axios";

export const ResCtx = createContext(null);

interface ResCtxProps {
  children: React.ReactNode;
}

export const ResProvider = ({ children }: ResCtxProps) => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [item, setItem] = useState(null);
  const [order, setOrder] = useState({
    user: "",
    items: [],
    total: 0,
    table: 0,
    coordinates: {
      lat: 0,
      lng: 0,
    },
    status: "pending",
  });

  // Récupérer les catégories et les produits
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const resCategories = await Axios.get("/Categories");
        setCategories(resCategories.data.categories);

        localStorage.setItem(
          "categoriesList",
          JSON.stringify(resCategories.data.categories)
        );
      } catch (error) {
        console.log(error.response?.data.message);
      } finally {
        //setLoading(false);
      }
    };

    const fetchItems = async () => {
      try {
        const res = await Axios.get("/Items");
        setItems(res.data.itemsMenu);

        localStorage.setItem(
          "productsList",
          JSON.stringify(res.data.itemsMenu)
        );
      } catch (error) {
        console.log(error.response?.data.message);
      } finally {
        //setLoading(false);
      }
    };

    if (!localStorage.getItem("productsList")) {
      fetchCategories();
    } else {
      setItems(JSON.parse(localStorage.getItem("productsList")));
    }
    if (!localStorage.getItem("categoriesList")) {
      fetchItems();
    } else {
      setCategories(JSON.parse(localStorage.getItem("categoriesList")));
    }
  }, []);

  return (
    <ResCtx.Provider
      value={{
        item,
        setItem,
        items,
        setItems,
        filteredItems,
        setFilteredItems,
        categories,
        setCategories,
        order,
        setOrder,
      }}
    >
      {children}
    </ResCtx.Provider>
  );
};

export const useRes = () => {
  return useContext(ResCtx);
};
