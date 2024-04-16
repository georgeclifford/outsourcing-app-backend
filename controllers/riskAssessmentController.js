const RiskAssessment = require("../models/riskAssessmentModel");

// New RiskAssessment
exports.newRiskAssessment = async (req, res) => {
	try {
		const { thirdPartyId, description, mitigationStrategy, status } = req.body;
		const newRiskAssessment = new RiskAssessment({
			thirdPartyId,
			description,
			mitigationStrategy,
			status,
		});
		await newRiskAssessment.save();
		res.status(201).json({ message: "Risk Assessment Created Successfully!" });
	} catch (error) {
		console.error("Error creating risk assessment:", error);
		res.status(500).json({ message: "Server Error!" });
	}
};

// Fetch all RiskAssessments
exports.getRiskAssessment = async (req, res) => {
	try {
		const riskAssessments = await RiskAssessment.find();
		res.status(200).json(riskAssessments);
	} catch (error) {
		console.error("Error fetching risk assessments:", error);
		res.status(500).json({ message: "Server Error!" });
	}
};

// Controller function to resolve Risk Assessment
exports.resolveRiskAssessment = async (req, res) => {
	const riskAssessmentId = req.params.id;
	try {
		// Find the user by ID
		const riskAssessment = await RiskAssessment.findById(riskAssessmentId);
		if (!riskAssessment) {
			return res.status(404).json({ message: "Risk Assessment not found" });
		}
		// Update user status to Active
		riskAssessment.status = "Resolved";
		await riskAssessment.save();
		res.status(200).json({ message: "Risk Resolved!" });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Server Error!" });
	}
};

// Controller function unresolvable Risk Assessment
exports.unresolvableRiskAssessment = async (req, res) => {
	const riskAssessmentId = req.params.id;
	try {
		// Find the user by ID
		const riskAssessment = await RiskAssessment.findById(riskAssessmentId);
		if (!riskAssessment) {
			return res.status(404).json({ message: "Risk Assessment not found" });
		}
		// Update user status to Active
		riskAssessment.status = "Unresolvable";
		await riskAssessment.save();
		res.status(200).json({ message: "Risk Unresolvable!" });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Server Error!" });
	}
};