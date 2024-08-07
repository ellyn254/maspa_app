import "./about.css";
import bgimage from "./images/bg.jpg";
import "bootstrap-icons/font/bootstrap-icons.css";
import { SocialIcon } from "react-social-icons";
import { Link } from "react-router-dom";
import React from "react";
import {
  Row,
  Col,
  Card,
} from "react-bootstrap";
import manimage from './assets/manicure.jpg';
import pedimage from './assets/pedicure.jpg';
import massimage from './assets/massage.jpg';
import facialimage from './assets/facial.jpg';
import salonimage from './assets/salon.jpg';
import yogaimage from './assets/yoga.jpg';

const About = () => {

  const services = [
    { id: 1, name: "Massage", icon: <img src={massimage} alt="Background" className="image"/> },
    { id: 2, name: "Pedicure", icon: <img src={pedimage} alt="Background" className="image"/> },
    { id: 3, name: "Manicure", icon: <img src={manimage} alt="Background" className="image"/> },
    { id: 4, name: "Facial", icon: <img src={facialimage} alt="Background" className="image"/> },
    { id: 5, name: "Salon", icon: <img src={salonimage} alt="Background" className="image"/>},
    { id: 6, name: "Yoga", icon: <img src={yogaimage} alt="Background" className="image"/> },
  ];
  
  return (
    <>
    <div className="route">
    <Link to="/home" className="route" >Home</Link> /
    <Link to="/about" className="route" >About US</Link>
    </div>
     
        <img src={bgimage} alt="Background" className="spaimage" />
       
        <div className="information">
          <h1>About Us</h1>
          <p>
            DM Interior Studio was established with the purpose of delivering of
            Total interior design services in Sri Lanka.Our portfolio ranges
            from commercial interior design in Sri Lanka, residential interior
            design, industrial and recreational spaces alike. Since our launch,
            we have been always on the lookout to improvise our creativity
            through innovation. We offer some of the best of the class designs
            and layouts for interior designing projects Our creations are often
            unique just for the client’s taste.
          </p>
          <ul>
            <li>Design blended with architecture.</li>
            <li>Quality of the overall experience.</li>
            <li>Excellent service and support.</li>
          </ul>
          <p>
            These three philosophies are some of the fundamental pillars of our
            success today. We believe that with a great design that has an
            exceptional quality of experience with a strong service and support
            is critical.These three are the most important elements of our
            strong and proven relationship with some of the major brands.
          </p>
          <h1>Our Specialty</h1>
          <p>
            Unlike many in the industry, we have possessed knowledge and skills
            of architecture in designing our interior designs in Sri Lanka. This
            provides us the edge to have a broad understanding on how to bring
            creativity and sophistication together. Our knowledge and skills in
            quantity surveying, MEP and project management gives our clients
            additional confidence to rely on us. Thus we can make sure that the
            client doesn’t have to redo/renovate the interior partly or
            completely.
          </p>
        </div>
      
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
      <div>
        <h2>Our Services</h2>
        <Row className="service-container">
          {services.map((service) => (
            <Col key={service.id} sm={6} md={4} className="mb-4">
              <Card>
                <Card.Body className="text-center">
                  <div style={{ fontSize: "2rem" }}>{service.icon}</div>
                  <Card.Title>{service.name}</Card.Title>
                  <Link to="/services" className="booking" >
                    Read more
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
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
            <SocialIcon icon="facebook" url="https://facebook.com" style={{ height: 25, width: 25 }} />
              <SocialIcon url="https://twitter.com" icon="twitter" style={{ height: 25, width: 25 }}/>
              <SocialIcon icon="instagram" url="https://instagram.com" style={{ height: 25, width: 25 }} />
              <SocialIcon url="https://linkedin.com" icon="linkedin" style={{ height: 25, width: 25 }} />
              <SocialIcon url="https://email.com" icon="email" style={{ height: 25, width: 25 }}/>
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

export default About;
