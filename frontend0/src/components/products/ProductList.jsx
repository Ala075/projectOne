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
import PropTypes from "prop-types";

const ProductList = ({ productList }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  //const { addToBasket } = useContext(BasketContext);

  const navigate = useNavigate();

  const showError = (message) => {
    toast.error(message);
  };

  // Récupérer les products
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const items = localStorage.getItem("productsList");
        if (items) {
        const res = await Axios.get("/Items");

        setProducts(res.data.itemsMenu);
        }else{
          setProducts(JSON.parse(items));
        }
      } catch (error) {
        showError(error.response?.data.message);
      } finally {
        setLoading(false);
      }
    };

    if (!productList) {
      fetchData();
    } else {
      setProducts(productList);
    }
  }, [productList]);

  useEffect(() => {
    const items = localStorage.getItem("productsList");
    if (items) {
      setProducts(JSON.parse(items));
    }
  }, []);

  /*const handleBasket = (product) => () => {
    const productExist = products.find((p) => p._id === product._id);
    if (!productExist) {
      product = { ...product, quantity: 1 };
    }
    addToBasket(product);
  };*/

  ProductList.propTypes = {
    productList: PropTypes.array,
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
              <div className="products__item" key={product._id} 
              onClick={() => navigate(`/Product/${product._id}`)}>
                <div className="products__item__image">
                  <img src={IMAGE_URL + product.images[0]} alt={product.name} />
                </div>
                <div className="products__item__name">
                  <span>{product.name}</span>
                </div>
                <div className="products__item__description">
                  <span>{product.description}</span>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
