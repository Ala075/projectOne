import { useEffect, useState } from "react";
import { Axios } from "../api/Axios";
import { IMAGE_URL } from "../api/Config";

const MainDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedData = async () => {
      const storedCategories = localStorage.getItem("categories");
      const storedProducts = localStorage.getItem("products");
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      } else {
        try {
          const res = await Axios.get("/Categories");
          setCategories(res.data.categories);
          localStorage.setItem(
            "categories",
            JSON.stringify(res.data.categories)
          );
        } catch (error) {
          console.log(error);
        }
      }
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        try {
          const res = await Axios.get("/Products");
          setProducts(res.data.products);
          localStorage.setItem("products", JSON.stringify(res.data.products));
        } catch (error) {
          console.log(error);
        }
      }
    };

    storedData();
  }, []);

  return (
    <div className="main__dashboard">
      <div className="container__left">
        <div className="restaurant__area">
          <div className="content__area">
            <p>Discover Our Service In 35 Areas</p>
            <button>Discover</button>
          </div>
          <div className="restaurant__images">
            <div className="img">
              <img
                src="../../src/assets/img_3d_food_icon_by_199x210.png"
                alt="image"
              />
            </div>
            <div className="img">
              <img src="../../src/assets/react.svg" alt="image" />
            </div>
          </div>
        </div>

        <div className="categories__dashboard">
          <div className="container">
            <h2>Categories</h2>
            <div className="categories__list">
              {categories &&
                categories.map((category) => (
                  <div className="categories__item" key={category._id}>
                    <div className="img">
                      <img src={IMAGE_URL + category.image} alt="" />
                    </div>
                    <p className="categories__item__name">{category.name}</p>
                  </div>
                ))}
            </div>
          </div>
                </div>

        <div className="categories__dashboard" style={{ color: "black" }}>
          <div className="container">
            <h2>Products</h2>
            <div className="products__list">
              {products &&
                products.map((product) => (
                  <div className="products__item" key={product._id}>
                    <div className="img">
                      <img src={IMAGE_URL + product.image} alt="" />
                    </div>
                    <p className="products__item__name">{product.name}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container__right">
        <div className="profile__settings">
          <h2>Profile Settings</h2>
          <div className="profile__settings__list">
            <div className="profile__settings__item">
              <div className="img">
                <img src="../../src/assets/Profile.svg" alt="" />
              </div>
              <p>Profile</p>
            </div>
            <div className="profile__settings__item">
              <div className="img">
                <img src="../../src/assets/Settings.svg" alt="" />
              </div>
              <p>Settings</p>
            </div>
            <div className="profile__settings__item">
              <div className="img">
                <img src="../../src/assets/Logout.svg" alt="" />
              </div>
              <p>Logout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
