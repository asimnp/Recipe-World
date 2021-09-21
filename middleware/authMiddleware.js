const jwt = require("jsonwebtoken");

// Environment variable
require("dotenv").config();
const { SECRET_KEY } = process.env;

// To protect route
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
      if (err) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = {
  requireAuth,
};
