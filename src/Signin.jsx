import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
// import { ToastContainer, toast, Zoom } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import "./signin.css";
import { SocialIcon } from "react-social-icons";

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
        <div className="form-container p-3 rounded bg-white">
          <form onSubmit={handleSubmit}>
            <h2>
              <strong>Sign In</strong>
            </h2>
            <div className="form-group">
              <label>
                <strong>Email:</strong>
              </label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                autoComplete="off"
                onChange={handleChange}
              />
              {/* the coden below used to restrict input to have some data */}
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label>
                <strong>Password:</strong>
              </label>
              <input
                type="password"
                name="password"
                placeholder="******"
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            <div className="form-group">
              <input type="checkbox" id="termsCheckbox" required />
              <label htmlFor="termsCheckbox">
                I agree to the
                <a
                  href="terms_and_conditions.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  terms and conditions
                </a>
              </label>
            </div>
            <button type="submit" className="btn-submit w-100 rounded-0">
              Login
            </button>
            <Link
              to="/register"
              className="btn-create-account w-100 rounded-0 text-decoration-none"
            >
              Create Account
            </Link>
          </form>
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
              <SocialIcon icon="facebook" url="https://facebook.com" />
              <SocialIcon url="https://twitter.com" icon="twitter" />
              <SocialIcon icon="instagram" url="https://instagram.com" />
              <SocialIcon url="https://linkedin.com" icon="linkedin" />
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

export default Signin;
