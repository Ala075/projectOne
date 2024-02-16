import { useContext, useEffect, useState } from "react";
import { Axios } from "../../api/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./products.css";
import { Eye, ShoppingBasket } from "lucide-react";
import { BasketContext } from "../../Context+Reducer/BasketContext";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../api/Config";

const ProductList = ({ ProductList }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToBasket } = useContext(BasketContext);

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
        showError(error.response?.data.message);
      } finally {
        setLoading(false);
      }
    };

    if (!ProductList) {
      fetchData();
    } else {
      setProducts(ProductList);
    }
  }, [ProductList]);

  const handleBasket = (product) => () => {
    const productExist = products.find((p) => p._id === product._id);
    if (!productExist) {
      product = { ...product, quantity: 1 };
    }
    addToBasket(product);
  };

  return (
    <div className="products">
      <ToastContainer position="bottom-center" autoClose={5000} />
      {loading ? (
        <Loading />
      ) : (
        <div className="products__list">
          {products &&
            products.map((product) => (
              <div className="products__item" key={product._id}>
                <div className="products__item__image">
                  <img src={IMAGE_URL + product.images[0]} alt={product.name} />
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
                    onClick={handleBasket(product)}
                  >
                    <ShoppingBasket />
                  </button>
                  <button
                    className="btn btn--icon"
                    onClick={() => navigate(`/Product/${product._id}`)}
                  >
                    <Eye />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
