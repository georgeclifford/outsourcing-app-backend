const mongoose = require("mongoose");

const performanceSchema = new mongoose.Schema({
	thirdPartyId: { type: mongoose.Schema.Types.ObjectId, ref: "EngagementRequest" },
	performanceArea: { type: String, required: true },
	date: { type: Date, required: true },
	rating: { type: String, required: true },
	comments: { type: String, required: true },
});

module.exports = mongoose.model("Performance", performanceSchema);
