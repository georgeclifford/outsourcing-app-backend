const mongoose = require("mongoose");

const slaSchema = new mongoose.Schema({
	thirdPartyId: { type: mongoose.Schema.Types.ObjectId, ref: "EngagementRequest" },
    status: { type: String, required: true },
    sla: { type: String },
});

module.exports = mongoose.model("SLA", slaSchema);
