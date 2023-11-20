import React from "react";
import Product from "./Product";

export default function LikedItems({ likedItems, isLogged, onLikeToggle, updateLikedItems }) {
  return (
    <div className="liked--body">
      <h2>Liked Items</h2>
      <div className="liked--items">
        {likedItems.length > 0 ? (
          <div className="products-container">
            {likedItems.map((item) => (
              <Product
                item={item}
                key={item.id}
                isLogged={isLogged}
                initialIsLiked={true} 
              />
            ))}
          </div>
        ) : (
          <div className="products--notFound">
            <h2>No Liked Items</h2>
          </div>
        )}
      </div>
    </div>
  );
}
