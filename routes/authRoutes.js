const router = require("express").Router();

const authController = require("../controllers/authController");

/*
Route: /signup
Method: GET
Access: Public
*/
router.get("/signup", authController.signup_get);

/*
Route: /signup
Method: POST
Access: Public
*/
router.post("/signup", authController.signup_post);

/*
Route: /login
Method: GET
Access: Public
*/
router.get("/login", authController.login_get);

/*
Route: /login
Method: POST
Access: Public
*/
router.post("/login", authController.login_post);

module.export = router;
