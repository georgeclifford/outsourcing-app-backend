const mongoose = require("mongoose");

const riskAssessmentSchema = new mongoose.Schema({
	thirdPartyId: { type: mongoose.Schema.Types.ObjectId, ref: "EngagementRequest" },
	description: { type: String, required: true },
	mitigationStrategy: { type: String, required: true },
	status: { type: String, required: true },
});

module.exports = mongoose.model("RiskAssessment", riskAssessmentSchema);
