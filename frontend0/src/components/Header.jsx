import { useEffect, useState } from "react";
import { MoonStar } from "lucide-react";
import { Link } from "react-router-dom";
import Cookie from "cookie-universal";
import Logout from "../auth/Logout";

const Header = () => {
  const [token, setToken] = useState(null);
  const cookie = Cookie();

  useEffect(() => {
    const token = cookie.get("eShop");
    setToken(token);
  }, [token]);

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
            <button>
              {!token ? (
                <Link to="/signup">
                  <span>Get Started</span>
                </Link>
              ) : (
                <Logout />
              )}
            </button>
            <MoonStar className="theme" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
