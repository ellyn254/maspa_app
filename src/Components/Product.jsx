/* eslint-disable react/prop-types */

import React, {useContext} from 'react'
import { CartContext } from '../ReduxFeatures/ContextProvider';

const Product = ({product}) => {

  //we use the cartcontext by usecontext hook with dispatch constant 
  const {dispatch} = useContext(CartContext);
  return (
    <div className="col">
    <div className="card h-100 w-100">
    <img src={product.image} className="card-img-top h-75" alt="..." />
    <div className="card-body">
      <h5 className="card-title">{product.title}</h5>
      <p className="card-text">{product.description}</p>
      <h5 className="card-title">{product.rate}</h5>
      <h5 className="card-title fw-bolder">Ksh. {product.price}</h5>
      <button className="btn btn-cart w-100" style={{backgroundColor: "#331029de", color: "white"}} onClick={() => dispatch({type: "Add", product: product})}>Add To Cart</button>
    </div>
  </div>
  </div>
  )
}

export default Product