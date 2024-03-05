import { useContext, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import Logout from "../auth/Logout";
import { BasketContext } from "../context/BasketContext";
import { useTheme } from "@/context/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserContext } from "@/context/UserContext";

const Header = () => {
  const { products } = useContext(BasketContext);
  //const [productsLength] = useState(products.length);
  //const [isActive, setIsActive] = useState(true);
  const { theme, setTheme } = useTheme();
  const [position, setPosition] = useState("");
  const { profileImage, isStaff, auth } = useContext(UserContext);


  /*useEffect(() => {
    const handleScroll = () => {
      setIsActive(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); 
    };
  }, []);*/

  const handleProfil = () => {
    setPosition(position === "top" ? "" : "top");
  };

  return (
    <div className={`header `}>
      <div className="header__container">
        <div className="logo">
          <span>Food</span>
        </div>

        <div className="header__nav">
          <nav className="header__links">
            <NavLink to={"/"} className="link__header">
              Home
            </NavLink>
            <NavLink to={"/cart"} className="link__header">
              Cart
            </NavLink>
            <NavLink to={"/restaurants"} className="link__header">
              Restaurants
            </NavLink>
            <NavLink to={"/menu"} className="link__header">
              Menu
            </NavLink>
          </nav>

          <div className="header__others">
            <div className="header__others__links">
              {!auth.token ? (
                <button>
                  <Link to="/signup">
                    <span>Get Started</span>
                  </Link>
                </button>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="header__avatar" onClick={handleProfil}>
                      <img
                        src={
                          profileImage ||
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                        alt="avatar"
                      />
                    </div>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>option</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={position}
                      onValueChange={setPosition}
                    >
                      <DropdownMenuRadioItem value="top">
                        <Link to="/Profil">Edit Profil</Link>
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="left">
                        <Link to="/cart">Cart ({products.length})</Link>
                      </DropdownMenuRadioItem>
                      {isStaff && (
                        <DropdownMenuRadioItem value="bottom">
                          <Link to="/dashboard">Dashboard</Link>
                        </DropdownMenuRadioItem>
                      )}
                      <DropdownMenuRadioItem value="right">
                        <Logout style={{ cursor: "pointer" }} />
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            {
              /*<Link to="/cart">
              <span>
                <ShoppingCart />
                <span>{productsLength}</span>
              </span>
                  </Link>*/
            }
            {theme !== "light" ? (
              <Sun className="theme" onClick={() => setTheme("light")} />
            ) : (
              <Moon className="theme" onClick={() => setTheme("dark")} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
