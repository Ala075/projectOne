import { useEffect, useState } from "react";
import InputsForm from "../../components/InputsForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../api/Axios";
import "./custom.css";
import "../../../src/auth/auth.css";

const CustomOrder = ({ order }) => {
  const [reference, setReference] = useState("");
  const [customer, setCustomer] = useState("");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const productsRes = await Axios.get(`/Products`);
        setProducts(productsRes.data.products);

        const usersRes = await Axios.get(`/Users`);
        setUsers(usersRes.data.users);
      } catch (err) {
        toast.error(
          err.response.data.message || "An unexpected error occurred."
        );
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (order) {
      setReference(order.reference);
      setCustomer(order.customer);
      setSelectedProducts(
        order.products.map((p) => ({
          product: p.product,
          quantity: p.quantity 
        }))
      );
    }
  }, [order]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        reference,
        customer,
        products: selectedProducts,
        total,
      };

      let res;
      if (order) {
        res = await Axios.patch(`/Orders/${order._id}`, payload);
      } else {
        console.log("payload", payload);
        res = await Axios.post("/Orders", payload);
      }

      if (res.status === 200 || res.status === 201) {
        toast.success(`Order ${order ? "updated" : "added"} successfully!`);
        navigate("/dashboard/Orders");
      }
    } catch (err) {
      toast.error(
        err.response?.data.message || "An unexpected error occurred."
      );
    }
  };

  /*const handleProductSelection = (productId) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.includes(productId)
        ? prevSelectedProducts.filter((id) => id !== productId)
        : [...prevSelectedProducts, productId]
    );
  };*/
  const handleProductSelection = (productId, quantity = 1) => {
    // Default quantity to 1 if not provided
    setSelectedProducts((prevSelectedProducts) => {
      const productExists = prevSelectedProducts.find(
        (p) => p.product === productId
      );
      if (productExists) {
        return prevSelectedProducts.filter((p) => p.product !== productId);
      } else {
        return [...prevSelectedProducts, { product: productId, quantity }];
      }
    });
  };

  return (
    <>
      <ToastContainer position="bottom-center" autoClose={5000} />
      <section className="custom-form">
        <form className="form" onSubmit={handleSubmit}>
          <div className="title">
            <h2>{order ? "Edit Order" : "Create Order"}</h2>
          </div>
          <div className="form-group">
            <InputsForm
              name="Reference"
              type="text"
              placeholder="Enter a reference"
              value={reference}
              error={error.reference}
              setChange={setReference}
            />

            <div className="list__users">
              <label>Customer</label>
              <div className="list">
                {users.map((user) => (
                  <label key={user._id} className="list">
                    {user.name}
                    <input
                      type="radio"
                      checked={customer === user._id}
                      onChange={() => setCustomer(user._id)}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/*<div className="list__products">
            {products.map((product) => (
              <label key={product._id}>
                {product.name}
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product._id)}
                  onChange={() => handleProductSelection(product._id)}
                />
              </label>
            ))}
          </div>*/}
            <div className="list__products">
              <label>Products</label>
              <div className="list">
                {products.map((product) => (
                  <label key={product._id}>
                    {product.name}
                    <input
                      type="checkbox"
                      checked={selectedProducts.some(
                        (p) => p.product === product._id
                      )}
                      onChange={() => handleProductSelection(product._id)}
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="log">
            <button type="button" onClick={() => navigate(-1)}>
              Back
            </button>
            <button type="submit" style={{ width: "100%" }} id="next">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default CustomOrder;

/*// ... (other imports and code)

const CustomOrder = ({ order }) => {
  // ... (other states and useEffects)

  useEffect(() => {
    if (order) {
      setReference(order.reference);
      setCustomer(order.customer);
      setSelectedProducts(
        order.products.map((p) => ({
          product: p.product,
          quantity: p.quantity // Assuming quantity is also passed in the order prop
        }))
      );
    }
  }, [order]);

  // ... (other functions)

  const handleProductSelection = (productId, quantity = 1) => { // Default quantity to 1 if not provided
    setSelectedProducts((prevSelectedProducts) => {
      const productExists = prevSelectedProducts.find(p => p.product === productId);
      if (productExists) {
        return prevSelectedProducts.filter(p => p.product !== productId);
      } else {
        return [...prevSelectedProducts, { product: productId, quantity }];
      }
    });
  };

  // ... (render method and return statement)

  // Corrected checked property for product selection inputs
  <div className="list__products">
    {products.map((product) => (
      <label key={product._id}>
        {product.name}
        <input
          type="checkbox"
          checked={selectedProducts.some(p => p.product === product._id)}
          onChange={() => handleProductSelection(product._id)}
        />
      </label>
    ))}
  </div>

  // ... (rest of the form and component)
};

export default CustomOrder;
*/
