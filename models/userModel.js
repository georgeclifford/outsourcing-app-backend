const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	user_type: { type: String, required: true }, // admin, business_controller, business_requestor
});

module.exports = mongoose.model("User", userSchema);
