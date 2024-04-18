import "./App.css";
import "./Navbar.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Home from "./Home";
import Signin from "./Signin";
import Contact from './Contact'
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "./images/lady.png";
import User from "./User";
import Update from "./Update";


function App() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  return (
    
    <BrowserRouter>
      <header>
        <img src={Image} alt="images" width={80} height={70} />
        <nav ref={navRef}>
          <a href="/">Home</a>
          <a href="/home">About</a>
          <a href="/contact">Contact</a>
          <a href="/register">Profile</a>
          
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
          <Route path="/" element={<User />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/register" element={<Signup />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path="/login" element={<Signin />}></Route>
          <Route path="/update/:id" element={<Update />}></Route>
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;