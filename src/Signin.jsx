import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

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
    }
    try {
      const res = await axios.post("http://localhost:5000/", {
        email: formData.email,
        password: formData.password,
      });
      if (res.data.error === 401) {
        console.log(res.data.error);
        alert(res.data.message || "Invalid credentials");

      } else {
        console.log(res.data.message);
        alert(res.data.message || "Login successful");
         navigate("/home");
      }

    } catch (error) {
      // console.error(error);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.error || "All fields are required");
      } else {
        toast.error("Unauthorized user. Please create an account");
        navigate("/register");
      }
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <div className="p-3 w-25 rounded bg-white">
        <form onSubmit={handleSubmit}>
          <h2>
            <strong>Sign In</strong>
          </h2>
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
              placeholder="******"
              onChange={handleChange}
            />
            {errors.password && <span>{errors.password}</span>}
          </div>
          <div>
            <input type="checkbox" id="termsCheckbox" required />
            <label htmlFor="termsCheckbox">
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
          <button type="submit" className="w-100 rounded-0">
            Login
          </button>
          <Link
            to="/register"
            className="btn border w-100 rounded-0 text-decoration-none"
          >
            Create Account
          </Link>
        </form>
      </div>
      <ToastContainer 
        transition = {Zoom}
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Signin;
