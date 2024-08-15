// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
/* eslint-disable react/prop-types */

import React from "react";
import "../cart.css"; 
import { useContext } from 'react';
import { CartContext } from '../ReduxFeatures/ContextProvider';
import CartProduct from '../Components/CartProduct';
import { totalItem, totalPrice } from '../ReduxFeatures/CartReducer';
import { Link } from 'react-router-dom'; // Import Link if you use React Router for navigation

const Cart = () => {
  // To access cart we write as below
  const { cart } = useContext(CartContext);

  return (
    <>
      <h2>Shopping Cart</h2>
      <div className="container mt-3">
        {cart.length === 0 ? (
          <div className="empty-cart text-center">
            <i className="rounded-circle px-2">🛒</i>
            <h3>Your cart is currently empty</h3>
            <p>click the button below to start shopping. <b>🛒</b></p>
            <Link to="/products" className="btn btn-primary mt-3">
              Start Shopping Now
            </Link>
          </div>
        ) : (
          <div className="row">
            <div className="col-8">
              {/* To print our products */}
              {cart.map((p) => (
                <CartProduct product={p} key={p.id}></CartProduct>
              ))}
            </div>
            <div className="col-4">
              {/* To print our summary */}
              <div className="bg-secondary p-3 text-white">
                <h5>Total Items: {totalItem(cart)}</h5>
                <h5>Total Price: Ksh.{totalPrice(cart)}</h5>
                <button className="btn btn-warning">Checkout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;

