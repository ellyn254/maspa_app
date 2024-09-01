import React, { useState } from 'react';
import styles from '../massage.module.css';
import { Form } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import massage from '../images/massage.jpeg';
import hotstone from '../images/massage/hotstone.avif';
import deeptissue from '../images/massage/deeptissue.jpg';
import swedish from '../images/massage/swedish.avif';


const Massage = () => {
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
	// closes the modal window
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
		<div className={styles.container}>
			<img src={massage} alt="" className={styles.image} />
			<h2 className={styles.title}>Relaxing Massage Therapy</h2>
			<p className={styles.description}>
				Experience ultimate relaxation with our professional massage therapy
				services. Perfect for stress relief, muscle tension, and overall
				well-being. a therapeutic approach characterized by smooth, flowing
				strokes aimed at fostering relaxation and diminishing stress. Unlike the
				targeted pressure of deep tissue or sports massage, relaxation massage
				serves to calm the nervous system, improve blood circulation, and
				release muscle tension.
			</p>
			<div className={styles.services}>
				<div className={styles.serviceItem}>
					<img src={swedish} alt="" className={styles.image} />
					<h3 className={styles.serviceTitle}>Swedish Massage</h3>
					<p className={styles.serviceDescription}>
						A gentle massage that uses smooth, gliding strokes to promote
						relaxation and ease tension. It can help release muscle knots, and
						it’s also a good choice for when you want to fully relax during a
						massage. For this massage, you’ll remove your clothes, though you
						may choose to keep your underwear on. You’ll be covered with a sheet
						while lying on the massage table. The massage therapist will move
						the sheet to uncover areas that they are actively working on.
					</p>
					<span className={styles.price}>$60 / 60 mins</span>
				</div>
				<div className={styles.serviceItem}>
					<img src={deeptissue} alt="" className={styles.image} />
					<h3 className={styles.serviceTitle}>Deep Tissue Massage</h3>
					<p className={styles.serviceDescription}>
						A deeper massage that targets muscle knots and chronic tension.
						During a deep tissue massage, your massage therapist will use slow
						strokes and deep finger pressure to relieve tension from the deepest
						layers of your muscles and connective tissues. You can be naked
						during this massage or wear your underwear. The massage will last 60
						to 90 minutes. While deep tissue may be more intense, you shouldn’t
						feel any pain or soreness.
					</p>
					<span className={styles.price}>$80 / 60 mins</span>
				</div>
				<div className={styles.serviceItem}>
					<img src={hotstone} alt="" className={styles.image} />
					<h3 className={styles.serviceTitle}>Hot Stone Massage</h3>
					<p className={styles.serviceDescription}>
						A therapeutic massage using heated stones to relax and soothe
						muscles. During a hot stone massage, heated stones are placed on
						different areas of the whole body. Your therapist may hold a stone
						as they massage different parts of your body using Swedish massage
						techniques with gentle pressure. Sometimes, cold stones are also
						used. You don’t wear clothes for hot stone massage, unless you’d
						prefer to wear your underwear. You’ll be covered with a sheet.
						Usually, the massage is 90 minutes long.
					</p>
					<span className={styles.price}>$90 / 60 mins</span>
				</div>
			</div>

			<button className={styles.booking} onClick={() => handleBook()}>
				Book Appointment
			</button>

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
				</Modal><Modal 
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
	);
};

export default Massage;
