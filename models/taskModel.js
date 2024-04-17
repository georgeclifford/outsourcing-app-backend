const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	thirdPartyId: { type: mongoose.Schema.Types.ObjectId, ref: "EngagementRequest" },
	description: { type: String, required: true },
	assignToDepartment: { type: String, required: true },
	assignToRole: { type: String, required: true },
	priority: { type: String, required: true },
	dueDate: { type: Date, required: true },
	status: { type: String, required: true },
});

module.exports = mongoose.model("Task", taskSchema);
