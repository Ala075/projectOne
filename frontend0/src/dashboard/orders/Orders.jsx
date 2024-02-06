import { useEffect, useState } from "react";
import "./orders.css";
import Table from "../../components/table/Table";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorPage from "../../pages/ErrorPage";
import { Axios } from "../../api/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const showError = (message) => {
    toast.error(message);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const ordersRes = await Axios.get("/Orders");

        // Fetch the customer and product names for each order
        const fetchedOrders = ordersRes.data.orders;

        for (const order of fetchedOrders) {
          const customerRes = await Axios.get(`/Users/${order.customer}`);
          order.customer = customerRes.data.user.name;

          for (const p of order.products) {
            const productRes = await Axios.get(`/Products/${p.product}`);
            p.product = productRes.data.product.name;
          }
        }

        setOrders(fetchedOrders);
      } catch (error) {
        setError(true);
        showError(
          error.response?.data?.message || "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  const headers = ["reference", "customer", "products", "status", "total"];

  const addOrder = () => {
    navigate("/dashboard/Orders/Order");
  };

  const editOrder = (order) => {
    navigate(`/dashboard/Orders/${order._id}`);
  };

  const deleteOrder = async (orderId) => {
    try {
      await Axios.delete(`/Orders/${orderId}`);

      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (error) {
      showError(error.response?.data.message);
    }
  };

  return (
    <>
      <ToastContainer position="bottom-center" autoClose={5000} />
      <div className="orders">
        <div className="orders__container">
          {loading ? (
            <Loading />
          ) : (
            <div className="orders__list">
              <div className="orders__listHeader">
                <h3>Orders</h3>
                <button className="btn btn--primary" onClick={addOrder}>
                  Add Order
                </button>
              </div>
              <div className="orders__listContent">
                <Table
                  headers={headers}
                  data={orders}
                  edit={editOrder}
                  deleteFn={deleteOrder}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
