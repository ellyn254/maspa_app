/* eslint-disable react/prop-types */
// Home.js
import React from "react";
import "./home.css";
import { SocialIcon } from "react-social-icons";
import { Link } from "react-router-dom";

const Home = ({ data, addToCart }) => {

  const handleAddToCart = (product) => {
    addToCart(product);
    
  };

  return (
    <>
      <div className="App">
        <div className="products">
          {data?.map((product) => (
            <div key={product.id}>
              <img className="img" src={product.image} alt="img" />
              <h1>{product.name}</h1>
              <p>{product.description}</p>
              <p>{product.rate}</p>
              <p><b>Ksh {product.price}</b></p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>

      <div className="lowerdiv">
        <p className="text">
          These are our feedbacks from esteemed customers. <br />
          Allan Kheyt, customer
        </p>
        <div className="div">
          <Link to={`/contact`} className="button">
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
            <SocialIcon icon="facebook" url="https://facebook.com" style={{ height: 25, width: 25 }} />
              <SocialIcon url="https://twitter.com" icon="twitter" style={{ height: 25, width: 25 }}/>
              <SocialIcon icon="instagram" url="https://instagram.com" style={{ height: 25, width: 25 }} />
              <SocialIcon url="https://linkedin.com" icon="linkedin" style={{ height: 25, width: 25 }} />
              <SocialIcon url="https://email.com" icon="email" style={{ height: 25, width: 25 }}/>
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

export default Home;
