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
      const handleSubmit = (e) => {
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
            alert("Form Submitted successfully")

        }
    
        //here we use axios library to pass data
      axios.post('http://localhost:5000/login', {email:formData.email, password:formData.password})
      
      //after which we print the result
      
      .then((res) => {
        if(res.data.success) {
        
        }        

        console.log(res.data.success);
        navigate("/home");

      })
      //else if an error occurs
      .catch((err) => console.log(err, ));
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