import { useContext } from "react";
import { BasketContext } from "../Context+Reducer/BasketContext";
import styled from "styled-components";
import CartItem from "../components/CartItem";

const CartContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  height: 100vh;
  background-color: #313131;
  color: white;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  flex-wrap: nowrap;
  width: 100%;
  padding: 10px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-right: 1px solid #eee;
  padding-right: 55px;
  &:hover{
    background-color: #313131;
  }
`;

const Message = styled.p`
  display: flex;
  justify-content: center;
  width: 100%;
  font-weight: bold;
  margin-block: 50px;
`;

const Basket = () => {
  const { total, products, updateBasket } = useContext(BasketContext);

  return (
    <CartContainer>
      <Message>Shopping Cart</Message>
      <Content>
        {products.length > 0 ? (
          <Container>
            <Item>
              {products.map((product) => (
                <CartItem
                  key={product._id}
                  product={product}
                  update={updateBasket}
                />
              ))}
            </Item>
            <Message>Total: $ {total.toFixed(3)}</Message>
          </Container>
        ) : (
          <Message>Cart Is Already Empty</Message>
        )}
      </Content>
    </CartContainer>
  );
};

export default Basket;
