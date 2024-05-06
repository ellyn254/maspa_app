import React, { useState } from 'react'
import { Link, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input/input';
import 'react-phone-number-input/style.css';
import Flag from 'react-country-flag';
import './Signup.css'

const Update = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        countryCode: "KE" // Default to Kenya
      })
    
      const [errors, setErrors] = useState({})
    
      const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData, [name] : value
        })
      }

      const handlePhoneChange = (value) => {
        setFormData({
          ...formData,
          phone: value,
        });
      };
    
      //to pass the id we use the useParams hook as below
    const {id} = useParams();
      const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = {};
    if (!formData.name.trim()) {
      validationErrors.name = "name is required";
    }
    if (!formData.phone.trim()) {
      validationErrors.phone = "Phone number is required";
    } else if (!isValidPhoneNumber(formData.phone) && !/^\d{10}$/.test(formData.phone)) {
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
      validationErrors.password = "password should be at least 6 char";
    }

    if (formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = "password not matched";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Form Submitted successfully");
    
    
    axios.put(`http://localhost:5000/update/${id}`, formData)
    .then(res => {
      console.log(res.data);
      navigate('/');
    })
    .catch(err => console.error(err));
}}
    
  return (
    <div className='d-flex vh-100 justify-content-center align-items-center'>
    <div className='p-3 w-25 rounded bg-white'>
  <form onSubmit={handleSubmit}>
    <h2>Update</h2>
    <div>
      <label><strong>Name:</strong></label>
      <input
        type="text"
        name="name"
        placeholder='name'  
        autoComplete='off'  
        onChange={handleChange}   
      />
        {errors.name && <span>{errors.name}</span>}  
    </div>
    <div>
      <label><strong>Phone:</strong></label>
      <div className="phone-input">
              <Flag countryCode={formData.countryCode} />
              <PhoneInput
                name="phone"
                type="phone"
                placeholder="Enter phone number"
                autoComplete='off'
                value={formData.phone}
                onChange={handlePhoneChange}
                country="KE" // Set country to Kenya
              />
            </div>
            {errors.phone && <span>{errors.phone}</span>}
          </div>
    <div>
      <label><strong>Email:</strong></label>
      <input
        type="email"
        name="email"
        placeholder='email'  
        autoComplete='off'  
        onChange={handleChange}   
      />
        {errors.email && <span>{errors.email}</span>}  
    </div>

    <div>
      <label><strong>Password:</strong></label>
      <input
        type="password"
        name="password"
        placeholder='password'  
        autoComplete='off'  
        onChange={handleChange}   
      />
        {errors.password && <span>{errors.password}</span>}  
    </div>
        <div>
      <label htmlFor='confirmpassword'><strong>Confirm Password:</strong></label>
      <input
        type="password"
        name="confirmPassword"
        placeholder='Re-enter password'
        onChange={handleChange} 
      />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}  
    </div>
        
                <button type='submit' className='w-100 rounded-0'>Update</button>
                
                <Link to={`/login`} className='btn border w-100 rounded-0 text-decoration-none'>Login</Link>
     </form>
     </div>
     </div>
  )
}

export default Update