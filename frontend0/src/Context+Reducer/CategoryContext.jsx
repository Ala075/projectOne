import { createContext, useContext, useState, useEffect } from "react";
import { Axios } from "../api/Axios";

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const storedCategories = async () => {
      const storedCategories = localStorage.getItem("categories");
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      } else {
        try {
          const res = await Axios.get("/Categories");
          setCategories(res.data.categories);
          localStorage.setItem(
            "categories",
            JSON.stringify(res.data.categories)
          );
        } catch (error) {
          console.log(error);
        }
      }
    };

    storedCategories();
  }, []);

  /*CategoryProvider.propstypes = {
    children: PropTypes.node.isRequired,
  };*/

  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
};

const useCategory = () => {
  return useContext(CategoryContext);
};

export { CategoryProvider, useCategory };
