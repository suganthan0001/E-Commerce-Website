import React, { useState, useEffect } from "react";
import data from "../products.json";
import Product from "./Product";
import CartProduct from "./CartProduct";

export default function Cart({ cartItems }) {

    const [productsWithFreq, setProductsWithFreq] = useState({});

    const cartProducts = data.products.filter((item) => {
        return cartItems.includes(item.id);
    })

    console.log(cartProducts);

    useEffect(() => {
        cartProducts.forEach((item) => {
            if (item.id in productsWithFreq) {
                var toIncrease = productsWithFreq[item.id] + 1;

                setProductsWithFreq(
                    (oldFreq) => {
                        return { ...oldFreq, [item.id]: toIncrease }
                    }
                )
            } else {
                setProductsWithFreq(
                    (oldFreq) => {
                        return { ...oldFreq, [item.id]: 1 }
                    }
                )
            }
        })
    }, [data.products, cartItems]);




    function increment(id) {

        setProductsWithFreq(
            (oldFreq) => {
                var toIncrease = productsWithFreq[id] + 1;
                return { ...oldFreq, [id]: toIncrease }
            }
        )
        console.log(productsWithFreq);
    }

    function decrement(id) {
        setProductsWithFreq(
            (oldFreq) => {
                var toDecrease = productsWithFreq[id] - 1;
                return { ...oldFreq, [id]: toDecrease }
            }
        )
        console.log(productsWithFreq);
    }



    const finalCartProducts = cartProducts.map((eachItem) => {
        return <CartProduct
            productsWithFreq={productsWithFreq}
            increment={increment}
            decrement={decrement}
            item={eachItem}
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
    let final = subtotal - (subtotal / 10)
    return (
        <>
            <div className="cart-container">
                <div className="cart-products">
                    {finalCartProducts}
                </div>

                <div className="price-details">
                    <h3>Subtotal : ₹{subtotal}</h3>
                    <h3>Discount : 10%</h3>
                    <h2>Total : {final}</h2>
                </div>
            </div>
        </>
    )
}