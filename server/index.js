/* server.js */
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const saltRounds = 10;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(cookieParser());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "register_db",
});

app.get("/user", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Error fetching user data" });
    } else {
      res.send(result);
    }
  });
});

app.post("/register", (req, res) => {
  const { username, email, password, termsAgreed } = req.body;

  if (!username || !email || !password || !termsAgreed) {
    res.status(400).json({
      message:
        "Please provide all necessary information and accept the terms and conditions",
    });
    return;
  }

  db.query(
    "SELECT * FROM users WHERE username = ? OR email = ?",
    [username, email],
    (error, results) => {
      if (error) {
        res.status(500).json({ message: "Error checking user account" });
        return;
      }

      if (results.length > 0) {
        res.status(409).json({ message: "Username or Email already in use" });
        return;
      }

      bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
          res.status(500).json({ message: "Error creating user account" });
          return;
        }

        db.query(
          "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
          [username, email, hashedPassword],
          (error, results) => {
            if (error) {
              res.status(500).json({ message: "Error creating user account" });
            } else {
              res.status(201).json({ message: "Registration successful" });
            }
          } 
        );
      });
    }
  ); 
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, data) => {
      if (err)
        return res.status(500).json({ message: "Login error in server" });
      if (data.length > 0) {
        bcrypt.compare(password, data[0].password, (err, response) => {
          if (err)
            return res.status(500).json({ message: "Login error in server" });
          if (response) {
            const userData = {
              profile: data[0].profile,
              username: data[0].username,
              email: data[0].email,
              point: data[0].point,
              urole: data[0].urole,
              create_at: data[0].create_at,
            };
            res
              .status(200)
              .json({ user: userData, message: "Login successful" });
          } else {
            return res.status(401).json({ message: "Incorrect password" });
          }
        });
      } else {
        return res.status(404).json({ message: "Username not found" });
      }
    }
  );
});

app.listen(3001, () => {
  console.log(`Server is running...`);
});
