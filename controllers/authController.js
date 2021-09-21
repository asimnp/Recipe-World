const User = require("../models/User");

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
    res.status(201).json(user);
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
const login_post = (req, res) => {
  const { email, password } = req.body;
  res.send("User logged in");
};

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
};
