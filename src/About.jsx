import "./about.css";
import bgimage from "./images/bg.jpg";
import "bootstrap-icons/font/bootstrap-icons.css";
import { SocialIcon } from "react-social-icons";
import { Link } from "react-router-dom";

import React from "react";

const About = () => {
  return (
    <>
      <div className="container">
        <img src={bgimage} alt="" className="image" />
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
          <p>
            We understand that every client has a unique requirement in
            constructing their interior spaces. That it can have personalized
            choices which not everyone satisfies altogether. That is why we have
            our services range from interior design only service, interior
            construction only and the entire interior designing and construction
            projects as well. This gives us the opportunity to be able to offer
            flexibility to our clients based on the conveniences of their
            requirement. Whatever we do, we believe in three fundamental values
            that we will never compromise no matter what service we provide.
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
      </div>
      <div className="lowerdiv">
        <p className="text">
          These are our feedbacks from esteemed customers. <br />
          Allan Kheyt, customer
        </p>
        <div className="div">
          <Link to={`/contact`} className="button">
            TALK TO US
          </Link>
        </div>
      </div>
      {/* *************************************************************************************** */}
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
          &copy; {new Date().getFullYear()} Ellyn Beauty SPA. All rights
          reserved.
        </div>
      </footer>
    </>
  );
};

export default About;
