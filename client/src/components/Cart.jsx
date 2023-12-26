import React, { useState, useEffect } from "react";
import data from "../products.json";
import CartProduct from "./CartProduct";
import { useNavigate } from "react-router-dom";

export default function Cart({ cartItems, deleteFromMainCart, increment, decrement, productsWithFreq }) {
    const [cartProducts, setCartProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(
        () => {
            setCartProducts(() => {
                const cartProductsToReturn = data.products.filter((item) => {
                    return cartItems.includes(item.id);
                })
                return cartProductsToReturn;
            })
        }
        , [cartItems]);

    function deleteCartItem(id) {
        deleteFromMainCart(id);
        const updatedCartProducts = cartProducts.filter(item => item.id !== id);
        setCartProducts(updatedCartProducts);
    }



    const finalCartProducts = cartProducts.map((eachItem) => {
        return <CartProduct
            productsWithFreq={productsWithFreq}
            increment={increment}
            decrement={decrement}
            item={eachItem}
            deleteCartItem={deleteCartItem}
            key={eachItem.id}
        />
    })

    function getProductPrice(productId) {
        const product = data.products.find(product => product.id === productId);
        return product.price
    }

    let subtotal = 0;

    cartProducts.forEach(
        (item) => {
            var quan = productsWithFreq[item.id];
            var price = getProductPrice(item.id);
            subtotal += (quan * price);
        }
    )

    function toSummary(){
        if(cartItems.length > 0){
            navigate("/checkout"); 
        }
        else{
            alert("Cart is Empty");
        }
    }

    let final = subtotal - (subtotal / 10)
    return (
        <>
            <div className="cart-container">
                <div className="cart-products">
                    {finalCartProducts}
                    {finalCartProducts.length < 1 && <>
                        <h1 className="no-products-cart">No Products in Cart</h1>
                    </>}
                </div>

                <div className="price-details">
                    <h3>Subtotal : ₹{subtotal}</h3>
                    <h3>Discount : 10%</h3>
                    <h2>Total : {final}</h2>

                    <div class="btn-c btn-one" onClick={toSummary}>
                        <span>CHECKOUT</span>
                    </div>
                </div>
            </div>
        </>
    )
}