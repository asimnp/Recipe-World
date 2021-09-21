const express = require("express");
const mongoose = require("mongoose");

// Setup environment variable
require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_NAME, PORT } = process.env;

// Initialize express
const app = express();

// Template engine
app.set("view engine", "ejs");

// Setup static directory
app.use(express.static("public"));

// Database connection
const dbURI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.5j45t.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI)
  .then((result) => app.listen(PORT, () => console.log(`Listening ${PORT}`)))
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
