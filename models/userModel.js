const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	department: { type: String, required: true },
	user_role: { type: String, required: true }, // admin, business_controller, business_requestor
	status: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
