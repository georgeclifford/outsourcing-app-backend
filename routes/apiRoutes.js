const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const registrationController = require("../controllers/registrationController");
const signInController = require("../controllers/signInController");
const userController = require("../controllers/userController");
const engagementRequestController = require("../controllers/engagementRequestController");

const storage = multer.diskStorage({
	destination: path.join(__dirname, "..", "uploads"),
	filename: function (req, file, cb) {
		cb(null, "attachment" + Date.now() + file.originalname);
	},
});

const upload = multer({
	storage: storage,
	limits: { fileSize: 1000000 },
});

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
router.post("/new-engagement-request", upload.single("file"), engagementRequestController.newEngagementRequest);
router.get("/get-engagement-requests", engagementRequestController.getEngagementRequests);
router.get("/attachments/:attachment", engagementRequestController.getAttachment);
router.put("/engagement-requests/:id/approve", engagementRequestController.approveEngagementRequest);
router.put("/engagement-requests/:id/reject", engagementRequestController.rejectEngagementRequest);
router.put("/engagement-renewal/:id", upload.single("file"), engagementRequestController.engagementRenewal);
router.put("/sla-upload/:id", upload.single("file"), engagementRequestController.slaUpload);
router.get("/sla-download/:sla", engagementRequestController.getSLA);

module.exports = router;
