// Cart.js
import React from "react";
import "./cart.css"; // Import the CSS file for styles

const Cart = ({ cart }) => {
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart?.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
