import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
// import parsePhoneNumberFromString from 'libphonenumber-js';

const Signin = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    
      })
    
      const [errors, setErrors] = useState({})
    
      const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData, [name] : value
        })
      }
    
      const navigate = useNavigate();
      const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = {}
    
        if(!formData.email.trim()) {
            validationErrors.email = "email is required"
        } else if(!/\S+@\S+\.\S+/.test(formData.email)){
            validationErrors.email = "email is not valid"
        }
    
        if(!formData.password.trim()) {
            validationErrors.password = "password is required"
        } else if(formData.password.length < 6){
            validationErrors.password = "password should be at least 6 char"
        }
    
        setErrors(validationErrors)
    
        if(Object.keys(validationErrors).length === 0) {
          
        }
    try{
        //here we use axios library to pass data
      const res = await axios.post('http://localhost:5000/login', {email:formData.email, password:formData.password})
      
      //after which we print the result
      if (res.data.error) {
        `setFormData.email({})``setFormData.password({})`;
      } else {
        console.log(res.data.message);
        alert('Login successfull')
        navigate("/home");
      }
    }catch (error) {
      console.error(error);
      // Handle error response from the server
      if (error.response && error.response.status === 400) {
        // Server returned 400 Bad Request
        alert("All fields are required");
      } else {
        // Other errors
        alert("Unauthorized user. Please create account");
        navigate('/register');
      }
    }
    }
  return (
   
    <form onSubmit={handleSubmit}>
    <div>
      <label>Email:</label>
      <input
        type="email"
        name="email"
        placeholder='example@gmail.com'
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
        placeholder='******'
        onChange={handleChange} 
      />
        {errors.password && <span>{errors.password}</span>}  
    </div>
               <button type='submit' className='w-100 rounded-0'>Login</button>
                Agree to terms and conditions
                <Link to={`/register`} className='btn border w-100 rounded-0 text-decoration-none'>Create Account</Link>
  </form>
  )
}

export default Signin