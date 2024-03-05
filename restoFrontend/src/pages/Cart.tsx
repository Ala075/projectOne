import { useContext } from "react";
import { BasketContext } from "../context/BasketContext";
import CartItem from "../components/CartItem";

const Cart = () => {
  const { total, products, updateBasket } = useContext(BasketContext);

  return (
    <div className="cart__page">
      <div className="cart__container">
        <div className="cart__header">
          <h2>Shopping Cart</h2>
        </div>

        {products.length > 0 ? (
          <div className="cart__content">
            <div className="order__items">
              {products.map((product) => (
                <CartItem
                  key={product._id}
                  product={product}
                  update={updateBasket}
                />
              ))}
            </div>

            <div className="order__details">
              <div className="order__details">
                <h3>Order Details</h3>
                <div>
                  <p>Subtotal</p>
                  <p>{total} DT</p>
                </div>
              </div>

              <div>
                <p>Delivery</p>
                <p>Free</p>
              </div>

              <div className="total__pre-checkout">
                <p>Total</p>
                <p>{total} DT</p>
              </div>

              <button>Proceed to Checkout</button>
            </div>
          </div>
        ) : (
          <p>Cart Is Already Empty</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
