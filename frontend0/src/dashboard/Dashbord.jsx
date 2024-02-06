import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Cookie from "cookie-universal";
import {
  BadgeDollarSign,
  BookOpenText,
  CircleUserRound,
  SeparatorHorizontal,
  Settings,
  ShoppingBasket,
  Table2,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Axios } from "../api/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { defineRole } from "../components/DefineRole";

const Dashbord = () => {
  const [user, setUser] = useState("");

  // Récupérer l'id de l'utilisateur
  const cookie = Cookie();
  const userId = cookie.get("userId");

  const showError = (message) => {
    toast.error(message);
  };

  // Récupérer les informations de l'utilisateur
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(`/Users/${userId}`);

        setUser(res.data.user);
      } catch (error) {
        showError(error.response.data.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ToastContainer position="bottom-center" autoClose={5000} />
      <div className="dashboard">
        <header className="header">
          <div className="logo">
            <h2>Dashboard</h2>
          </div>
          <div className="profile">
            <div className="name">
              <h3>{user.role && defineRole(user.role)}</h3>
            </div>
            <div className="avatar">
              {<img src="../../src/assets/react.svg" alt="avatar" />}
            </div>
          </div>
        </header>
        <main className="main">
          <nav className="sidebar">
            <div className="links">
              <Link to="Users" className="link  active">
                <UsersRound className="icon" />
                <span>Users</span>
                <SeparatorHorizontal />
              </Link>
              <Link to="Orders" className="link">
                <Table2 className="icon" />
                <span>Orders</span>
              </Link>
              <Link to="Sales" className="link">
                <BadgeDollarSign className="icon" />
                <span> Sales</span>
              </Link>
              <Link to="Products" className="link">
              <ShoppingBasket className="icon" />
                <span> Products</span>
              </Link>
              <Link to="Categories" className="link">
                <BookOpenText className="icon" />
                <span> Categories</span>
                {/*<ChevronDown />*/}
              </Link>
            </div>
            <div className="others">
              <Link to="Profil" className="link">
                <CircleUserRound className="icon" />
                <span>Profile</span>
              </Link>
              <Link to="Settings" className="link">
                <Settings className="icon" />
                <span> Settings</span>
              </Link>
            </div>
          </nav>
          <div className="content">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashbord;
