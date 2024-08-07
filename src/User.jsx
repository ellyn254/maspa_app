import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { SocialIcon } from "react-social-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./user.css"; // Custom CSS file for additional styling

const User = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/user")
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:5000/user/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="user-card">
      <h2 className="header">ELLYN BEAUTY & SPA</h2>
        <p>
          The table below is a list of all our registered users. We appreciate
          your interest in registering with us and we are very delighted to have
          you as our clients.
        </p>
       
        <Link to={`/register`} className="btn btn-success mb-3">
          ADD +
        </Link>
        <Table striped bordered hover responsive="md">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((data, i) => (
              <tr key={i}>
                <td>{data.name}</td>
                <td>{data.phone}</td>
                <td>{data.email}</td>
                
                <td className="buttons">
                  <Link
                    to={`update/${data.id}`}
                    className="btn btn-primary me-2"
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => handleDelete(data.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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

export default User;
