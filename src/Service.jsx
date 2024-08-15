import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Modal,
  Form,
} from "react-bootstrap";
import "./CssFiles/service.css";
import manimage from './assets/manicure.jpg';
import pedimage from './assets/pedicure.jpg';
import massimage from './assets/massage.jpg';
import facialimage from './assets/facial.jpg';
import salonimage from './assets/salon.jpg';
import yogaimage from './assets/yoga.jpg';
import { Link } from "react-router-dom";

const services = [
  { id: 1, name: "Massage", icon: <img src={massimage} alt="Background" className="image"/> },
  { id: 2, name: "Pedicure", icon: <img src={pedimage} alt="Background" className="image"/> },
  { id: 3, name: "Manicure", icon: <img src={manimage} alt="Background" className="image"/> },
  { id: 4, name: "Facial", icon: <img src={facialimage} alt="Background" className="image"/> },
  { id: 5, name: "Salon", icon: <img src={salonimage} alt="Background" className="image"/>},
  { id: 6, name: "Yoga", icon: <img src={yogaimage} alt="Background" className="image"/> },
];

const Service = () => {
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
    <>
       <div className="route">
    <Link to="/home" className="route" >Home</Link> /
    <Link to="/services" className="route" >Our Services</Link>
    </div>
        <Row className="service-container">
          {services.map((service) => (
            <Col key={service.id} sm={6} md={4} className="mb-4">
              <Card>
                <Card.Body className="text-center">
                  <div style={{ fontSize: "2rem" }}>{service.icon}</div>
                  <Card.Title>{service.name}</Card.Title>
                  <button className="booking" onClick={() => handleBook(service)}>
                    Book Now
                  </button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

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
    </>
  );
};

export default Service;
