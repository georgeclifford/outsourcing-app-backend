const mongoose = require("mongoose");

const engagementRequestSchema = new mongoose.Schema({
	thirdPartyName: { type: String, required: true },
	typeOfWork: { type: String, required: true },
	fromDate: { type: Date, required: true },
	toDate: { type: Date, required: true },
	outsourcingType: { type: String, required: true },
	status: { type: String, required: true },
	attachment: {},
});

module.exports = mongoose.model("EngagementRequest", engagementRequestSchema);
