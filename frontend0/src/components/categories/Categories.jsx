import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../api/Axios";
import Loading from "../Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./categories.css";
import { PencilRuler, Trash2 } from "lucide-react";
import DashboardTitle from "../DashboardTitle";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showError = (message) => {
    toast.error(message);
  };

  // Récupérer les catégories
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await Axios.get("/Categories");

        setCategories(res.data.categories);
        console.log(res.data.categories)
      } catch (error) {
        showError(error.response?.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Mettre à jour le tableau des catégories
  const editCategory = (category) => {
    console.log("category", category);  
    navigate(`/dashboard/Categories/${category._id}`);
  };

  const deleteCategory = async (id) => {
    try {
      await Axios.delete(`/Categories/${id}`);
      
      const newCategories = categories.filter(
        (category) => category._id !== id
      );

      setCategories(newCategories);
    } catch (error) {
      showError(error.response.data.message);
    }
  };

  const addCategory = () => {
    navigate("/dashboard/Categories/Category");
  };

  return (
    <>
      <ToastContainer position="bottom-center" autoClose={5000} />
      {loading ? (
        <Loading />
      ) : (
        <>
        <DashboardTitle title="Categories" addMethod={addCategory} />
        <div className="categories">
          <div className="categories__container">
            <div className="categories__container__title">
              <h1>Categories</h1>
            </div>
            <div className="categories__container__content">
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <div
                    className="categories__container__content__item"
                    key={index}
                  >
                    <div className="item__img">
                      <img src={category.image} alt={category.name} />
                    </div>
                    <h2 className="item__title">{category.name}</h2>
                    <p className="item__description">{category.description}</p>
                    <div className="item__btns">
                      <PencilRuler
                        className="btn btn__edit"
                        onClick={() => editCategory(category)}
                      />
                      <Trash2
                        className="btn btn__delete"
                        onClick={() => deleteCategory(category._id)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p>No categories</p>
              )}
            </div>
          </div>
        </div>
        </>
      )}
    </>
  );
};

export default Categories;
