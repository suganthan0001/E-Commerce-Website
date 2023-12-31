import React, { useState, useEffect } from "react";

export default function Product({ addToCart, item, onLikeToggle, isLogged, initialIsLiked, productsWithFreq }) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  useEffect(() => {
    setIsLiked(initialIsLiked);
  }, [initialIsLiked]);

  const handleLikeToggle = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    onLikeToggle(item.id);
  };

  function handleAddToCart() {
    addToCart(item.id)
  }

  return (
    <div className="product-card">
      <img
        className="product-image"
        src={`./images/${item.imageUrl}`}
        alt={item.name}
      />
      <div className="product-info">
        <h3 className="product-name">{item.name}</h3>
        <p className="product-description">{item.description}</p>
        <p className="product-price">₹{item.price.toFixed(2)}</p>
      </div>
      <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart </button>
      {isLogged && (
        <button
          className={`heart-button ${isLiked ? 'liked' : ''} heart`}
          onClick={handleLikeToggle}
        >
          <span role="img" aria-label="heart">
            {isLiked ? '❤️' : '🤍'}
          </span>
        </button>
      )}
      <div className="count-in-home">
        {productsWithFreq[item.id]}
      </div>
    </div>
  );
}
