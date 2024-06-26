import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { FaSpa, FaCut } from "react-icons/fa";
import { SocialIcon } from "react-social-icons";
import { Link } from "react-router-dom";

const services = [
  { id: 1, name: "Massage", icon: <FaSpa /> },
  { id: 2, name: "Pedicure", icon: <FaCut /> },
  { id: 3, name: "Manicure", icon: <FaCut /> },
  { id: 4, name: "Facial", icon: <FaSpa /> },
  { id: 5, name: "Salon", icon: <FaCut /> },
  { id: 6, name: "Yoga", icon: <FaSpa /> },
];

const Service = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    date: "",
    payment: "",
  });

  const handleBook = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

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
      <Container>
        <Row className="mt-4">
          {services.map((service) => (
            <Col key={service.id} sm={6} md={4} className="mb-4">
              <Card>
                <Card.Body className="text-center">
                  <div style={{ fontSize: "2rem" }}>{service.icon}</div>
                  <Card.Title>{service.name}</Card.Title>
                  <Button variant="primary" onClick={() => handleBook(service)}>
                    Book Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Book {selectedService?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={bookingDetails.name}
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
              <Button variant="primary" type="submit">
                Confirm Booking
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
      <div className="lowerdiv">
        <p className="text">
          These are our feedbacks from esteemed customers. <br />
          Allan Kheyt, customer
        </p>
        <div className="div">
          <Link to="/contact" className="button">
            TALK TO US
          </Link>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section about">
            <h3>About Us</h3>
            <p>
              We are a company dedicated to providing the best services and
              products.
            </p>
          </div>
          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="footer-section social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <SocialIcon icon="facebook" url="https://facebook.com" />
              <SocialIcon url="https://twitter.com" icon="twitter" />
              <SocialIcon icon="instagram" url="https://instagram.com" />
              <SocialIcon url="https://linkedin.com" icon="linkedin" />
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Ellyn Beauty SPA.
        </div>
      </footer>
    </>
  );
};

export default Service;
