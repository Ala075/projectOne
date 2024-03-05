import { Plus, Minus, Trash2 } from "lucide-react";
import { IMAGE_URL } from "../api/Config";

function CartItem({ product, update }) {
  const { images, name, price, quantity: Qte } = product;

  return (
    <div className="cart__item">
      <div className="cart__item__content">
      <div className="cart__item__img" onClick={() => handleItemClick(product)}>
        <img src={IMAGE_URL + images[0]} alt={name} />
      </div>

      <div className="cart__item__details">
        <p>{name}</p>
        <p>{price} DT</p>
      </div>

      <div className="cart__actions">
        <p>{(price * Qte).toFixed(1)} DT</p>

        <div className="quantity__actions">
          <Minus className="button" onClick={() => update(product, Qte - 1)} />
          <p>{Qte}</p>
          <Plus className="button" onClick={() => update(product, Qte + 1)} />
        </div>
      </div>
      </div>

      <div className="user__actions">
        <input type="text" placeholder="Add Note ..." />
        <button onClick={() => update(product, 0)}>
          <Trash2 />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
