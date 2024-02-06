import React from "react";
import { Heart, ShoppingBag, ShoppingCart, Star, StarHalf } from "lucide-react";
import "../style.css";

function Card(props) {
  const { rating } = props;
  const { rate, count } = rating;

  const card = {
    img: props.img,
    title: props.name,
    about: props.info,
    price: props.prix,
    rating: rating,
    id: props.id,
    Qte: 0,
  };

  function addToCart() {
    const existingCartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItemIndex = existingCartItems.findIndex(
      (e) => e.id === card.id
    );

    if (existingItemIndex !== -1) {
      existingCartItems[existingItemIndex].Qte += 1;
    } else {
      card.Qte += 1;
      existingCartItems.push(card);
    }

    localStorage.setItem("cart", JSON.stringify(existingCartItems));
  }

  function addToWash() {
    const existingWashItems = JSON.parse(localStorage.getItem("wash")) || [];
    existingWashItems.push(card);
    localStorage.setItem("wash", JSON.stringify(existingWashItems));
  }

  function renderStars() {
    const fullStars = Math.floor(rate); // Full stars
    const hasHalfStar = rate % 1 !== 0; // Check if there is a half star

    // Create an array with the full stars
    const starsArray = Array.from({ length: fullStars }, (_, index) => (
      <Star key={index} className="h-6" />
    ));

    // If there is a half star, add it to the array
    if (hasHalfStar) {
      starsArray.push(<StarHalf key="half-star" className="h-6" />);
    }

    return starsArray;
  }

  return (
    <div className="card">
      <div className="card_top">
        <div className="card_img">
          <img src={props.img} alt="product" />
        </div>

        <div class="card_tag">-40%</div>

        <div class="card_top_icons">
          <svg
            onClick={addToWash}
            style={{ cursor: "pointer" }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="card_top_icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          <ShoppingCart
            onClick={addToCart}
            style={{ cursor: "pointer" }}
            className="card_top_icon"
          />
        </div>
      </div>

      <div className="card_body">
        <h3 className="card_title">{props.name}</h3>
        <p className="card_price">${props.prix}</p>
        <div className="card_ratings">
          <div className="card_stars">{renderStars()}</div>
          <span className="card_rating_numbers">({count})</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
