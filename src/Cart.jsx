/* eslint-disable react/prop-types */
 
import React from "react";
import "./cart.css"; 
import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";

const Cart = ({ cart, removeFromCart, pay }) => {
  return (
    <>
      <div className="cart">
        <h2>Shopping Cart</h2>
        {cart?.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map((item, index) => (
                <li key={index} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-description">{item.description}</p>
                    <p className="cart-item-price">${item.price}</p>
                    <button
                      className="remove-button"
                      onClick={() => removeFromCart(index)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button className="pay-button" onClick={pay}>
              Pay
            </button>
          </>
        )}
      </div>
      <div className="lowerdiv">
        <p className="text">
          These are our feedbacks from esteemed customers. <br />
          Allan Kheyt, customer
        </p>
        <div className="div">
          <Link to="/contact" className="button">
            TALK TO US
          </Link>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section about">
            <h3>About Us</h3>
            <p>
              We are a company dedicated to providing the best services and
              products.
            </p>
          </div>
          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="footer-section social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <SocialIcon icon="facebook" url="https://facebook.com" />
              <SocialIcon url="https://twitter.com" icon="twitter" />
              <SocialIcon icon="instagram" url="https://instagram.com" />
              <SocialIcon url="https://linkedin.com" icon="linkedin" />
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Ellyn Beauty SPA.
        </div>
      </footer>
    </>
  );
};

export default Cart;
