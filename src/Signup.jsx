import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
// import './Signup.css'
// import parsePhoneNumberFromString from 'libphonenumber-js';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.name.trim()) {
      validationErrors.name = "name is required";
    }

    if (!formData.phone.trim()) {
      validationErrors.phone = "phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      // Validates 10-digit phone numbers
      validationErrors.phone = "phone number should be 10 char";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "email is not valid";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "password is required";
    } else if (formData.password.length < 6) {
      validationErrors.password = "password should be at least 6 char";
    }

    if (formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = "password not matched";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Form Submitted successfully");
    }
    try {
      const res = await axios.post("http://localhost:5000/register", {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });

      if (res.data.error) {
        `setFormData.name({})``setFormData.phone({})``setFormData.email({})``setFormData.password({})``setFormData.confirmPassword({})`;
      } else {
        console.log(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      // Handle error response from the server
      if (error.response && error.response.status === 400) {
        // Server returned 400 Bad Request
        alert("All fields are required");
      } else {
        // Other errors
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
   
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              placeholder="name"
              autoComplete="off"
              onChange={handleChange}
            />
            {errors.name && <span>{errors.name}</span>}
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="phone"
              name="phone"
              placeholder="phone"
              autoComplete="off"
              onChange={handleChange}
            />
            {errors.phone && <span>{errors.phone}</span>}
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              autoComplete="off"
              onChange={handleChange}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="******"
              onChange={handleChange}
            />
            {errors.password && <span>{errors.password}</span>}
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter password"
              onChange={handleChange}
            />
            {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
          </div>
          <button type="submit" className="w-100 rounded-0">
            Register
          </button>
          Agree to terms and conditions
          <Link
            to={`/login`}
            className="btn border w-100 rounded-0 text-decoration-none"
          >
            Login
          </Link>
        </form>
  );
};

export default Signup;
