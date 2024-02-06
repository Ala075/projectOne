import { useEffect, useState } from "react";
import InputsForm from "../../components/InputsForm";
import axios from "axios";
import { BASE_URL } from "../../api/Config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../src/auth/auth.css";
import { useNavigate } from "react-router-dom";
import "./custom.css";
import { Axios } from "../../api/Axios";

const CustomUser = ({ user }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [repeatPwd, setRepeatPwd] = useState("");
  const [role, setRole] = useState("Choise a role");

  const [error, setError] = useState({
    username: "Ivalid username !",
    email: "Invalid email format !",
    password: "You should write a strong password !",
    repeatPwd: "password don't match !",
    message: "",
  });

  const navigate = useNavigate();

  const showError = (message) => {
    setError((prevError) => ({ ...prevError, message }));
    toast.error(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pwd !== repeatPwd) {
      showError("Passwords don't match !");
      return;
    }

    /*if (user) {
      if (user.name === username && user.email === email && user.role === role) {
        showError("No changes were made !");
        return;
      }
    }*/

    const formData = {
      name: username,
      email,
      password: pwd,
      role,
    };

    try {
      if (!user) {
        const res = await Axios.post("/Users", formData);

        if (res.status === 201) {
          toast.success("User added successfully !");
          navigate("/dashboard/Users");
        }
      } else {
        const res = await Axios.patch(`/Users/${user._id}`, formData);

        if (res.status === 200) {
          toast.success("User updated successfully !");
          navigate("/dashboard/Users");
        }
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        showError(err.response.data.message);
      } else {
        showError("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    if (user) {
      setUsername(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  return (
    <>
      <ToastContainer position="bottom-center" autoClose={5000} />
      <section className="custom-form">
        <form className="form" onSubmit={handleSubmit}>
          <div className="title">
            <h2>{user ? "Edit User" : "Create User"}</h2>
          </div>

          <div className="form-group">
            <InputsForm
              name="Username"
              type="text"
              placeholder="Enter a username"
              value={username}
              error={error.username}
              setChange={setUsername}
              pattern="^[A-Za-z0-9]{3,17}$"
            />
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
              value={pwd}
              error={error.password}
              setChange={setPwd}
              pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$"
            />
            <InputsForm
              name="Repeat Password"
              type="password"
              placeholder="Repeat password"
              value={repeatPwd}
              error={error.repeatPwd}
              setChange={setRepeatPwd}
              pattern={pwd}
            />
            <label htmlFor="role">Role</label>
            <select
              name="role"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Choise a role</option>
              <option value="2000">Customer</option>
              <option value="3000">Producer</option>
              <option value="4000">Chef</option>
              <option value="5000">Caissier</option>
              <option value="9000">Admin</option>
            </select>
          </div>

          <div className="log">
            <button type="button" onClick={() => navigate(-1)}>
              Back
            </button>

            <button type="submit" style={{ width: "100%" }} id="next">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default CustomUser;
