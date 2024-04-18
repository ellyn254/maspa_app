import React, { useState } from 'react'
import { Link, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'


const Update = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
    
      const [errors, setErrors] = useState({})
    
      const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData, [name] : value
        })
      }
    
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
    
    
    axios.put(`http://localhost:5000/update/${id}`, formData)
    .then(res => {
      console.log(res.data);
      navigate('/');
    })
    .catch(err => console.error(err));
}}
    
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
    <div className='bg-white p-3 rounded w-25'>
            <h2>Update</h2>
            <form onSubmit={handleSubmit}>
    
            <div>
      <label>Name:</label>
      <input
        type="name"
        name="name"
        placeholder='name'  
        autoComplete='off'  
        onChange={handleChange}   
      />
        {errors.name && <span>{errors.name}</span>}  
    </div>
    <div>
      <label>Phone:</label>
      <input
        type="phone"
        name="phone"
        placeholder='phone'  
        autoComplete='off'  
        onChange={handleChange}   
      />
        {errors.phone && <span>{errors.phone}</span>}  
    </div>

    <div>
      <label>Email:</label>
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
      <label>Password:</label>
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
      <label htmlFor='confirmpassword'>Confirm Password:</label>
      <input
        type="password"
        name="confirmPassword"
        placeholder='Re-enter password'
        onChange={handleChange} 
      />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}  
    </div>
        
                <button type='submit' className='btn btn-secondary w-100 rounded-0'>Update</button>
                Agree to terms and conditions
                <Link to={`/login`} className='btn btn-default border w-100 bg-info rounded-0 text-decoration-none'>Login</Link>
            </form>
        </div>
    </div>
  )
}

export default Update