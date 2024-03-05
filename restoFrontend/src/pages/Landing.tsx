import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import { Link, useNavigate } from "react-router-dom";
import { IMAGE_URL } from "@/api/Config.tsx";
import { useRes } from "@/context/ResCtx.tsx";

const Landing = () => {
  const { categories, items: products, setFilteredItems, setItem } = useRes();

  const navigate = useNavigate();

  const handleClickCategory = (name: string) => () => {
    const filtered = products.filter((product) => product.category === name);
    setFilteredItems(filtered);
    navigate("/menu");
  };

  const handleClickItem = (product) => {
    setItem(product);
    navigate("/menu");
  };

  return (
    <>
      <Header />
      <div className="landing">
        <div className="landing__container">
          <div className="homepage">
            <div className="hero">
              <h1>Resto</h1>
              <p>Best restaurant in town</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <button>
                <Link to="/menu">View Menu</Link>
              </button>
            </div>

            <div className="landing__img"></div>
          </div>

          <div className="home__categories">
            <h2>Categories</h2>
            <div className="categories__list">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="category__home"
                  onClick={handleClickCategory(category.name)}
                >
                  <div className="img">
                    <img src={IMAGE_URL + category.image} alt={category.name} />
                  </div>
                  <h3>{category.name}</h3>
                </div>
              ))}
            </div>
          </div>

          <div className="home__products">
            <h2>Items From Our Menu</h2>

            <div className="products__list">
              {products.map((product, index) => (
                <div key={index} className="product__home" onClick={()=>handleClickItem(product)}>
                  <div className="img">
                    <img
                      src={IMAGE_URL + product.images[0]}
                      alt={product.name}
                    />
                  </div>
                  <h3>{product.name}</h3>
                  <p>{product.price} DT</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Landing;
