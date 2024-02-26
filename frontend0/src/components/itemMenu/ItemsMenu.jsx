import { useEffect, useState } from "react";
import { Axios } from "../../api/Axios";
import { IMAGE_URL } from "../../api/Config";
import "../products/products.css";
import { useNavigate } from "react-router-dom";
import { PencilRuler, Trash2 } from "lucide-react";
import DashboardTitle from "../DashboardTitle";
import Loading from "../Loading";
import { ToastContainer } from "react-toastify";

const ItemsMenu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await Axios.get("/Items");

        setItems(res.data.itemsMenu);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const editItem = (item) => {
    Navigate(`/dashboard/Items/${item._id}`);
  };

  const confirmDelete = () => {
    if (window.confirm("Voulez-vous vraiment supprimer cet élément ?")) {
      return true;
    } else {
      return false;
    }
  };

  const deleteItem = async (id) => {
    const del = confirmDelete();

    if (del) {
      try {
        await Axios.delete(`/Items/${id}`);

        const newItems = items.filter((item) => item._id !== id);

        setItems(newItems);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const addItem = () => {
    Navigate("/dashboard/Items/Item");
  };

  return (
    <>
      <ToastContainer position="bottom-center" autoClose={5000} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <DashboardTitle title="Items" addMethod={addItem} />
          <div className="products">
            <div className="products__list">
              {items.map((item) => (
                <div className="products__item" key={item._id}>
                  <div className="products__item__image">
                    <img src={IMAGE_URL + item.images[0]} alt={item.name} />
                  </div>
                  <div className="products__item__name">
                    <span>{item.name}</span>
                  </div>
                  <div className="products__item__description">
                    <span>{item.description}</span>
                  </div>
                  <div className="products__item__actions">
                    <button
                      className="btn btn--icon"
                      onClick={() => editItem(item)}
                    >
                      <PencilRuler />
                    </button>
                    <button
                      className="btn btn--icon"
                      onClick={() => deleteItem(item._id)}
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ItemsMenu;
