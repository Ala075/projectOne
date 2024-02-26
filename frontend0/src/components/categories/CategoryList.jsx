import { useEffect, useState } from "react";
import { Axios } from "../../api/Axios";
import Loading from "../Loading";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./categories.css";
import { IMAGE_URL } from "../../api/Config";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const showError = (message) => {
    toast.error(message);
  };

  const navigate = useNavigate();

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

  const showRelatedItems = async (name) => {
    console.log(name);
    try {
      const res = await Axios.get(`/Items?searchTerm=${name}`);
      
      navigate(`/products/${name}`, { state: { products: res.data.products } });
    } catch (error) {
      showError(error.response?.data.message);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="categories__container__content">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <div
                className="categories__container__content__item_list"
                key={index}
                onClick={() => showRelatedItems(category.name)}
              >
                <div className="item__img">
                  <img src={IMAGE_URL + category.image} alt={category.name} />
                </div>
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
