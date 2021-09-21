const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Environment variable
require("dotenv").config();
const { SECRET_KEY } = process.env;

// Handle errors
const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  // duplicate email error code
  if (err.code === 11000) {
    errors.email = "Email already taken";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

// Create JWT
const maxAge = 3 * 24 * 64 * 64;
const createToken = (id) => {
  return jwt.sign({ id }, SECRET_KEY, {
    expiresIn: maxAge,
  });
};

/*
Route: /signup
Method: GET
Access: Public
*/
const signup_get = (req, res) => {
  res.render("signup");
};

/*
Route: /signup
Method: POST
Access: Public
*/
const signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

/*
Route: /login
Method: GET
Access: Public
*/
const login_get = (req, res) => {
  res.render("login");
};

/*
Route: /login
Method: POST
Access: Public
*/
const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    res.status(400).json({ errors: err.message });
  }
};

/*
Route: /login
Method: POST
Access: Public
*/
const logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout_get,
};
