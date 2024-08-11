import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input/input";
import "react-phone-number-input/style.css";
// import { useMediaQuery } from "react-responsive";
import Flag from "react-country-flag";
import "./signup.css";
import { SocialIcon } from "react-social-icons";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    countryCode: "KE", // Default to Kenya
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

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phone: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.name.trim()) {
      validationErrors.name = "Name is required";
    }

    if (!formData.phone.trim()) {
      validationErrors.phone = "Phone number is required";
    } else if (
      !isValidPhoneNumber(formData.phone) &&
      !/^\d{10}$/.test(formData.phone)
    ) {
      validationErrors.phone = "Phone number is not valid";
    }

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

    if (formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await axios.post("http://localhost:5000/register", {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });

        if (res.data.message && res.status === 200) {
          alert(res.data.message);
          console.log(res.data.Status);
          navigate("/");
        } else {
          alert("error");
        }
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 400) {
          alert("All fields are required. Passwords do not match");
        } else if (error.response && error.response.status === 500) {
          alert("Server error. Please try again later.");
        } else {
          alert("An error occurred. Please try again later.");
        }
      }
    }
  };

  return (
    <>
      {/* <div className="signup-container"> */}
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2 className="text-center mb-4">
              <strong>Sign Up</strong>
            </h2>
            <div className="form-group mb-3">
              <label>
                <strong>Name:</strong>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                autoComplete="off"
                className="form-control"
                onChange={handleChange}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="form-group mb-3">
              <label>
                <strong>Phone:</strong>
              </label>
              <div className="phone-input">
                <Flag countryCode={formData.countryCode} className="me-2" />
                <PhoneInput
                  name="phone"
                  type="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  country="KE"
                  className="form-control"
                />
              </div>
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
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
                placeholder="Enter password"
                className="form-control"
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            <div className="form-group mb-3">
              <label>
                <strong>Confirm Password:</strong>
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
                className="form-control"
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
              )}
            </div>
            <button type="submit" className="register">
              Register
            </button>
            <div>
            Already have an account? 
            <span><Link to={`/`} className="secondary">
              Login
            </Link></span></div>
            <div className="form-group form-check mb-3">
              <input
                type="checkbox"
                id="termsCheckbox"
                className="form-check-input"
                required
              />
              <label htmlFor="termsCheckbox" className="form-check-label">
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
            <Link to={`/forgotpassword`} className="forgot">
                forgot-password?
              </Link>
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

export default Signup;
