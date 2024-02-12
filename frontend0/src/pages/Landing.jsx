import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";
import ProductList from "../components/products/ProductList.jsx";
import "../components/products/products.css";
import "../components/categories/categories.css";
import CategoryList from "../components/categories/CategoryList.jsx";

const Landing = () => {
  return (
    <>
      <Header />
      <div className="landing">
        <div className="container">
          <div className="content">
            <div className="text">
              <h2>Build your business with us</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                voluptatem, quos, accusantium voluptatum, rem quod voluptate
                dolorum nesciunt quas voluptatibus quae. Quisquam, quas
                voluptates? Quisquam, quas voluptates?
              </p>
              <button>
                <Link to="/Dashboard">
                  <span>Let s Go</span>
                </Link>
              </button>
            </div>
            <div className="img">
              <img src="src/assets/undraw_react_re_g3ui.svg" alt="landing" />
            </div>
          </div>
        </div>
      </div>

      <div className="categories" style={{borderBottom:"1px solid white"}}>
        <div
          className="categories__container"
          style={{ backgroundColor: "#898989" }}
        >
          <div className="categories__container__title">
            <h1>Categories</h1>
          </div>
          <CategoryList />
        </div>
      </div>

      <div
        className="products__container"
        style={{ backgroundColor: "#898989", padding: "15px" }}
      >
        <h2 className="products__container__title">Products</h2>
        <ProductList />
      </div>

      <Footer />
    </>
  );
};

export default Landing;
