import React, {useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import Image from "../images/logo.jpg";
import { useRef} from 'react';
import '../Navbar.css';
import { CartContext } from '../ReduxFeatures/ContextProvider';


const Navbar = () => {
// in this component wwe use cart to fetch stored data from cartReducer component.
const {cart} = useContext(CartContext);
    const navRef=useRef();
    // const [cartCount, setCartCount] = useState(0);
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
  return (
    <> 
    <header>
    <img src={Image} alt="images" width={150} height={100} />
    ELLYNBEAUTYSPA
    <nav ref={navRef}>
      <Link to="/home">Home</Link>
      <Link to="/products">Products</Link>
      <div className="view-dropdown">
        <span onClick={toggleViewDropdown}>Services</span>
        {viewDropdownOpen && (
          <div className="dropdown-menu">
            <Link to="/manicure">Manicure</Link>
            <Link to="/pedicure">Pedicure</Link>
            <Link to="/massage">Massage</Link>
            <Link to="/salon">Salon</Link>
            <Link to="/yoga">Yoga</Link>
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
        <FaShoppingCart />{cart.length}
      </Link>
      <button className="nav-btn nav-close-btn" onClick={showNavbar}>
        <FaTimes />
      </button>
    </nav>
    <button className="nav-btn" onClick={showNavbar}>
      <FaBars />
    </button>
  </header>
  </>
  )
}

export default Navbar