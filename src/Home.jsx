
import React from "react";
import "./about.css";
import bgimage from "./images/bg.jpg";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
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
//CONTACT PAGE IMPORTS
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./contact.css";

const Home = () => {

  const services = [
    { id: 1, name: "Massage", icon: <img src={massimage} alt="Background" className="image"/> },
    { id: 2, name: "Pedicure", icon: <img src={pedimage} alt="Background" className="image"/> },
    { id: 3, name: "Manicure", icon: <img src={manimage} alt="Background" className="image"/> },
    { id: 4, name: "Facial", icon: <img src={facialimage} alt="Background" className="image"/> },
    { id: 5, name: "Salon", icon: <img src={salonimage} alt="Background" className="image"/>},
    { id: 6, name: "Yoga", icon: <img src={yogaimage} alt="Background" className="image"/> },
  ];

  const [values, setValues] = useState({
    email: "",
    message: "",
  });
  const [storedEmails, setStoredEmails] = useState([]);

  useEffect(() => {
    // Fetch stored emails from the backend
    axios
      .get("http://localhost:5000/email")
      .then((response) => {
        setStoredEmails(response.data.map((item) => item.email));
      })
      .catch((error) => {
        console.error("Error fetching emails:", error);
      });
  }, []);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the entered email is valid
    if (storedEmails.includes(values.email)) {
      // Send message to the backend
      axios
        .post("http://localhost:5000/contact", values)
        .then((response) => {
          console.log(response.data);
          alert("Message sent successfully");
          // Clear form fields
          setValues({
            email: "",
            message: "",
          });
        })
        .catch((error) => {
          console.error("Email duplicate entry", error);
          alert("Error sending the mmessage duplicate entry for email");
          //clear the for fields
          setValues({
            email: "",
          });
        });
    } else {
      alert("Please register with us first.");
      navigate("/register");
    }
  };

  return (
    <>
                                                             {/* HOME PAGE */}
      <div className="App">
       WELCOME TO ELLYNBEAUTYSPA WE VALUE ELEGANCY AND CLASSY.
      </div>

                                                         {/* ABOUT PAGE */}
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

                                                           {/* CONTACT PAGE */}
                                                           <div className="route">
    <Link to="/home" className="route" >Home</Link> /
    <Link to="/contact" className="route" >Contact US</Link>
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

      </>
  );
};

export default Home;
