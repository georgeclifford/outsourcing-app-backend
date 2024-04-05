const bcrypt = require("bcrypt");

// Hash password
exports.hashPassword = async (password) => {
	const hashedPassword = await bcrypt.hash(password, 10);
	return hashedPassword;
};
