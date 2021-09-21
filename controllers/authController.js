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
const signup_post = (req, res) => {
  const { email, password } = req.body;
  res.send("New user created");
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
