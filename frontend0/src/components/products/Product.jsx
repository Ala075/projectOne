import { useEffect, useState } from "react";
import { Axios } from "../../api/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading";
import ErrorPage from "../../pages/errorPage/ErrorPage";
import CustomProduct from "../../dashboard/custom/CustomProduct";
import { useParams } from "react-router-dom";

const Product = () => {
    const [product, setProduct] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Récupérer l'id de product
  const { id } = useParams();

  const showError = (message) => {
    setError(true);
    toast.error(message);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await Axios.get(`/Products/${id}`);

        setProduct(res.data.product);
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
        <CustomProduct product={product} />
      )}
    </>
  );
};

export default Product;
