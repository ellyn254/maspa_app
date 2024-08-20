import React, { useState } from 'react';
import styles from '../massage.module.css';
import { Form } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

const Massage = () => {
    const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    email: "",
    date: "",
    payment: ""
  });

    const handleBook = (service) => {
        setSelectedService(service);
        setShowModal(true);
      };
    // closes the modal window
      const handleClose = () => setShowModal(false);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        alert(
          `Booking confirmed for ${selectedService.name} on ${bookingDetails.date}`
        );
        setShowModal(false);
      };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Relaxing Massage Therapy</h2>
      <p className={styles.description}>
        Experience ultimate relaxation with our professional massage therapy services. Perfect for stress relief, muscle tension, and overall well-being.
      </p>
      <div className={styles.services}>
        <div className={styles.serviceItem}>
          <h3 className={styles.serviceTitle}>Swedish Massage</h3>
          <p className={styles.serviceDescription}>A gentle massage that uses smooth, gliding strokes to promote relaxation and ease tension.</p>
          <span className={styles.price}>$60 / 60 mins</span>
        </div>
        <div className={styles.serviceItem}>
          <h3 className={styles.serviceTitle}>Deep Tissue Massage</h3>
          <p className={styles.serviceDescription}>A deeper massage that targets muscle knots and chronic tension.</p>
          <span className={styles.price}>$80 / 60 mins</span>
        </div>
        <div className={styles.serviceItem}>
          <h3 className={styles.serviceTitle}>Hot Stone Massage</h3>
          <p className={styles.serviceDescription}>A therapeutic massage using heated stones to relax and soothe muscles.</p>
          <span className={styles.price}>$90 / 60 mins</span>
        </div>
        <button className="booking" onClick={() => handleBook()}>View</button>
      </div>

      <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="heading">Book {selectedService?.name}</Modal.Title>
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
