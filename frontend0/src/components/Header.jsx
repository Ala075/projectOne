import { useContext, useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import Cookie from "cookie-universal";
import Logout from "../auth/Logout";
import { BasketContext } from "../Context+Reducer/BasketContext";
import { useNavigate } from "react-router-dom";
import { Axios } from "../api/Axios";
import { toast } from "react-toastify";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [productsLength, setProductsLength] = useState(0);
  const { products } = useContext(BasketContext);
  const [token, setToken] = useState(null);
  const [profileImage, setProfileImage] = useState("");

  const cookie = Cookie();
  const userId = cookie.get("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const token = cookie.get("eShop");
    setToken(token);
  }, [token]);

  useEffect(() => {
    setProductsLength(products.length);
  }, [products]);

  const showError = (message) => {
    toast.error(message);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(`/Users/${userId}`);
        console.log(isStaff);

        if ([4000, 5000, 7000, 9000].includes(res.data.user.role)) {
          setIsStaff(true);
        }
        if (res.data.user.image) {
          setProfileImage(
            "http://localhost:3001/public/images/" + res.data.user.image
          );
        }
      } catch (error) {
        showError(error.response?.data?.message || "An error occurred");
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const handleProfil = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="header">
      <div className="container">
        <div className="content">
          <div className="logo">
            <span>logo</span>
          </div>

          <nav>
            <ul>
              <Link to={"/"} className="link active">
                Home
              </Link>
              <Link to={"/about"} className="link">
                About
              </Link>
              <Link to={"/services"} className="link">
                Services
              </Link>
              <Link to={"/contact"} className="link">
                Contact
              </Link>
            </ul>
          </nav>

          <div className="others">
            <div
              className="profil__content"
              style={{ display: isOpen ? "block" : "none" }}
            >
              {isStaff && (
                <p
                  onClick={() => navigate("/Dashboard")}
                  style={{ cursor: "pointer" }}
                >
                  Dashbord
                </p>
              )}
              <p
                onClick={() => navigate("/Profil")}
                style={{ cursor: "pointer" }}
              >
                Edit Profil
              </p>
              <Logout style={{ cursor: "pointer" }} />
            </div>
            <div>
              {!token ? (
                <button>
                  <Link to="/signup">
                    <span>Get Started</span>
                  </Link>
                </button>
              ) : (
                <div className="header__avatar" onClick={handleProfil}>
                  <img
                    style={{
                      borderRadius: "50%",
                      height: "40px",
                      width: "40px",
                      objectFit: "cover",
                      border: "1px solid #eee",
                    }}
                    src={
                      profileImage ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt="avatar"
                  />
                </div>
              )}
            </div>
            <Link to="/basket">
              <ShoppingCart className="theme" />
              <span>{productsLength}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
