const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const registrationController = require("../controllers/registrationController");
const signInController = require("../controllers/signInController");
const userController = require("../controllers/userController");
const engagementRequestController = require("../controllers/engagementRequestController");
const slaController = require("../controllers/slaController");
const taskController = require("../controllers/taskController");

const storage = multer.diskStorage({
	destination: path.join(__dirname, "..", "uploads"),
	filename: function (req, file, cb) {
		cb(null, "file" + Date.now() + file.originalname);
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
router.put("/engagement-requests/:id/review", engagementRequestController.reviewEngagementRequest);
router.put("/engagement-requests/:id/approve", engagementRequestController.approveEngagementRequest);
router.put("/engagement-requests/:id/reject", engagementRequestController.rejectEngagementRequest);
router.put("/engagement-renewal/:id", upload.single("file"), engagementRequestController.engagementRenewal);

// SLA routes
router.put("/new-sla/:id", upload.single("file"), slaController.newSLA);
router.get("/get-sla", slaController.getSLA);
router.get("/download-sla/:sla", slaController.downloadSLA);
router.put("/sla/:id/review", slaController.reviewSLA);
router.put("/sla/:id/approve", slaController.approveSLA);
router.put("/sla/:id/reject", slaController.rejectSLA);

// Task routes
router.post("/new-task", taskController.newTask);
router.get("/get-tasks", taskController.getTasks);
router.put("/tasks/:id/complete", taskController.completeTask);

module.exports = router;
