const User = require("../models/userModel");
const { hashPassword } = require("../utils/passwordUtils");

exports.register = async (req, res) => {
	const { username, password, user_type } = req.body;
	try {
		// Check if the username already exists
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ message: "Username Already Exists!" });
		}

		// Hash the password
		const hashedPassword = await hashPassword(password);

		// Create a new user object
		const newUser = new User({
			username,
			password: hashedPassword,
			user_type,
		});

		// Save the user to the database
		await newUser.save();

		res.status(201).json({ message: "User Registered Successfully!" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error!" });
	}
};
