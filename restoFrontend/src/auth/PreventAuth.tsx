import { Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";

const PreventAuth = () => {
  const Navigate = useNavigate();
  const cookie = Cookie();
  const token = cookie.get("token");

  return !token ? <Outlet /> : window.location.pathname= "/";
};
export default PreventAuth;
