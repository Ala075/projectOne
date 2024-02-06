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

const CustomProduct = ({ product }) => {
  const [reference, setReference] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("Select a category");
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState(0);

  const [error, setError] = useState({
    reference: "* Invalid reference !",
    name: "* Ivalid name !",
    description: "* Invalid description !",
    price: "* Invalid price !",
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
    form.append("reference", reference);
    form.append("name", name);
    form.append("description", description);
    form.append("price", price);
    form.append("category", category);
    form.append("image", image);

    try {
      if (!product) {
        const res = await Axios.post("/Products", {
          reference,
          name,
          description,
          image,
          price,
          category,
        });

        if (res.status === 201) {
          toast.success("Product added successfully !");
          navigate("/dashboard/Products");
        }
      } else {
        const res = await Axios.patch(`/Products/${product._id}`, {
          reference,
          name,
          description,
          image,
          price,
          category,
        });

        if (res.status === 200) {
          toast.success("Product updated successfully !");
          navigate("/dashboard/Products");
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
    const fetchData = async () => {
      try {
        const res = await Axios.get("/Categories");

        setCategories(res.data.categories);
      } catch (error) {
        showError(error.response.data.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
    }
  }, [product]);

  return (
    <>
      <ToastContainer position="bottom-center" autoClose={5000} />
      <section className="custom-form">
        <form className="form" onSubmit={handleSubmit}>
          <div className="title">
            <h2>{product ? "Edit Product" : "Create Product"}</h2>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              required
            >
              <option value="">Select a category</option>
              {categories &&
                categories.map((category, index) => (
                  <option value={category._id} key={index}>
                    {category.name}
                  </option>
                ))}
            </select>
            <InputsForm
              name="Reference"
              type="text"
              placeholder="Enter a reference"
              value={reference}
              error={error.reference}
              setChange={setReference}
            />
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
            <InputsForm
              name="Price"
              type="number"
              placeholder="Enter a price"
              value={price}
              error={error.price}
              setChange={setPrice}
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

export default CustomProduct;
