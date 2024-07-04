import "./App.css";
import "./Navbar.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./Signup";
import Home from "./Home";
import Signin from "./Signin";
import Contact from "./Contact";
import { useRef, useState, useEffect } from "react";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import Image from "./images/logo.jpg";
import User from "./User";
import Update from "./Update";
import About from "./About";
import "bootstrap-icons/font/bootstrap-icons.css";
import Cart from "./Cart";
import axios from "axios";
import Service from "./Service";
import Logout from "./Logout";

function App() {
  const navRef = useRef();
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [viewDropdownOpen, setViewDropdownOpen] = useState(false);

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const toggleViewDropdown = () => {
    setViewDropdownOpen(!viewDropdownOpen);
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
  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    alert("You sure you want to delete the item");
    setCart(newCart);
    alert("item deleted succesfully");
  };

  const pay = () => {
    alert("Proceed to payment");
    // Implement payment logic here
  };

  const item = [
    {
      id: 1,
      name: "Product 1",
      description: "This is the description for product 1",
      price: 10.0,
      image: "https://via.placeholder.com/150",
    },
    // Add more products as needed
  ];

  // function to perform logout action
  const handleLogout = () => {
    // Logic to end the session
    console.log("Session ended");
    sessionStorage.clear(); // Clear session storage
  };

  return (
    <BrowserRouter>
      <header>
        <img src={Image} alt="images" width={200} height={150} />
        ELLYNBEAUTYSPA
        <nav ref={navRef}>
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <div className="view-dropdown">
            <span onClick={toggleViewDropdown}>View</span>
            {viewDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/user">User</Link>
                <Link to="/user/update/:id">Update User</Link>
                <Link to="/messages">Messages</Link>
              </div>
            )}
          </div>
          <div className="profile-dropdown">
            <span onClick={toggleProfileDropdown}>Profile</span>
            {profileDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/register">Register</Link>
                <Link to="/">Login</Link>
                <Link to="/logout">Logout</Link>
              </div>
            )}
          </div>
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />
          </Link>
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
          <Route path="/" element={<Signin />} />
          <Route path="/user" element={<User />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/home"
            element={<Home item={item} data={data} addToCart={addToCart} />}
          />
          <Route path="/register" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user/update/:id" element={<Update />} />
          <Route
            path="/cart"
            element={
              <Cart cart={cart} removeFromCart={removeFromCart} pay={pay} />
            }
          />
          <Route path="/services" element={<Service />} />
          <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
