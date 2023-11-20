import React from "react";

export default function Cart(){
    return(
        <>
            <div className="cart-container">
                <div className="cart-products">
                    
                </div>

                <div className="price-details">
                    <h3>Subtotal : {}</h3>
                    <h3>Discount : {}</h3>
                    <h2>Total : {}</h2>
                </div>
            </div>
        </>
    )
}