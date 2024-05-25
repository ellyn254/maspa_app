import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Contact() {
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
          console.log("Message sent successfully:", response.data);
          // Clear form fields
          setValues({
            email: "",
            message: "",
          });
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    } else {
      alert("Please register with us first.");
      navigate("/register");
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="p-3 w-25 rounded bg-white">
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
              placeholder="compose a message"
              value={values.message}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <button type="submit" className="w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
