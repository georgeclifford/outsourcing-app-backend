const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registrationController");
const signInController = require("../controllers/signInController");
const userController = require("../controllers/userController");

// Register route
router.post("/register", registrationController.register);

// Login route
router.post("/login", signInController.login);

// Route to get all users
router.get("/users", userController.getAllUsers);
router.put("/users/:id", userController.updateUserRole);
router.put("/users/:id/activate", userController.activateUser);
router.put("/users/:id/deactivate", userController.deactivateUser);

module.exports = router;
