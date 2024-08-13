/* eslint-disable react/prop-types */

import React from "react";
import "../cart.css"; 
import { useContext } from 'react';
import { CartContext } from '../ReduxFeatures/ContextProvider';
import CartProduct from '../Components/CartProduct';
import { totalItem, totalPrice } from '../ReduxFeatures/CartReducer';


const Cart = () => {
  //to access cart we write as below
  const {cart} = useContext(CartContext);
  return (
    <>
    <h2>Shopping Cart</h2>
      <div className="container mt-3">
        <div className="row">
          <div className="col-8">
                   {/* to print our products */}
            {cart.map((p)=>(
              <CartProduct product={p} key={p.id}></CartProduct>
            ))}
          </div>
          <div className="col-4">
                {/* to print our summary */}
          <div className="bg-secondary p-3 text-white">
            <h5>Total Items: {totalItem(cart)}</h5>
            <h5>Total Price: Ksh.{totalPrice(cart)}</h5>
            <button className="btn btn-warning">Checkout</button>
          </div>
          </div>
        </div>
      </div>
          </>
  );
};

export default Cart;
