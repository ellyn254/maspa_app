//index.js

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const data = require("./products.json");

const app = express();
app.use(express.json()); //used to pass data to payload
app.use(cors());

const secretKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huZG9lIiwiaWF0IjoxNjg0NDg4NjYzfQ.v2MNdqsxtYjwHnrcwno3tTc-g64u1piVdEpCsRNNz4w";

//MySQL connection configuration
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ellyn@2024",
  database: "spa"
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});
// REST API to get all products details at once
// With this api the frontend will only get the data
// The frontend cannot modify or update the data
// Because we are only using the GET method here.

app.get("/api/products", (req, res) => {
  res.json(data);
});

// Endpoint to fetch stored email from MySQL ******PERFORM THE CONTACT API LOGIC**********
app.get('/email', (req, res) => {
	db.query('SELECT email FROM clients', (error, results) => {
	  if (error) throw error;
	  res.json(results);
	});
  });
  
  // Endpoint to submit messages to MySQL
  app.post('/contact', (req, res) => {
	const { email, message } = req.body;
	// Perform validation and insertion into the database
	db.query('INSERT INTO messages (email, message) VALUES (?, ?)', [email, message], (error, results) => {
	  if (error) throw error;
	  res.send('Message sent successfully');
	});
  });

//FETCH API
app.get("/", (req, res) => {
  const sql = "SELECT * FROM clients";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
});

// REGISTER API using Express.js
app.post("/register", (req, res) => {
  const { name, phone, email, password, confirmPassword } = req.body;

  // Check if any of the required fields are empty
  if (!name || !phone || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Create SQL statement to insert data into the database
  const sql =
    "INSERT INTO clients (`name`, `phone`, `email`, `password`, `confirmPassword`) VALUES (?)";
  const values = [name, phone, email, password, confirmPassword];

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error("Error inserting record into the database:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while inserting data" });
    }
    console.log("Record inserted successfully");
    return res.status(200).json({ message: "Record inserted successfully" });
  });
});

//LOGIN API
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  // Check if any of the required fields are empty
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const sql = "SELECT * FROM clients WHERE `email` = ? AND `password` = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (data.length > 0) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });
});

// Update user route
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { name, phone, email, password, confirmPassword } = req.body;

  // Check for empty fields
  if (!name || !phone || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  // Update user in the database
  const query =
    "UPDATE clients SET name=?, phone=?, email=?, password=? WHERE id=?";
  db.query(query, [name, phone, email, password, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json({ message: "User updated successfully" });
  });
});

//DELETE API
app.delete("/user/:id", (req, res) => {
  //create sql statements
  const sql = "DELETE FROM clients WHERE id = ?";

  //to get the id we write the below code
  const id = req.params.id;
  db.query(sql, [id], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
