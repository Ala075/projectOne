import { useEffect, useState } from "react";
import { Axios } from "../../api/Axios";
import Loading from "../Loading";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./categories.css";
import { IMAGE_URL } from "../../api/Config";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const showError = (message) => {
    toast.error(message);
  };

  // Récupérer les catégories
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await Axios.get("/Categories");

        console.log(res.data.categories);

        setCategories(res.data.categories);
      } catch (error) {
        showError(error.response?.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="categories__container__content">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <div className="categories__container__content__item" key={index}>
                <div className="item__img">
                  <img src={IMAGE_URL + category.image} alt={category.name} />
                </div>
                <h2 className="item__title">{category.name}</h2>
                <p className="item__description">{category.description}</p>
              </div>
            ))
          ) : (
            <p>No categories</p>
          )}
        </div>
      )}
    </>
  );
};

export default CategoryList;
