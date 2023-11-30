import React, { useState, useEffect } from "react";
import data from "../products.json";
import CartProduct from "./CartProduct";

export default function Cart({ cartItems ,deleteFromMainCart}) {
    const [productsWithFreq, setProductsWithFreq] = useState({});
    const [cartProducts,setCartProducts] = useState([]);

    useEffect(
        () => {
            setCartProducts(() => {
                const cartProductsToReturn = data.products.filter((item) => {
                    return cartItems.includes(item.id);
                })
                return cartProductsToReturn;
            })
        }
    ,[cartItems]);

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
    }, [data.products, cartItems,cartProducts]);


    function increment(id) {

        setProductsWithFreq(
            (oldFreq) => {
                var toIncrease = productsWithFreq[id] + 1;
                return { ...oldFreq, [id]: toIncrease }
            }
        )

    }

    function decrement(id) {
        setProductsWithFreq(
            (oldFreq) => {
                var toDecrease = productsWithFreq[id] - 1;
                if(toDecrease == 0){
                    return {...oldFreq}
                }
                return { ...oldFreq, [id]: toDecrease }
            }
        )
        console.log(productsWithFreq);
    }

    function deleteCartItem(id){
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