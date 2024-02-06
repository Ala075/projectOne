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

const CustomCategory = ({ category }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [error, setError] = useState({
    name: "Ivalid name !",
    description: "Invalid description !",
    message: "",
  });

  const navigate = useNavigate();

  const showError = (message) => {
    setError((prevError) => ({ ...prevError, message }));
    toast.error(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*if (user) {
      if (user.name === username && user.email === email && user.role === role) {
        showError("No changes were made !");
        return;
      }
    }*/

    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    form.append("image", image);

    try {
      if (!category) {
        console.log("form", form);
        const res = await Axios.post("/Categories", {
          name,
          description,
          image,
        });

        if (res.status === 201) {
          toast.success("Category added successfully !");
          navigate("/dashboard/Categories");
        }
      } else {
        const res = await Axios.patch(`/Categories/${category._id}`, {
          name,
          description,
          image,
        });

        if (res.status === 200) {
          toast.success("Category updated successfully !");
          navigate("/dashboard/Categories");
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
    console.log("category", category);
    if (category) {
      setName(category.name);
      setDescription(category.description);
    }
  }, [category]);

  return (
    <>
      <ToastContainer position="bottom-center" autoClose={5000} />
      <section className="custom-form">
        <form className="form" onSubmit={handleSubmit}>
          <div className="title">
            <h2>{category ? "Edit Category" : "Create Category"}</h2>
          </div>

          <div className="form-group">
            <InputsForm
              name="Name"
              type="text"
              placeholder="Enter a name"
              value={name}
              error={error.name}
              setChange={setName}
            />
            <InputsForm
              name="Description"
              type="text"
              placeholder="Enter a description"
              value={description}
              error={error.description}
              setChange={setDescription}
            />
            <label htmlFor="image">Image</label>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
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

export default CustomCategory;
