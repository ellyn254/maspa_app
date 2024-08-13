/* eslint-disable react/prop-types */
import React, {createContext, useReducer} from 'react'
import CartReducer from './CartReducer';

export const CartContext = createContext() //it is exported so as to be imported in the product.jsx

const ContextProvider = ({children}) => {

    const [cart, dispatch] = useReducer(CartReducer, []);
   
  return (
    // inside here we gonna use cartcontext
    //after which we gonna pass the CART and DISPATCH
    //CART is our cart basket, data
    //DISPATCH is our cases; Add, Remove, increase,decrease in the cartReducer component.
    <CartContext.Provider value={{cart, dispatch}}>
        {/* to use App component we pass children in this component as below */}
           {children}
    </CartContext.Provider>
  )
}

export default ContextProvider