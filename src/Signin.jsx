import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
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
  axios.defaults.withCredentials = true;
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
        const res = await axios.post("http://localhost:5000", {
          email: formData.email,
          password: formData.password,
        });

        if (res.data.Status) {
          console.log(res.data.Status);
          alert("Login successful");
          navigate("/home");
        } else {
          console.log(res.data.error);
          alert(res.data.error || "Password do not match!");
          setFormData({ ...formData, password: "" }); // Clear the password field
        }
      } catch (error) {
        if (error.response && error.response.status === 500) {
          alert("Email does not exist");
        } else {
          alert("User not found please register");
          navigate("/register");
        }
      }
    }
  };

  return (
    <>
        <div className="form-container">
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
          
            <button type="submit" className="btn-signin">
              Login
            </button>
            <div>Creating an account?
            <Link to="/register" className="account">
              Click Here
            </Link></div>
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
            <Link to={`/forgotpassword`} className="forgot">
              forgot-password?
            </Link>
          </form>
        </div>
    </>
  );
};

export default Signin;
