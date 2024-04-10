const express = require("express");
const router = express.Router();
const multer = require("multer");

const registrationController = require("../controllers/registrationController");
const signInController = require("../controllers/signInController");
const userController = require("../controllers/userController");
const engagementRequestController = require("../controllers/engagementRequestController");

// Register route
router.post("/register", registrationController.register);

// Login route
router.post("/login", signInController.login);

// User routes
router.get("/users", userController.getAllUsers);
router.put("/users/:id", userController.updateUserRole);
router.put("/users/:id/activate", userController.activateUser);
router.put("/users/:id/deactivate", userController.deactivateUser);

// Engagement Request routes

const storage = multer.diskStorage({
	destination: "../uploads",
	filename: function (req, file, cb) {
		cb(null, "Attachment" + Date.now() + file.originalname);
	},
});

const upload = multer({
	storage: storage,
	limits: { fileSize: 1000000 },
});

router.post(
	"/new-engagement-request",
	upload.single("file"),
	engagementRequestController.newEngagementRequest
);

module.exports = router;
