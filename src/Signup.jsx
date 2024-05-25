import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input/input";
import "react-phone-number-input/style.css";
import Flag from "react-country-flag";
import "./Signup.css";

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
  // const [termsChecked, setTermsChecked] = useState(false);

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

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.name.trim()) {
      validationErrors.name = "name is required";
    }

    // if (!formData.phone.trim()) {
    //   validationErrors.phone = "phone number is required";
    // } else if (!/^\d{10}$/.test(formData.phone)) {
    //   // Validates 10-digit phone numbers
    //   validationErrors.phone = "phone number should be 10 char";
    // }
    if (!formData.phone.trim()) {
      validationErrors.phone = "Phone number is required";
    } else if (
      !isValidPhoneNumber(formData.phone) &&
      !/^\d{10}$/.test(formData.phone)
    ) {
      validationErrors.phone = "Phone number is not valid";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "email is not valid";
    }

    if (!formData.password.trim()) {
      validationErrors.password = "password is required";
    } else if (formData.password.length < 6) {
      validationErrors.password = "password should be a max of 8 char";
    }

    if (formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = "password not matched";
    }

    // if (!e.target.termsCheckbox.checked) {
    //   validationErrors.terms = "Please accept our terms and conditions";
    // }

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
        confirmPassword: formData.confirmPassword,
      });

      if (res.data.error) {
        setFormData.name('')
        setFormData.phone('')
        setFormData.email('')
        setFormData.password('')
        setFormData.confirmPassword('')
      } else {
        console.log(res.data.message);
        navigate("/");
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
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="p-3 w-25 rounded bg-white">
        <form onSubmit={handleSubmit}>
          <h2>
            <strong>Sign Up</strong>
          </h2>
          <div>
            <label>
              <strong>Name:</strong>
            </label>
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
            <label>
              <strong>Phone:</strong>
            </label>
            <div className="phone-input">
              <Flag countryCode={formData.countryCode} />
              <PhoneInput
                name="phone"
                type="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handlePhoneChange}
                country="KE" // Set country to Kenya
              />
            </div>
            {errors.phone && <span>{errors.phone}</span>}
          </div>
          <div>
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
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div>
            <label>
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              name="password"
              placeholder="enter password******"
              onChange={handleChange}
            />
            {errors.password && <span>{errors.password}</span>}
          </div>
          <div>
            <label>
              <strong>Confirm Password:</strong>
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter password ********"
              onChange={handleChange}
            />
            {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
          </div>
          <div>
            <input type="checkbox" id="termsCheckbox" required />
            <label htmlFor="termsCheckbox">
              I agree to the{" "}
              <a href="terms_and_conditions.html" target="_blank">
                terms and conditions
              </a>
            </label>
            {/* {errors.terms && <span>{errors.terms}</span>} */}
          </div>
          <button
            type="submit"
            className="w-100 rounded-0"
            // disabled={!termsChecked}
          >
            Register
          </button>
          <Link
            to={`/`}
            className="btn border w-100 rounded-0 text-decoration-none"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
