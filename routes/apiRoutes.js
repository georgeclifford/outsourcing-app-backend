const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registrationController");
const signInController = require("../controllers/signInController");

// Register route
router.post("/register", registrationController.register);

// Login route
router.post("/login", signInController.login);

module.exports = router;
