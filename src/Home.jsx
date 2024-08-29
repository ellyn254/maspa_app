import React from 'react';
import './CssFiles/about.css';
import './CssFiles/service.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import manimage from './assets/manicure.jpg';
import pedimage from './assets/pedicure.jpg';
import massimage from './assets/massage.jpg';
import facialimage from './assets/facial.jpg';
import salonimage from './assets/salon.jpg';
import yogaimage from './assets/yoga.jpg';
//CONTACT PAGE IMPORTS
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CssFiles/contact.css';
import styles from './CssFiles/home.module.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import { RiMailFill } from 'react-icons/ri';
import call from './images/contact.webp';

// Dummy data for products (you can replace this with actual API data)
const productsData = [
	{
		id: 1,
		name: 'manicure',
		description: 'Description for manicure',
		price: 29.99,
		imageUrl:
			'https://www.raycochrane.co.uk/wp-content/uploads/2019/08/frenchmanicure-1-1024x576.png',
	},
	{
		id: 2,
		name: 'Pedicure',
		description: 'Description for pedicure',
		price: 49.99,
		imageUrl:
			'https://aesthetebeauty.co.uk/files/2023/11/pink-pedicure-toenails-dundee-1920.jpg',
	},
	{
		id: 3,
		name: 'massage',
		description: 'Description for massage',
		price: 50.99,
		imageUrl:
			'https://organicthaispa.ca/wp-content/uploads/2022/07/COUPLES-MASSAGE-1-2048x1365-optimized.jpg',
	},
	{
		id: 4,
		name: 'yoga',
		description: 'Description for yoga',
		price: 13.99,
		imageUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSjklsoxVK0JHuq1DNS7aH4R_hGkT07hkasQ&s',
	},
	{
		id: 5,
		name: 'salon',
		description: 'Description of salon',
		price: 39.99,
		imageUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4jCu5aCPbsBkeHc7482oHgLzxwByiKIm3J0PIKjsZX00Brs0KDgIw17k2iGCR73N1Rw0&usqp=CAU',
	},
	{
		id: 6,
		name: 'Facial',
		description: 'Description for facial',
		price: 456.99,
		imageUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToBWL5X92Ad60hV2tSDEq66Ln_ExYVH99J5g&s',
	},
	{
		id: 7,
		name: 'makeup',
		description: 'Description for makeup',
		price: 1999.99,
		imageUrl:
			'https://w7.pngwing.com/pngs/730/227/png-transparent-cosmetics-make-up-face-powder-makeup-set-face-fashion-makeup-brush.png',
	},
	{
		id: 8,
		name: 'tatooing',
		description: 'Description for tatooing',
		price: 209.99,
		imageUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbNHxwMvZvtFJv_BD7M_Gm74D2hay1MsfafA&s',
	},
	{
		id: 9,
		name: 'beauty',
		description: 'Description for beauty',
		price: 39.99,
		imageUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA3Tv61JYkFDnf7MYjqOszMBeTSBB7Vz04n7iKsj0z0LpuZSO1YBQWwDZQH5GTmmnq-7E&usqp=CAU',
	},
	{
		id: 10,
		name: 'beauty',
		description: 'Description for beauty',
		price: 29.99,
		imageUrl:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA3Tv61JYkFDnf7MYjqOszMBeTSBB7Vz04n7iKsj0z0LpuZSO1YBQWwDZQH5GTmmnq-7E&usqp=CAU',
	},
	// Add more products as needed
];

const Home = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		// Fetch products data from an API
		// For this example, we are using dummy data
		setProducts(productsData);
	}, []);

	const services = [
		{
			id: 1,
			name: 'Massage',
			icon: <img src={massimage} alt="Background" className="image" />,
		},
		{
			id: 2,
			name: 'Pedicure',
			icon: <img src={pedimage} alt="Background" className="image" />,
		},
		{
			id: 3,
			name: 'Manicure',
			icon: <img src={manimage} alt="Background" className="image" />,
		},
		{
			id: 4,
			name: 'Facial',
			icon: <img src={facialimage} alt="Background" className="image" />,
		},
		{
			id: 5,
			name: 'Salon',
			icon: <img src={salonimage} alt="Background" className="image" />,
		},
		{
			id: 6,
			name: 'Yoga',
			icon: <img src={yogaimage} alt="Background" className="image" />,
		},
	];

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

	const handleSubmit = e => {
		e.preventDefault();
		// Check if the entered email is valid
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
					console.error('Email duplicate entry', error);
					alert('Error sending the mmessage duplicate entry for email');
					//clear the for fields
					setValues({
						email: '',
					});
				});
		} else {
			alert('Please register with us first.');
			navigate('/register');
		}
	};

	return (
		<>
			{/*/////////////////////////////////////////////////// HOME PAGE //////////////////////////////////////////////*/}
			<div className={styles.homeContainer}>
				<h1 className={styles.header}>
					<b>CLASSY DE ELEGANCE</b>
				</h1>
				<div className={styles.productsGrid}>
					{products.map(product => (
						<div key={product.id} className={styles.productCard}>
							<img
								src={product.imageUrl}
								alt={product.name}
								className={styles.productsImage}
							/>
							<h3>{product.name}</h3>
							<p>{product.description}</p>
							<p>${product.price.toFixed(2)}</p>
						</div>
					))}
				</div>
			</div>

			{/*//////////////////////////////////////// ABOUT PAGE //////////////////////////////////////////////////*/}

			<div className="about-navbar">
				<a href="/about">About Us</a>
			</div>
			<div className="information">
				<p>
					DM Interior Studio was established with the purpose of delivering of
					Total interior design services in Sri Lanka.Our portfolio ranges from
					commercial interior design in Sri Lanka, residential interior design,
					industrial and recreational spaces alike. Since our launch, we have
					been always on the lookout to improvise our creativity through
					innovation. We offer some of the best of the class designs and layouts
					for interior designing projects Our creations are often unique just
					for the client’s taste. These three philosophies are some of the
					fundamental pillars of our success today. We believe that with a great
					design that has an exceptional quality of experience with a strong
					service and support is critical.These three are the most important
					elements of our strong and proven relationship with some of the major
					brands.
				</p>

				<h1>Our Specialty</h1>
				<p>
					Unlike many in the industry, we have possessed knowledge and skills of
					architecture in designing our interior designs in Sri Lanka. This
					provides us the edge to have a broad understanding on how to bring
					creativity and sophistication together. Our knowledge and skills in
					quantity surveying, MEP and project management gives our clients
					additional confidence to rely on us. Thus we can make sure that the
					client doesn’t have to redo/renovate the interior partly or
					completely.
				</p>
			</div>
			<div>
				<h2>Our Services</h2>
				<Row className="service-container">
					{services.map(service => (
						<Col key={service.id} sm={6} md={4} className="mb-4">
							<Card className="card-container">
								<Card.Body className="text-center">
									<div style={{ fontSize: '2rem' }}>{service.icon}</div>
									<Card.Title>{service.name}</Card.Title>
									{service.description}
									<div className="readme">
										<a href="/services">Read more ↗️</a>
									</div>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</div>
			<div className="lowerdiv">
				<h2>Ready to experience the magic?</h2>
				<p>Chat with us today!</p>
				<a href="/contact">Talk to Us</a>
			</div>

			{/* ///////////////////////////////////////////////////////////CONTACT PAGE ////////////////////////////////////////////*/}
			<div className="contact-navbar">
				<h1>Want to inquire on something?</h1>
				<p>We are available on our bio below 👇</p>
			</div>
			<div className="body-container">
				<div className="bio">
					<h2>Schedule a call with us.</h2>
					<img src={call} alt="" className="bgmeet" />
					<p>
						Our social media handles. Have any burning question? write to us
						through the form on the side. Or reach us through social media
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

export default Home;
