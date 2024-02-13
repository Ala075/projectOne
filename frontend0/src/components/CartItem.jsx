import { Plus, Minus, Trash2 } from "lucide-react";
import styled from "styled-components";
import { IMAGE_URL } from "../api/Config";

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 10px;
  border-bottom: 1px solid gray;
`;

const ImgContainer = styled.div`
  height: 140px;
  width: 140px;
  border: 1px solid #eee;
  margin-right: 10px;
  border-radius: 5px;
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
  margin-right: 50px;
`;

const Button = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 5px;
  padding: 8px;
  background-color: #af0f2bcd;
  color: white;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
`;

function CartItem({ product, update }) {
  const { _id, images, name, price, Qte } = product;

  return (
    <Row>
      <ImgContainer>
        <Img src={IMAGE_URL + images[0]} alt={name} />
      </ImgContainer>
      <Description>
        <p>{name}</p>
        <p>{price}</p>
        <Container>
          <Counter>
            <Minus
              style={{ cursor: "pointer" }}
              onClick={() => update(_id, Qte - 1)}
            />
            <p
              style={{
                border: "1px solid gray",
                borderRadius: "5px",
                padding: "5px 10px",
              }}
            >
              {Qte}
            </p>
            <Plus
              style={{ cursor: "pointer" }}
              onClick={() => update(_id, Qte + 1)}
            />
          </Counter>
          <Button onClick={() => update(_id, 0)}>
            <Trash2 />
            Remove
          </Button>
        </Container>
      </Description>
    </Row>
  );
}

export default CartItem;
