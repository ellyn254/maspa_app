import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CssFiles/user.css"; // Custom CSS file for additional styling

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
    </>
  );
};

export default User;
