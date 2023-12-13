import React from "react";

function Checkout() {
  return (
    <>
    <div className="border-checkout">

    
      <div className="checkout-card vertical">
        {/* Delivery Address */}
        <div className="section delivery-address">
          <h2>Delivery Address</h2>
          <p>
            Choose an existing address or create a new one for delivery.
          </p>
          <div className="address-options">
            {/* List of existing addresses */}
            <p>No existing addresses found. Click "Create New" below.</p>
            {/* Button to create new address */}
            <button className="create-address-btn">Create New</button>
          </div>
        </div>

        {/* Order Summary */}
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
              {/* List of items with quantity and price */}
              {/* Example entry */}
              <tr>
                <td>Product Name</td>
                <td>2</td>
                <td>$50.00</td>
              </tr>
            </tbody>
          </table>
          <div className="total-price">
            <p>Total Price:</p>
            <span>$100.00</span>
          </div>
        </div>

        {/* Payment Options */}
        <div className="section payment-options">
          <h2>Payment Options</h2>
          <div className="payment-method">
            <input type="radio" id="cash-on-delivery" name="payment" />
            <label htmlFor="cash-on-delivery">Cash on Delivery</label>
          </div>
          <div className="payment-method">
            <button className="pay-using-upi">Pay using UPI</button>
            {/* Implement functional UPI payment integration here */}
            <p className="payment-info">
              Note: UPI payment functionality is not yet implemented.
            </p>
          </div>
        </div>

        {/* Submit Order Button */}
        <button className="submit-order-btn">Place Order</button>
      </div>

      </div>
    </>
  );
}

export default Checkout;
