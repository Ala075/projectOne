import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../api/Axios";
import { IMAGE_URL } from "../../api/Config";
import ProductList from "./ProductList";
import { ShoppingBasket } from "lucide-react";
import { BasketContext } from "../../Context+Reducer/BasketContext";

const ProductInfo = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { products: basketProducts, addToBasket } = useContext(BasketContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await Axios.get(`/products/${id}`);

        setImages(
          res.data.product.images.filter((image) => image !== images[0])
        );
        setProduct(res.data.product);
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get("/Products?searchTerm=" + product.category+"&ignore="+product._id);

        setProducts(res.data.products);
      } catch (error) {
        //setError(error.response.data.message);
      }
    };

    if (product.category) {
      fetchData();
    }
  }, [product.category]);

  const handleBasket = (product) => () => {
    const productExist = basketProducts.find((p) => p._id === product._id);
    if (!productExist) {
      product = { ...product, quantity: 1 };
    }
    addToBasket(product);
  };

  return (
    <>
      <div
        className="product__info"
        style={{ height: "100vh", backgroundColor: "#898989" }}
      >
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div style={{ color: "red" }}>{error}</div>
        ) : (
          <>
            <h2 style={{ color: "#152958" }}>{product && product.name}</h2>
            <div className="product__info__content">
              <div className="product__item__images">
                {product.images && (
                  <img
                    className="main"
                    src={IMAGE_URL + product.images[0]}
                    alt={product.name}
                  />
                )}
                <div className="product__item__images__list">
                  {images &&
                    images.map((image, index) => (
                      <img
                        className="other"
                        src={IMAGE_URL + image}
                        alt={product.name}
                        key={index}
                      />
                    ))}
                </div>
              </div>
              <div className="product__info__details">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>{product.price} €</p>
                <button
                  className="btn btn--icon"
                  onClick={handleBasket(product)}
                >
                  <ShoppingBasket />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="other__products">
        <h2>Related Products</h2>
        <ProductList ProductList={products && products} />
      </div>
    </>
  );
};

export default ProductInfo;
