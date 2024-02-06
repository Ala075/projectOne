import { useEffect, useState } from "react";
import { Axios } from "../../api/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading"
import ErrorPage from "../../pages/ErrorPage";
import CustomOrder from "../custom/CustomOrder";
import { useParams } from "react-router-dom";

const Order = () => {
  const [order, setOrder] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Récupérer l'id l'ordre dans l'url
  const { id } = useParams();

  const showError = (message) => {
    setError(true);
    toast.error(message);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await Axios.get(`/Orders/${id}`);

        setOrder(res.data.order);
      } catch (error) {
        showError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(order);
  
  return (
    <>
      <ToastContainer position="bottom-center" autoClose={5000} />
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorPage />
      ) : (
        <CustomOrder order={order} />
      )}
    </>
  );
};

export default Order;
