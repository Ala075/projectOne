import { useEffect, useRef, useState } from "react";
import { Axios } from "../../api/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { defineRole } from "../DefineRole";
import Cookie from "cookie-universal";
import "./profile.css";
import { PencilLine } from "lucide-react";
import defaultAvatar from "../../assets/react.svg";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});
  const [profileImage, setProfileImage] = useState("");
  const profileInput = useRef(null);
  const cookie = Cookie();
  const userId = cookie.get("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(`/Users/${userId}`);
        setUser(res.data.user);
        if (res.data.user.image) {
          setProfileImage(imageToUrl(res.data.user.image));
        }
      } catch (error) {
        showError(error.response?.data?.message || "An error occurred");
        console.log(error.response)
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const showError = (message) => {
    toast.error(message);
  };

  const showSuccess = (message) => {
    toast.success(message);
  };

  const openFile = () => {
    profileInput.current.click();
  };

  const imageToUrl = (image) => {
    if (image) {
      return URL.createObjectURL(image);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

      const fileUrl = imageToUrl(file);
      setProfileImage(fileUrl);

    const formData = new FormData();
    formData.append("image", file);

    try {
      Axios.patch(`/Users/${userId}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      showSuccess("Image updated");
    } catch (error) {
      showError(error.response?.data?.message || "An error occurred");
    }
  };

  const editUser = (user) => {
    navigate(`/dashboard/Users/${user._id}`);
  };

  return (
    <div className="profil">
      <ToastContainer />
      <div className="profile__header">
        <h2>Profile</h2>
        <button className="edit" onClick={() => editUser(user)}>
          Edit
        </button>
      </div>
      <div className="profile__content">
        <div className="avatar">
          <img src={profileImage || defaultAvatar} alt="avatar" />
          <input
            type="file"
            ref={profileInput}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <PencilLine className="avatar__edit" onClick={openFile} />
        </div>
        <div className="info">
          <h3>Username: {user.name}</h3>
          <h3>Email: {user.email}</h3>
          <h3>Last update: {user.updatedAt || "Not updated"}</h3>
          <h3>Role: {user.role && defineRole(user.role)}</h3>
        </div>
      </div>
    </div>
  );
};

export default Profile;
