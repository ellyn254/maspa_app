import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input/input";
import "react-phone-number-input/style.css";
import Flag from "react-country-flag";
import "./CssFiles/update.css";

const Update = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    countryCode: "KE", // Default to Kenya
  });

  const [errors, setErrors] = useState({});

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

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
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
      alert("Form updated successfully");

      axios
        .put(`http://localhost:5000/update/${id}`, formData)
        .then((res) => {
          console.log(res.data);
          navigate("/user");
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <>
      
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2>Update</h2>
            <div>
              <label>
                <strong>Name:</strong>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                autoComplete="off"
                onChange={handleChange}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div>
              <label>
                <strong>Phone:</strong>
              </label>
              <div className="phone-input">
                <Flag countryCode={formData.countryCode} />
                <PhoneInput
                  name="phone"
                  type="phone"
                  placeholder="Enter phone number"
                  autoComplete="off"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  country="KE"
                />
              </div>
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
            <div>
              <label>
                <strong>Email:</strong>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="off"
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div>
              <label>
                <strong>Password:</strong>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="off"
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            <div>
              <label htmlFor="confirmpassword">
                <strong>Confirm Password:</strong>
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
              )}
            </div>

            <button type="submit" className="submit-btn">
              Update
            </button>
          </form>
        </div>
    </>
  );
};

export default Update;
