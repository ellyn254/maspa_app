/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from './CssFiles/Logout.module.css';
import { useState } from "react";


const Logout = ({ onLogout }) => {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  axios.defaults.withCredentials = true;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/verify", {
          headers: {
            Authorization: `our-jsonwebtoken-secret-key`,
          },
        });
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          console.log(res.data.Error);
        }
      } catch (err) {
        console.log(err);
        setMessage("You are not authenticated"); // or any other user-friendly message
      }
    };
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.get("http://localhost:5000/logout");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <div className={styles.container}>
      {auth ? (
        <div>
          <h3>You are Authorized --- {name}</h3>
          <button className={styles.btnDanger} onClick={handleDelete}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h3>{message}</h3>
          <h3>Login Now</h3>
          <Link to={`/`} className={styles.btnPrimary}>
            Login
          </Link>
        </div>
      )}
    </div>
    </>
  );
};

export default Logout;
