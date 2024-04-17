const mongoose = require("mongoose");

const thirdPartySchema = new mongoose.Schema({
	thirdPartyId: { type: mongoose.Schema.Types.ObjectId, ref: "EngagementRequest" },
	email: { type: String, required: true },
	addressDetails: { type: String, required: true },
	typeOfServiceProvider: { type: String, required: true },
	accessToCriticalData: { type: String, required: true },
	status: { type: String, required: true },
});

module.exports = mongoose.model("ThirdParty", thirdPartySchema);
