import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../api/Axios";
import Loading from "../Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./products.css";
import { PencilRuler, Trash2 } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showError = (message) => {
    toast.error(message);
  };

  // Récupérer les products
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await Axios.get("/Products");

        setProducts(res.data.products);
      } catch (error) {
        showError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const editProduct = (product) => {
    navigate(`/dashboard/Products/${product._id}`);
  };

  const deleteProduct = async (id) => {
    try {
      await Axios.delete(`/Products/${id}`);

      const newProducts = products.filter((product) => product._id !== id);

      setProducts(newProducts);
    } catch (error) {
      showError(error.response.data.message);
    }
  };

  const addProduct = () => {
    navigate("/dashboard/Products/Product");
  };

  return (
    <div className="products">
      <ToastContainer position="bottom-center" autoClose={5000} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="products__header">
            <h2>Products</h2>
            <button className="btn btn--primary" onClick={addProduct}>
              Add Product
            </button>
          </div>
          <div className="products__list">
            {products.map((product) => (
              <div className="products__item" key={product._id}>
                <div className="products__item__image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="products__item__name">
                  <span>{product.name}</span>
                </div>
                <div className="products__item__description">
                  <span>{product.description}</span>
                </div>
                <div className="products__item__actions">
                  <button
                    className="btn btn--icon"
                    onClick={() => editProduct(product)}
                  >
                    <PencilRuler />
                  </button>
                  <button
                    className="btn btn--icon"
                    onClick={() => deleteProduct(product._id)}
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Products;