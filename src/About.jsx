import './CssFiles/about.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import { Link } from 'react-router-dom';
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import manimage from './assets/manicure.jpg';
import pedimage from './assets/pedicure.jpg';
import massimage from './assets/massage.jpg';
import facialimage from './assets/facial.jpg';
import salonimage from './assets/salon.jpg';
import yogaimage from './assets/yoga.jpg';

const About = () => {
	const services = [
		{
			id: 1,
			name: 'Massage',
			icon: <img src={massimage} alt="Background" className="image" />,
			description:
				'A full body massage is a more general term that refers to any massage that is focused on targeting the entire body. Any massage that uses the term full body in its name is generally going to be a full body massage. For example, a Swedish massage is usually a full body massage, as is a sports massage.',
		},
		{
			id: 2,
			name: 'Pedicure',
			icon: <img src={pedimage} alt="Background" className="image" />,
			description:
				'A pedicure is a cosmetic treatment of the feet and toenails, analogous to a manicure. During a pedicure, dead skin cells are rubbed off the bottom of the feet using a rough stone. Skincare is often provided up to the knee, including granular exfoliation, moisturizing, and massage.',
		},
		{
			id: 3,
			name: 'Manicure',
			icon: <img src={manimage} alt="Background" className="image" />,
			description:
				'A manicure is a mostly cosmetic beauty treatment for the fingernails and hands performed at home or in a nail salon.',
		},
		{
			id: 4,
			name: 'Facial',
			icon: <img src={facialimage} alt="Background" className="image" />,
			description:
				'A facial is a family of skin care treatments for the face, including steam, exfoliation, extraction, creams, lotions, facial masks, peels, and massage. They are normally performed in beauty salons, but are also a common spa treatment. They are used for general skin health as well as for specific skin conditions.',
		},
		{
			id: 5,
			name: 'Salon',
			icon: <img src={salonimage} alt="Background" className="image" />,
			description:
				'A salon is a place where people have their hair cut or coloured, or have beauty treatments.',
		},
		{
			id: 6,
			name: 'Yoga',
			icon: <img src={yogaimage} alt="Background" className="image" />,
			description:
				'Yoga is a practice that connects the body, breath, and mind. It uses physical postures, breathing exercises, and meditation to improve overall health.',
		},
	];

	return (
		<>
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
		</>
	);
};

export default About;
