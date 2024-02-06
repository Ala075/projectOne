import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Axios } from "../api/Axios";
import Loading from "../components/Loading";
import Cookie from "cookie-universal";
import ErrorPage from "../pages/ErrorPage";
import axios from "axios";
import { BASE_URL } from "../api/Config";

const RequireAuth = ({ allowedRole }) => {
  const [user, setUser] = useState("");

  const cookie = Cookie();
  const token = cookie.get("eShop");
  const userId = cookie.get("userId");
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/Users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);
    } catch (error) {
      console.log(error);
      Navigate("/login", { replace: true });
    }
  }
  fetchData();
  }, []);


  return token ? (
    user === "" ? (
      <Loading />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <ErrorPage />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
};
export default RequireAuth;
