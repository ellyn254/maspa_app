import React, {useState, useEffect } from "react";
import "./App.css";
import "./Navbar.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Home from "./Home";
import Signin from "./Signin";
import Contact from "./Contact";
import User from "./User";
import Update from "./Update";
import About from "./About";
import "bootstrap-icons/font/bootstrap-icons.css";
import Cart from "./Pages/Cart";
import axios from "axios";
import Service from "./Service";
import Logout from "./Logout";
import Products from './Pages/Products';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Massage from './Services/Massage';
import Payment from './Payment';
import ForgotPassword from './Components/ForgotPassword';
import Pedicure from './Services/Pedicure';

function App() {
  // const [cartCount, setCartCount] = useState(0);
  const [data, setData] = useState([]);
 

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


  // Function to perform logout action
  const handleLogout = () => {
    // Logic to end the session
    console.log("Session ended");
    sessionStorage.clear(); // Clear session storage
  };

  return (
<>
    <BrowserRouter>
    <Navbar/>
      <div>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/user" element={<User />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/home"
            element={<Home data={data}/>}
          />
           <Route path="/products" element={<Products />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user/update/:id" element={<Update />} />
          <Route
            path="/cart"
            element={
              <Cart
              />
            }
          />
          <Route path="/services" element={<Service />} />
          <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
          <Route path="/massage" element={<Massage />} />
          <Route path="/pedicure" element={<Pedicure/>}/>
          <Route path="/payment" element={<Payment />} />
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
