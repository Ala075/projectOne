import { useEffect, useState } from "react";
import { Axios } from "../../api/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading";
import ErrorPage from "../../pages/ErrorPage";
import CustomUser from "../custom/CustomUser";
import { useParams } from "react-router-dom";

const User = () => {
  const [user, setUser] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Récupérer l'id de l'utilisateur dans l'url
  const { id } = useParams();

  const showError = (message) => {
    setError(true);
    toast.error(message);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await Axios.get(`/Users/${id}`);

        setUser(res.data.user);
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
        <CustomUser user={user} />
      )}
    </>
  );
};

export default User;
