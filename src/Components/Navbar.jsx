import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import Image from "../images/logo.jpg";
import '../Navbar.css';
import { CartContext } from '../ReduxFeatures/ContextProvider';
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const navRef = useRef();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [viewDropdownOpen, setViewDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State to track menu open/close

  
  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const toggleViewDropdown = () => {
    setViewDropdownOpen(!viewDropdownOpen);
  };

  const closeDropdowns = () => {
    setUserDropdownOpen(false);
    setViewDropdownOpen(false);
  };


  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle menu open/close state
    navRef.current.classList.toggle("responsive_nav"); // Toggle responsive class on nav
  };

  return (
    <>
      <header>
        <img src={Image} alt="images" width={150} height={100} />
        <span>ELLYNBEAUTYSPA</span>
        <nav ref={navRef}>
          <Link to="/home" onClick={closeDropdowns}>Home</Link>
          <Link to="/products" onClick={closeDropdowns}>Products</Link>
          <div className={`view-dropdown ${viewDropdownOpen ? 'open' : ''}`}>
            <span onClick={toggleViewDropdown}>Services</span>
            <div className="dropdown-menu">
              <Link to="/manicure" onClick={closeDropdowns}>Manicure</Link>
              <Link to="/pedicure" onClick={closeDropdowns}>Pedicure</Link>
              <Link to="/massage" onClick={closeDropdowns}>Massage</Link>
              <Link to="/salon" onClick={closeDropdowns}>Salon</Link>
              <Link to="/yoga" onClick={closeDropdowns}>Yoga</Link>
            </div>
          </div>
          <div className={`profile-dropdown ${userDropdownOpen ? 'open' : ''}`}>
            <span onClick={toggleUserDropdown}><FaUser /></span>
            <div className="dropdown-menu">
              <Link to="/register" onClick={closeDropdowns}>Create Account</Link>
              <Link to="/" onClick={closeDropdowns}>Signin</Link>
              <Link to="/logout" onClick={closeDropdowns}>Logout</Link>
            </div>
          </div>
          <Link to="/cart" className="cart-icon" onClick={closeDropdowns}>
            <FaShoppingCart />{cart.length}
          </Link>
          </nav>
          <button className="nav-btn" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>
    </>
  );
}

export default Navbar;
