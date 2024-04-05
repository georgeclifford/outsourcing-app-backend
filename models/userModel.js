const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	user_type: { type: String, required: true }, // admin, business_controller, business_requestor
});

// Hash password before saving
userSchema.pre("save", async function (next) {
	try {
		if (!this.isModified("password")) {
			return next();
		}
		const hashedPassword = await bcrypt.hash(this.password, 10);
		this.password = hashedPassword;
		next();
	} catch (error) {
		next(error);
	}
});

module.exports = mongoose.model("User", userSchema);
