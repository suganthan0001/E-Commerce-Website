import React,{useState, useEffect} from "react";

function Checkout({ data, productsWithFreq }) {

    function findNameForId(id) {
        return data.products.find((product) => product.id === id)?.name;
    }

    function findPriceForId(id) {
        return data.products.find((product) => product.id === id)?.price;
    }

    let subtotal = 0;
    const tableRows = Object.keys(productsWithFreq).map(
        (id) => {
            subtotal += findPriceForId(id) * productsWithFreq[id];
            return (
                <tr>
                    <td>{findNameForId(id)}</td>
                    <td>{productsWithFreq[id]}</td>
                    <td>{findPriceForId(id) * productsWithFreq[id]}</td>
                </tr>
            )
        }
    )
    subtotal -= subtotal/10;

    return (
        <>
            <div className="border-checkout">
                <div className="checkout-card vertical">
                    <div className="section delivery-address">
                        <h2>Delivery Address</h2>
                        <p>
                            Choose an existing address or create a new one for delivery.
                        </p>
                        <div className="address-options">

                            <p>No existing addresses found. Click "Create New" below.</p>

                            <button className="create-address-btn">Create New</button>
                        </div>
                    </div>
                    <div className="section order-summary">
                        <h2>Order Summary</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableRows}
                            </tbody>
                        </table>
                        <div className="total-price">
                            <p>Total Price:</p>
                            <span>${subtotal}</span>
                        </div>
                    </div>
                    <div className="section payment-options">
                        <h2>Payment Options</h2>
                        <div className="payment-method-cod">
                            <input type="radio" id="cash-on-delivery" name="payment" />
                            <label htmlFor="cash-on-delivery">Cash on Delivery</label>
                            <br />
                            <input type="radio" id="cash-on-delivery" name="payment" />
                            <label htmlFor="cash-on-delivery">Pay Using UPI</label>
                        </div>
                    </div>
                    <div>
                        <a href="" className="submit-order-btn btnp btn--doar" data-content={subtotal}>PAY</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Checkout;
