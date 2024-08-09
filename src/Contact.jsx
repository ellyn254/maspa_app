import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./contact.css";
import { SocialIcon } from "react-social-icons";

const Contact = () => {
  const [values, setValues] = useState({
    email: "",
    message: "",
  });
  const [storedEmails, setStoredEmails] = useState([]);

  useEffect(() => {
    // Fetch stored emails from the backend
    axios
      .get("http://localhost:5000/email")
      .then((response) => {
        setStoredEmails(response.data.map((item) => item.email));
      })
      .catch((error) => {
        console.error("Error fetching emails:", error);
      });
  }, []);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the entered email is valid
    if (storedEmails.includes(values.email)) {
      // Send message to the backend
      axios
        .post("http://localhost:5000/contact", values)
        .then((response) => {
          console.log(response.data);
          alert("Message sent successfully");
          // Clear form fields
          setValues({
            email: "",
            message: "",
          });
        })
        .catch((error) => {
          console.error("Email duplicate entry", error);
          alert("Error sending the mmessage duplicate entry for email");
          //clear the for fields
          setValues({
            email: "",
          });
        });
    } else {
      alert("Please register with us first.");
      navigate("/register");
    }
  };

  return (
    <>
     <div className="route">
    <Link to="/home" className="route" >Home</Link> /
    <Link to="/contact" className="route" >Contact US</Link>
    </div>
     
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2>
              <strong>Contact Page</strong>
            </h2>
            <div className="mb-3">
              <label>
                <strong>Email:</strong>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter email registered with us"
                value={values.email}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>

            <div className="mb-3">
              <label>
                <strong>Message:</strong>
              </label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                placeholder="Compose a message"
                value={values.message}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
        </div>
      {/* </div> */}
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

export default Contact;
