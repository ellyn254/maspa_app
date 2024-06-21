import "./App.css";
import "./Navbar.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Home from "./Home";
import Signin from "./Signin";
import Contact from "./Contact";
import { useRef } from "react";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import Image from "./images/logo.jpg";
import User from "./User";
import Update from "./Update";
// import Test from './Test'
import About from "./About";
import "bootstrap-icons/font/bootstrap-icons.css";
import Cart from "./Cart";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const navRef = useRef();
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };
  return (
    <BrowserRouter>
      <header>
        <img src={Image} alt="images" width={200} height={150} />
        ELLYNBEAUTYSPA
        <nav ref={navRef}>
          <a href="/home">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/user">View</a>
          <a href="/register">Profile</a>
          <a href="/cart" className="cart-icon">
            <FaShoppingCart />
          </a>
          {/* Add the cart icon link here */}
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </header>

      <div>
        <Routes>
          {/* <Route path='/' element={<Test/>}></Route> */}
          <Route path="/" element={<Signin />}></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route
            path="/home"
            element={<Home data={data} addToCart={addToCart} />}
          ></Route>
          <Route path="/register" element={<Signup />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/user/update/:id" element={<Update />}></Route>
          <Route path="/cart" element={<Cart cart={cart} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
