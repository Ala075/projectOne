import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import axios from "axios";
import { BASE_URL } from "../api/Config";

const Logout = () => {
  const navigate = useNavigate();
  const cookie = Cookie();

  async function handleLogout() {
    try {
      await axios.get(`${BASE_URL}/logout`);

      cookie.remove("token");
      cookie.remove("userId");
      
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
    }
  }

  return <span onClick={handleLogout}>Logout</span>;
};
export default Logout;
