/* eslint-disable no-case-declarations */
// perform the totalitem logic
export const totalPrice = (cart) =>{
    return cart.reduce((total, product) => total + product.Quantity * product.price , 0)
}
export const totalItem = (cart) =>{
    return cart.reduce((sum, product) => sum + product.Quantity, 0)
}

// create a reducer
//the function CartReducer accepts 2 things .i.e state-the basket,data,our cart & action
//the state here is our store
//action is the type and data
const CartReducer = (state, action) =>{
    switch(action.type){
    //write our 1st action that our cart is performing::
    // the below are actions in my cart
    case "Add": 
    return [...state, action.product]

    case "Remove":
        return state.filter(p =>p.id !== action.id)

        case "Increase":
            return state.map(product => 
                product.id === action.id 
                ? {...product, Quantity: product.Quantity + 1} 
                : product
            );

        case "Decrease":
            return state.map(product => 
                product.id === action.id && product.Quantity > 1 
                ? {...product, Quantity: product.Quantity - 1} 
                : product
            );

    default:
        state=0;
    }
}
export default CartReducer;