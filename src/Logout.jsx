/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./logout.css";
import { useState } from "react";
import { SocialIcon } from 'react-social-icons';


const Logout = ({ onLogout }) => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  axios.defaults.withCredentials = true;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/verify", {
          headers: {
            Authorization: `our-jsonwebtoken-secret-key`,
          },
        });
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          console.log(res.data.Error);
        }
      } catch (err) {
        console.log(err);
        setMessage("You are not authenticated"); // or any other user-friendly message
      }
    };
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.get("http://localhost:5000/logout");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container mt-4">
        {auth ? (
          <div>
            <h3>You are Authorized --- {name}</h3>
            <button className="btn btn-danger" onClick={handleDelete}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            <h3>{message}</h3>
            <h3>Login Now</h3>
            <Link to={`/`} className="btn btn-primary">
              Login
            </Link>
          </div>
        )}
      </div>
      <footer className="footer mt-5">
        <div className="footer-content d-flex justify-content-around">
          <div className="footer-section about">
            <h3>About Us</h3>
            <p>
              We are a company dedicated to providing the best services and
              products.
            </p>
          </div>
          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul className="list-unstyled">
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
        <div className="footer-bottom text-center py-3">
          &copy; {new Date().getFullYear()} Ellyn Beauty SPA.
        </div>
      </footer>
    </>
  );
};

export default Logout;
