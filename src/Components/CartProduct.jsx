/* eslint-disable react/prop-types */
import React from 'react'
import { useContext } from 'react';
import { CartContext } from '../ReduxFeatures/ContextProvider';

const CartProduct = ({product}) => {
    const {cart, dispatch} = useContext(CartContext);
    const Increase = (id) => {
        // find the index of the product
        const Index = cart.findIndex( p => p.id === id)
        if(cart[Index].Quantity < 10){
            // to increase the quantity of the product we will call the DISPATCH function.
            dispatch({type: "Increase", id})
        }

    };
    const Decrease = (id) =>{
         // find the index of the product
         const Index = cart.findIndex( p => p.id === id)
         if(cart[Index].Quantity > 1){
             // to decrease the quantity of the product we will call the DISPATCH function.
             dispatch({type:"Decrease", id})
         }
 
    };
  return (
    <div className="d-flex border mb-3">
        <img src={product.image} className="w-50 h-50" alt="" />
        <div className="detail ms-4">
            <h4>{product.title}</h4>
            <h4>{product.description}</h4>
            <h4>{product.rate}</h4>
            <h4><b>Ksh.{product.price}</b></h4>
            <div className="buttons">
                <button className="rounded-circle px-2" onClick={() => Decrease(product.id)}><b>-</b></button>
                <button className="rounded">{product.Quantity}</button>
                <button className="rounded-circle px-2" onClick={() => Increase(product.id)}><b>+</b></button>
            </div>
            <button className="btn btn-sm btn-warning w-75" onClick={() => dispatch({type: "Remove", id: product.id})}>Remove</button>
        </div>
    </div>
  )
}

export default CartProduct