import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../api/Axios";
import { IMAGE_URL } from "../../api/Config";

const ProductInfo = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await Axios.get(`/products/${id}`);
        console.log(IMAGE_URL + res.data.product.images[0]);

        setProduct(res.data.product);
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div
      className="product"
      style={{ height: "100vh", backgroundColor: "#898989" }}
    >
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <div className="product__info">
          <div className="product__info__image">
            {product.images &&
              product.images.map((image, index) => (
                <img src={IMAGE_URL + image} alt={product.name} key={index} />
              ))}
          </div>
          <div className="product__info__details">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price} €</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
