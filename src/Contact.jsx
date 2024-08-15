import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./CssFiles/contact.css";

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
    </>
  );
};

export default Contact;
