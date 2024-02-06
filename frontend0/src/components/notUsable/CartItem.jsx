import { Plus, Minus, Trash2 } from 'lucide-react';
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-block: 10px;
  border-bottom: 1px solid gray;
`;

const ImgContainer = styled.div`
  height: 140px;
  width: 140px;
`;

const Description = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

const Counter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  width: 120px;
  margin-right: 20px;
`;

const Button = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 5px;
  padding: 8px;
  background-color: #af0f2bcd;
  color: white;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;


function CartItem({ product, updateCart }) {
  const { id, img, title, price, Qte } = product;

  return (
    <Row>
      <ImgContainer>
        <Img src={img} alt={title} />
      </ImgContainer>
      <Description>
        <p>{title}</p>
        <p>{price}</p>
        <Container>
          <Counter>
            <Minus onClick={() => updateCart(id,Qte - 1)} />
            <p style={{ border: "1px solid gray", borderRadius: "5px", padding: "5px 10px" }}>{Qte}</p>
            <Plus onClick={() => updateCart(id,Qte + 1)} />
          </Counter>
          <Button onClick={() => updateCart(id, 0)}>
            <Trash2 />
            Remove
          </Button>
        </Container>
      </Description>
    </Row>
  );
}

export default CartItem;