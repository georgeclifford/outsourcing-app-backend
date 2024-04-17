const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const registrationController = require("../controllers/registrationController");
const signInController = require("../controllers/signInController");
const userController = require("../controllers/userController");
const cardController = require("../controllers/cardController");
const engagementRequestController = require("../controllers/engagementRequestController");
const slaController = require("../controllers/slaController");
const thirdPartyController = require("../controllers/thirdPartyController");
const taskController = require("../controllers/taskController");
const riskAssessmentController = require("../controllers/riskAssessmentController");
const performanceController = require("../controllers/performanceController");
const regulatoryController = require("../controllers/regulatoryController");

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

// Card routes
router.get("/get-cards", cardController.getCards);
router.post("/update-cards", cardController.updateCards);

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
router.put("/sla-comment/:id", slaController.commentSLA);
router.get("/download-sla/:sla", slaController.downloadSLA);
router.put("/sla/:id/review", slaController.reviewSLA);
router.put("/sla/:id/approve", slaController.approveSLA);
router.put("/sla/:id/reject", slaController.rejectSLA);

// Third Party routes
router.post("/new-third-party", thirdPartyController.newThirdParty);
router.get("/get-third-party", thirdPartyController.getThirdParty);
router.put("/third-party/:id/activate", thirdPartyController.activateThirdParty);
router.put("/third-party/:id/deactivate", thirdPartyController.deactivateThirdParty);
router.put("/edit-third-party/:id", thirdPartyController.editThirdParty);

// Task routes
router.post("/new-task", taskController.newTask);
router.get("/get-tasks", taskController.getTasks);
router.put("/tasks/:id/complete", taskController.completeTask);

// Risk Assessment routes
router.post("/new-risk-assessment", riskAssessmentController.newRiskAssessment);
router.get("/get-risk-assessment", riskAssessmentController.getRiskAssessment);
router.put("/risk-assessment/:id/resolve", riskAssessmentController.resolveRiskAssessment);
router.put("/risk-assessment/:id/unresolvable", riskAssessmentController.unresolvableRiskAssessment);

// Performance routes
router.post("/add-performance", performanceController.addPerformance);
router.get("/get-performance", performanceController.getPerformance);

// Regulatory routes
router.post("/new-regulatory", regulatoryController.newRegulatory);
router.get("/get-regulatory", regulatoryController.getRegulatory);

module.exports = router;
