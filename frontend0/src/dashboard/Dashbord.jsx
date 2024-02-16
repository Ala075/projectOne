import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Cookie from "cookie-universal";
import Logout from "../auth/Logout";
import {
  BadgeDollarSign,
  Bell,
  BookOpenText,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  Table2,
  UsersRound,
  Utensils,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Axios } from "../api/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IMAGE_URL } from "../api/Config";

const Dashbord = () => {
  const [user, setUser] = useState("");

  // Récupérer l'id de l'utilisateur
  const cookie = Cookie();
  const userId = cookie.get("userId");
  const focusRef = useRef(null);

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

  const handleFocus = (e) => {
    const links = document.querySelectorAll(".link");

    links.forEach((link) => {
      if (link.children[1] === e.target) {
        focusRef.current = link;
      }
      link.classList.remove("active");
    });

    focusRef.current.classList.add("active");
  };

  return (
    <>
      <ToastContainer position="bottom-center" autoClose={5000} />
      <div className="dashboard">
        <main className="main">
          <nav className="sidebar">
            <div className="header_sidebar">
              <img src="../../src/assets/pngegg.png" alt="logo" />
            </div>

            <div className="links">
              <Link to="" className="link active" onClick={handleFocus}>
                <LayoutDashboard className="icon" />
                <span>Dashboard</span>
              </Link>

              <Link to="restaurants" className="link" onClick={handleFocus}>
                <Home className="icon" />
                <span>Restaurant</span>
              </Link>

              <Link to="Users" className="link" onClick={handleFocus}>
                <UsersRound className="icon" />
                <span>Users</span>
              </Link>

              <Link to="Products" className="link" onClick={handleFocus}>
                <Utensils className="icon" />
                <span>Food List</span>
              </Link>

              <Link to="Categories" className="link" onClick={handleFocus}>
                <BookOpenText className="icon" />
                <span> Categories</span>
                {/*<ChevronDown />*/}
              </Link>

              <Link to="Orders" className="link" onClick={handleFocus}>
                <Table2 className="icon" />
                <span>Orders</span>
              </Link>

              <Link to="Sales" className="link" onClick={handleFocus}>
                <BadgeDollarSign className="icon" />
                <span>Total Sales</span>
              </Link>
            </div>
            <div className="others">
              <Link to="Settings" className="link" onClick={handleFocus}>
                <Settings className="icon" />
                <span> Settings</span>
              </Link>

              <div className="link" onClick={handleFocus}>
                <LogOut className="icon" />
                <Logout />
              </div>
            </div>
          </nav>

          <div className="content">
            <div className="header">
              <div className="title">
                <h3>Hi, Mr. {user.name} !</h3>
                <p>Welcome to your dashbord!</p>
              </div>

              <div className="search__bar">
                <input type="text" placeholder="Tap here to search" />
                <Bell className="notif" />
              </div>

              <div className="user">
                <span className="user__name">{user.name}</span>
                <div className="avatar">
                  <img
                    src={
                      IMAGE_URL + user.image ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt="avatar"
                  />
                </div>
              </div>
            </div>
            <div className="content__body">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashbord;
