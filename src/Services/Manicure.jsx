import React, { useState } from 'react';
import styles from '../manicure.module.css';
import { Form } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import manicure from '../images/manicure/bmg.png';
import acrylics from '../images/manicure/nail.jpeg';
import builder from '../images/manicure/art.jpeg';
import soft from '../images/manicure/manicure.jpg';

const Manicure = () => {
	const [selectedService, setSelectedService] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [bookingDetails, setBookingDetails] = useState({
		email: '',
		date: '',
		payment: '',
	});

	const handleBook = service => {
		setSelectedService(service);
		setShowModal(true);
	};
	const handleClose = () => setShowModal(false);

	const handleChange = e => {
		const { name, value } = e.target;
		setBookingDetails(prevDetails => ({ ...prevDetails, [name]: value }));
	};

	const handleSubmit = e => {
		e.preventDefault();
		alert(
			`Booking confirmed for ${selectedService.name} on ${bookingDetails.date}`
		);
		setShowModal(false);
	};

	return (
		<>
			<div className={styles.topic}>
				<p>ELLYNBEAUTY MANICURE STORE</p>
			</div>
			<div className={styles.container}>
				<img src={acrylics} alt="" className={styles.image} />
				<h2 className={styles.title}>Manicure services</h2>
				<p className={styles.description}>
					Experience ultimate toenail transformation with gel, builder, tips,
					acrylics and more pedicure services. Perfect for nail preservation,
					beauty and overall cleanliness.
				</p>
				<div className={styles.services}>
					<div className={styles.serviceItem}>
						<img src={builder} alt="" className={styles.image} />
						<h3 className={styles.serviceTitle}>Mani builder gel</h3>
						<p className={styles.serviceDescription}>
							Builder gels are versatile and can be used for sculpting, tip
							extensions, or strengthening natural nails. They offer flexibility
							and durability.
						</p>
						<span className={styles.price}>$60 / 60 mins</span>
					</div>
					<div className={styles.serviceItem}>
						<img src={manicure} alt="" className={styles.image} />
						<h3 className={styles.serviceTitle}>Acrylics manicure</h3>
						<p className={styles.serviceDescription}>
							Applying a liquid and powder mixture to nail beds to extend and
							sculpt artificial nails.
						</p>
						<span className={styles.price}>$80 / 60 mins</span>
					</div>
					<div className={styles.serviceItem}>
						<img src={soft} alt="" className={styles.image} />
						<h3 className={styles.serviceTitle}>Soft Gel Manicure</h3>
						<p className={styles.serviceDescription}>
							Soft gel is ideal for short to mid-length natural nails. While it
							adds some strength, it may not support nail extensions.
						</p>
						<span className={styles.price}>$90 / 60 mins</span>
					</div>
					<button className={styles.booking} onClick={() => handleBook()}>
						Book Appointment
					</button>
				</div>

				<Modal 
				    show={showModal} 
				    onHide={handleClose} 
				    centered 
				    dialogClassName={styles.modalResponsive}
				>
					<Modal.Header closeButton>
						<Modal.Title className="heading">
							Book {selectedService?.name}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={handleSubmit}>
							<Form.Group controlId="formEmail">
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="email"
									placeholder="Enter your email"
									name="email"
									value={bookingDetails.email}
									onChange={handleChange}
									required
								/>
							</Form.Group>
							<Form.Group controlId="formDate">
								<Form.Label>Date</Form.Label>
								<Form.Control
									type="date"
									name="date"
									value={bookingDetails.date}
									onChange={handleChange}
									required
								/>
							</Form.Group>
							<Form.Group controlId="formPayment">
								<Form.Label>Payment</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter payment details"
									name="payment"
									value={bookingDetails.payment}
									onChange={handleChange}
									required
								/>
							</Form.Group>
							<button className="confirm-booking" type="submit">
								Confirm Booking
							</button>
						</Form>
					</Modal.Body>
				</Modal>
			</div>
		</>
	);
};

export default Manicure;
