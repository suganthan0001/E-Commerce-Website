import React from 'react';

function CartProduct({ item, increment, decrement, productsWithFreq ,deleteCartItem}) {

    function handleIncrement(){
        increment(item.id);
    }

    function handleDecrement(){
        decrement(item.id);
    }

    function handleDelete() {
        deleteCartItem(item.id);
    }

    return (<>
        <div className="product-card-cart">
            <img src={`./images/${item.imageUrl}`} alt="Product Image" className="product-image-cart" />
            <div className="product-details-cart">
                <h3 className="product-name-cart">{item.name}</h3>
                <p className="product-price-cart">₹ {item.price}</p>
            </div>
            <div className="product-actions-cart">
                <div className="quantity-controls-cart">
                    <button className="quantity-btn-cart" onclick="decrementQuantity()" onClick={handleDecrement}>-</button>
                    <span className="quantity-cart">{productsWithFreq[item.id]}</span>
                    <button className="quantity-btn-cart" onclick="incrementQuantity()" onClick={handleIncrement}>+</button>
                </div>
                <div className="delete-icon-container-cart" onClick={handleDelete}>
                    <i className="fa fa-trash delete-icon" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    </>

    )
}

export default CartProduct;
