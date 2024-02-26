import { useEffect, useState } from "react";
import { Axios } from "../../api/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading";
import ErrorPage from "../../pages/errorPage/ErrorPage";
import CustomCategory from "../../dashboard/custom/CustomCategory";
import { useParams } from "react-router-dom";

const Category = () => {
  const [category, setCategory] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Récupérer l'id de la catégorie
  const { id } = useParams();

  const showError = (message) => {
    setError(true);
    toast.error(message);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await Axios.get(`/Categories/${id}`);

        setCategory(res.data.category);
      } catch (error) {
        showError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  return (
    <>
      <ToastContainer position="bottom-center" autoClose={5000} />
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorPage />
      ) : (
        <CustomCategory category={category} />
      )}
    </>
  );
};

export default Category;
