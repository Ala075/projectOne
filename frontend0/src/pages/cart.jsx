import { useEffect, useState } from "react";
import styled from "styled-components";
import CartItem from "../components/CartItem";
import Axios from "../api/Axios";

const CartContainer = styled.div`
  padding: 80px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Message = styled.p`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 100px;
`;

function Cart() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const updateCart = (productId, quantity) => {
    setCartItems((prev) => {
      const updatedCartItems =
        quantity === 0
          ? prev.filter((item) => item.id !== productId)
          : prev.map((item) =>
              item.id === productId ? { ...item, Qte: quantity } : item
            );

      localStorage.setItem("cart", JSON.stringify(updatedCartItems));

      return updatedCartItems;
    });
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await Axios.get("/api/cart/:userId"); // Replace :userId with the actual user ID
        setCartItems(response.data.cart.items);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const sum = cartItems
    .reduce((acc, product) => acc + product.price * product.Qte, 0)
    .toFixed(3);

  return (
    <CartContainer>
      <Message>Shopping Cart</Message>
      <Content>
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((product, index) => (
              <CartItem key={index} product={product} updateCart={updateCart} />
            ))}
            <Message>{`Total: $ ${sum}`}</Message>
          </>
        ) : (
          <Message>Cart Is Already Empty</Message>
        )}
      </Content>
    </CartContainer>
  );
}

export default Cart;
