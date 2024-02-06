{
  /*import { useEffect, useState } from "react";
import "./sales.css";
import { Axios } from "../../api/Axios";
import { toast } from "react-toastify";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersRes = await Axios.get("/Orders");
        setOrders(ordersRes.data.orders);
      } catch (err) {
        toast.error(
          err.response.data.message || "An unexpected error occurred."
        );
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const createSalesForExpiredOrders = async () => {
      for (const order of orders) {
        if (order.status === "pending") {
          try {
            const res = await Axios.post("/Sales", {
              order: order._id,
              total: order.total,
            });
            if (res.status === 201) {
              setSales((prevSales) => [...prevSales, res.data.sale]);
            }
          } catch (err) {
            toast.error(
              err.response?.data.message || "An unexpected error occurred."
            );
          }
        }
      }
    };

    if (orders.length > 0) {
      createSalesForExpiredOrders();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesRes = await Axios.get("/Sales");
        setSales(salesRes.data.sales);
      } catch (err) {
        toast.error(
          err.response.data.message || "An unexpected error occurred."
        );
      }
    };
    fetchData();
  }, []);

  return (
    <div className="sales">
      <div className="sales__container">
        <div className="sales__header">
          <h1>Sales</h1>
        </div>
        <div className="sales__list">
          {sales ? (
            sales.map((sale, index) => (
              <div className="sales__item" key={sale._id}>
                <div className="sales__item-header">
                  <h3>{index + 1}</h3>
                </div>
                <div className="sales__item-content">
                  {orders.filter((p) => p._id === sale.order).reference}
                </div>
              </div>
            ))
          ) : (
            <p>No sales to show</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sales;*/
}

import { useEffect, useState } from "react";
import "./sales.css";
import { Axios } from "../../api/Axios";
import { toast } from "react-toastify";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState([]);

  // Fetch sales data
  useEffect(() => {
    const fetchSales = async () => {
      setLoading(true);
      try {
        const salesRes = await Axios.get("/Sales");
        setSales(salesRes.data.sales);
        setError(false);
      } catch (err) {
        setError(true);
        toast.error(
          err.response?.data.message || "An unexpected error occurred."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  // Fetch orders data
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const ordersRes = await Axios.get("/Orders"); // Endpoint should be lowercase
        setOrders(ordersRes.data.orders);
        setError(false);
      } catch (err) {
        setError(true);
        toast.error(
          err.response?.data.message || "An unexpected error occurred."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Create sales for expired orders
  useEffect(() => {
    const createSalesForExpiredOrders = async () => {
      for (const order of orders) {
        console.log(order);
        if (order.status === "pending") {
          console.log(order);
          try {
            const res = await Axios.post("/Sales", {
              // Endpoint should be lowercase
              order: order._id,
              total: order.total+1,
            });
            if (res.status === 201) {
              setSales((prevSales) => [...prevSales, res.data.sale]);
            }
          } catch (err) {
            toast.error(
              err.response?.data.message || "An unexpected error occurred."
            );
          }
        }
      }
    };


      // Prevent duplicate sales creation
      createSalesForExpiredOrders();

  }, []); 

  // Display loading or error state
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading sales data.</p>;

  return (
    <div className="sales">
      <div className="sales__container">
        <div className="sales__header">
          <h1>Sales</h1>
        </div>
        <div className="sales__list">
          {sales.length > 0 ? (
            sales.map((sale, index) => (
              <div className="item" key={sale._id}>
                <div className="item-header">
                  <h3>{index + 1}</h3>
                </div>
                <div className="item-content">
                  {orders.find((order) => order._id === sale.order)
                    ?.reference || "Order not found"}
                </div>
              </div>
            ))
          ) : (
            <p>No sales to show</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sales;
