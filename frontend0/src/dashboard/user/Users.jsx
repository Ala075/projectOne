import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { Axios } from "../../api/Axios";
import Loading from "../../components/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { defineRole } from "../../components/DefineRole";
import Table from "../../components/table/Table";
import ErrorPage from "../../pages/ErrorPage";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const cookie = Cookie();

  const userId = cookie.get("userId");

  const showError = (message) => {
    toast.error(message);
  };

  // Récupérer les utilisateurs "²"
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await Axios.get("/Users");

        setUsers(res.data.users);
      } catch (error) {
        setError(true);
        showError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const headers = ["name", "email", "role"];

  // mettre à jour le rôle
  const updatedArray = users.map((user) => {
    return {
      ...user,
      role: defineRole(user.role),
    };
  });

  // Mettre à jour le tableau des utilisateurs
  const editUser = (user) => {
    navigate(`/dashboard/Users/${user._id}`);
  };

  const deleteUser = async (id) => {
    try {
      await Axios.delete(`/Users/${id}`);
      const newUsers = users.filter((user) => user._id !== id);

      setUsers(newUsers);
    } catch (error) {
      showError(error.response.data.message);
    }
  };

  const addUser = () => {
    navigate(`/dashboard/User`);
  };

  return (
    <>
      <ToastContainer position="bottom-center" autoClose={5000} />
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorPage />
      ) : (
        <>
          <div
            style={{
              width: "100%",
              padding: "1rem .5rem",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#242424",
            }}
          >
            <p>All Users:</p>
            <button style={{padding:".5rem", backgroundColor:"gray", outline:"none", border:"none"}} onClick={addUser}>
              Add User
            </button>
          </div>
          <Table
            data={updatedArray}
            headers={headers}
            edit={editUser}
            deleteFn={deleteUser}
            addUser={addUser}
            userId={userId}
          />
        </>
      )}
    </>
  );
};

export default Users;
