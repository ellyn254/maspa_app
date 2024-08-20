import React from "react";
import styles from "./payment.module.css"; // Importing CSS module
import { useContext } from "react";
import { CartContext } from "./ReduxFeatures/ContextProvider";
import { totalPrice } from "./ReduxFeatures/CartReducer";
import { Link } from "react-router-dom";

const Payment = () => {
  const { cart } = useContext(CartContext);
  const price = totalPrice(cart);

  return (
    <div className={styles.paymentContainer}>
      <h2 className={styles.heading}><b>Payment Details</b></h2>
      <div className={styles.summary}>
        <p>Total Amount: <b>Ksh. {price}</b></p>
        <Link to="/payment-confirmation" className={styles.paymentButton}>
          Proceed to Payment
        </Link>
      </div>
    </div>
  );
};

export default Payment;
