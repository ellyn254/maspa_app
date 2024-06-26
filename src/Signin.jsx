import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import "./signin.css";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email is not valid";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password should be at least 6 characters";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await axios.post("http://localhost:5000/", {
          email: formData.email,
          password: formData.password,
        });

        if (res.data.error === 401) {
          console.log(res.data.error);
          alert("Invalid credentials");
        } else {
          console.log(res.data.message);
          alert("Login successful");
          navigate("/home");
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert("All fields are required");
        } else {
          alert("Unauthorized user. Please create an account");
          navigate("/register");
        }
      }
    }
  };

  return (
    <>
      <div className="signin-container d-flex vh-100 justify-content-center align-items-center">
        <div className="form-container p-4 rounded bg-white shadow">
          <form onSubmit={handleSubmit}>
            <h2 className="text-center mb-4">
              <strong>Sign In</strong>
            </h2>
            <div className="form-group mb-3">
              <label>
                <strong>Email:</strong>
              </label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                autoComplete="off"
                className="form-control"
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group mb-3">
              <label>
                <strong>Password:</strong>
              </label>
              <input
                type="password"
                name="password"
                placeholder="******"
                className="form-control"
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            <div className="form-group form-check mb-3">
              <input
                type="checkbox"
                id="termsCheckbox"
                className="form-check-input"
                required
              />
              <label htmlFor="termsCheckbox" className="form-check-label">
                I agree to the{" "}
                <a
                  href="terms_and_conditions.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  terms and conditions
                </a>
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Login
            </button>
            <Link to="/register" className="btn btn-secondary w-100">
              Create Account
            </Link>
          </form>
        </div>
      </div>
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
              <SocialIcon url="https://facebook.com" className="me-2" />
              <SocialIcon url="https://twitter.com" className="me-2" />
              <SocialIcon url="https://instagram.com" className="me-2" />
              <SocialIcon url="https://linkedin.com" />
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

export default Signin;
