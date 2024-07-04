const express = require("express"); //the server
const cors = require("cors"); //the use of 'app.methods' middleware
const mysql = require("mysql"); //the db
const data = require("./products.json"); //json file or data
const jwt = require("jsonwebtoken"); //to generate a token
const cookieParser = require("cookie-parser"); //used to store generated token
const bcrypt = require("bcrypt"); //used to hash the password
const saltRounds = 10;

const app = express(); //this is the locally hosting server for this application
app.use(express.json()); //used to pass data to payload
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"], //make sure it is localhost to be able to display cookies.
    methods: ["POST, GET, PUT, DELETE"],
    credentials: true,
  })
);

//MySQL connection configuration
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ellyn@2024",
  database: "spa",
});

// ***************************************************Connect to MySQL*********************************************************
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

//*********************** */ Endpoint to fetch stored email from MySQL ******PERFORM THE CONTACT API LOGIC**************************
app.get("/email", (req, res) => {
  db.query("SELECT email FROM clients", (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// ****************************************CONTACT Endpoint to submit messages to MySQL***************************************
app.post("/contact", (req, res) => {
  const { email, message } = req.body;
  // Perform validation and insertion into the database
  db.query(
    "INSERT INTO messages (email, message) VALUES (?, ?)",
    [email, message],
    (error, results) => {
      if (error) throw error;
      res.send("Message sent successfully");
    }
  );
});

//*********************************************FETCH API***************************************************
app.get("/user", (req, res) => {
  const sql = "SELECT * FROM clients";
  db.query(sql, (err, data) => {
    if (err) return res.json("Error has occured");
    return res.json(data);
  });
});

//********************************* REGISTER API using Express.js ****************************************************

app.post("/register", (req, res) => {
  const { name, phone, email, password, confirmPassword } = req.body;

  if (!name || !phone || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  const sql =
    "INSERT INTO clients (`name`, `phone`, `email`, `password`) VALUES (?)";
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) return res.status(500).json({ error: "Error hashing password" });
    const values = [name, phone, email, hash];
    db.query(sql, [values], (err, result) => {
      if (err) {
        console.error("Error inserting record into database:", err);
        return res.status(500).json({ error: "Database error" });
      }

      res.status(200).json({ message: "Record inserted successfully" });
    });
  });
});
//**************************** create an authenticated protected route ******************************

// create the function verifyUser
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ Error: "You are not Authenticated" });
  } else {
    //verify the token, secretkey, function
    jwt.verify(token, "our-jsonwebtoken-secret-key", (err, decoded) => {
      if (err) {
        return res.status(403).json({ Error: "Forbidden, token not ok" });
      } else {
        //decode the name
        req.name = decoded.name;
        next();
      }
    });
  }
};
app.get("/verify", verifyUser, (req, res) => {
  return res.json({ Status: "Success", name: req.name });
});

//***************************************** LOGIN API ******************************************************
app.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "SELECT * FROM clients WHERE email = ?";
  db.query(sql, [email], (err, data) => {
    if (err) return res.status(500).json({ error: "Login error in server" });

    if (data.length > 0) {
      bcrypt.compare(password, data[0].password, (err, response) => {
        if (err) return res.json({ error: "Password compare error" });
        if (response) {
          const name = data[0].name;
          const token = jwt.sign({ name }, "our-jsonwebtoken-secret-key", {
            expiresIn: "1d",
          });
          res.cookie("token", token, { httpOnly: true });
          return res.json({ Status: "Login success" });
        } else {
          return res.status(401).json({ error: "Invalid credentials" });
        }
      });
    } else {
      return res.status(404).json({ error: "Email does not exist" });
    }
  });
});
// ********************************LOGOUT API ENDPOINT*******************************
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

// ***********************UPDATE API ENDPOINT *********************************************
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { name, phone, email, password, confirmPassword } = req.body;

  if (!name || !phone || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) return res.status(500).json({ error: "Error hashing password" });

    const query =
      "UPDATE clients SET name=?, phone=?, email=?, password=? WHERE id=?";
    db.query(query, [name, phone, email, hash, id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(200).json({ message: "User updated successfully" });
    });
  });
});
//*************************************************** DELETE API ******************************************************************
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
