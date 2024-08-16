import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import Image from "../images/logo.jpg";
import '../Navbar.css';
import { CartContext } from '../ReduxFeatures/ContextProvider';
// import { FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";


const Navbar = () => {
  const { cart } = useContext(CartContext);
  const navRef = useRef();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [viewDropdownOpen, setViewDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State to track menu visibility

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
    setMenuOpen(!menuOpen); // Toggle menu open state
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const toggleViewDropdown = () => {
    setViewDropdownOpen(!viewDropdownOpen);
  };

  return (
    <>
      <header>
        <img src={Image} alt="images" width={150} height={100} />
        <span>ELLYNBEAUTYSPA</span>
        <nav ref={navRef}>
          <Link to="/home">Home</Link>
          <Link to="/products">Products</Link>
          <div className={`view-dropdown ${viewDropdownOpen ? 'open' : ''}`}>
            <span onClick={toggleViewDropdown}>Services</span>
            <div className="dropdown-menu">
              <Link to="/manicure">Manicure</Link>
              <Link to="/pedicure">Pedicure</Link>
              <Link to="/massage">Massage</Link>
              <Link to="/salon">Salon</Link>
              <Link to="/yoga">Yoga</Link>
            </div>
          </div>
          <div className={`profile-dropdown ${profileDropdownOpen ? 'open' : ''}`}>
            <span onClick={toggleProfileDropdown}><FaUser /></span>
            <div className="dropdown-menu">
              <Link to="/register">Create Account</Link>
              <Link to="/">Signin</Link>
              <Link to="/logout">Logout</Link>
            </div>
          </div>
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />{cart.length}
          </Link>
          <button className="nav-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          {menuOpen ? <FaTimes /> : <FaBars />} {/* Toggle between FaBars and FaTimes */}
        </button>
      </header>
    </>
  );
}

export default Navbar;
