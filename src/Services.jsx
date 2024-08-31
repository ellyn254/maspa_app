import React from 'react'
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import manimage from './assets/manicure.jpg';
import pedimage from './assets/pedicure.jpg';
import massimage from './assets/massage.jpg';
import facialimage from './assets/facial.jpg';
import salonimage from './assets/salon.jpg';
import yogaimage from './assets/yoga.jpg';
import './CssFiles/services.css';


const Services = () => {

    const services = [
		{
			id: 1,
			name: 'Massage',
			icon: <img src={massimage} alt="Background" className="image" />,
			description:
				'A full body massage is focused on targeting the entire body. Any massage that uses the term full body in its name is generally going to be a full body massage. For example, a Swedish massage is usually a full body massage, as is a sports massage.',
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
   <div className="service-container">
				<Row>
					<h1>| Insights</h1>
					{services.map(service => (
						<Col key={service.id} sm={6} md={4} className="mb-4">
							<Card className="card-container">
								<Card.Body className="text-center">
									<div style={{ fontSize: '2rem' }}>{service.icon}</div>
									<Card.Title>{service.name}</Card.Title>
									{service.description}
									<div className="readme">
										<Link to={`/${service.name}`}>Read more ↗️</Link>
									</div>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</div>
  )
}

export default Services