import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CssFiles/contact.css';
import { RiMailFill } from 'react-icons/ri';
import { FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import call from './images/contact.webp';

const Contact = () => {
	const [values, setValues] = useState({
		email: '',
		message: '',
	});
	const [storedEmails, setStoredEmails] = useState([]);

	useEffect(() => {
		// Fetch stored emails from the backend
		axios
			.get('http://localhost:5000/email')
			.then(response => {
				setStoredEmails(response.data.map(item => item.email));
			})
			.catch(error => {
				console.error('Error fetching emails:', error);
			});
	}, []);

	const navigate = useNavigate();

	const handleChange = e => {
		setValues({
			...values,
			[e.target.name]: e.target.value,
		});
	};

	const validateEmail = email => {
		// Regex Regular expression for validating email format
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(String(email).toLowerCase());
	};

	const handleSubmit = e => {
		e.preventDefault();
		// Validate the email format
		if (!validateEmail(values.email)) {
			alert('Please enter a valid email address.');
			return;
		}

		// Check if the entered email is valid (i.e., in the storedEmails list)
		if (storedEmails.includes(values.email)) {
			// Send message to the backend
			axios
				.post('http://localhost:5000/contact', values)
				.then(response => {
					console.log(response.data);
					alert('Message sent successfully');
					// Clear form fields
					setValues({
						email: '',
						message: '',
					});
				})
				.catch(error => {
					console.error('Error sending message:', error);
					alert('There was an error sending your message.');
				});
		} else {
			alert('Please register with us first.');
			navigate('/register');
		}
	};

	return (
		<>
			<div className="contact-navbar">
				<h1>Want to inquire on something?</h1>
				<p>We are available on our bio below 👇</p>
			</div>
			<div className="body-container">
				<div className="bio">
					<h2>Schedule a call with us.</h2>
					<img src={call} alt="" className="bgmeet" />
					<p>
						Our social media handles. Have any burning question? Write to us
						through the form on the side or reach us through the social media
						handles below.
					</p>
					<h2>Our Bio</h2>
					<div className="social-icons">
						<ul>
							<p>
								<RiMailFill /> info@maspaenterprise.com
							</p>
							<p>
								<FaPhoneAlt /> +254 790 834127
							</p>
							<p>
								<FaMapMarkerAlt /> Office 1402, Three Sails Tower
							</p>
						</ul>
					</div>
				</div>
				<div className="form-container">
					<form onSubmit={handleSubmit}>
						<h2>
							<strong>Contact Page</strong>
						</h2>
						<div className="mb-3">
							<label>
								<strong>Email:</strong>
							</label>
							<input
								type="email"
								className="form-control"
								id="email"
								name="email"
								placeholder="Enter email registered with us"
								value={values.email}
								onChange={handleChange}
								required
								autoComplete="off"
							/>
						</div>

						<div className="mb-3">
							<label>
								<strong>Message:</strong>
							</label>
							<textarea
								className="form-control"
								id="message"
								name="message"
								placeholder="Compose a message"
								value={values.message}
								onChange={handleChange}
								required
								autoComplete="off"
							/>
						</div>
						<button type="submit" className="btn btn-primary w-100">
							Submit
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default Contact;
