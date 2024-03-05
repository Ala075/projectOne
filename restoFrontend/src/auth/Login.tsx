import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../assets/arbre.jpg";
import "./auth.css";
import InputsForm from "../components/InputsForm.tsx";
import axios from "axios";
import { BASE_URL } from "../api/Config.tsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const cookie = Cookie();

  const [error, setError] = useState({
    email: "* Invalid email format!",
    password: "* Write a strong password!",
    message: "",
  });

  const showError = (message: string) => {
    setError((prevError) => ({ ...prevError, message }));
    toast.error(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = {
        email: email,
        password: password,
      };

      const res = await axios.post(`${BASE_URL}/login`, data);

      if (res.status === 200) {
        const { token, user: userId } = res.data;

        const options = { expires: new Date(Date.now() + 86400 * 1000) }; // 1 day expiration

        cookie.set("token", token, options);
        cookie.set("userId", userId, options);

        navigate("/", { replace: true });
      }
    } catch (err) {
      if (err?.response.data.message) {
        showError(err.response.data.message);
      } else {
        showError("An unexpected error occurred.");
      }
    }
  };

  const handleSign = () => {
    navigate("/signup");
  };

  return (
    <>
      <ToastContainer position="bottom-center" autoClose={5000} />
      <section className="login">
        <div className="login__container">
          <div className="content">
            <div className="img">
              <img src={img} alt="Sign In" />
            </div>
            <div className="box">
              <form className="form" onSubmit={handleSubmit}>
                <div className="head_form">
                  <span>Sign In</span>
                  <p>Login to your account</p>
                </div>
                <InputsForm
                  name="Email"
                  type="email"
                  placeholder="Enter an email"
                  value={email}
                  error={error.email}
                  setChange={setEmail}
                />
                <InputsForm
                  name="Password"
                  type="password"
                  placeholder="Enter a password"
                  value={password}
                  error={error.password}
                  setChange={setPassword}
                />

                <div className="log">
                  <button style={{ width: "100%",cursor:"pointer" }} type="submit" id="next">
                    Submit
                  </button>
                  <p>
                    You don t have account,{" "}
                    <span onClick={handleSign}>Sign-Up</span>
                  </p>

                  <div className="or">
                    <span>OR</span>
                  </div>

                  <p>
                    <i className="fa-brands fa-google"></i> Sign in with Google
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
