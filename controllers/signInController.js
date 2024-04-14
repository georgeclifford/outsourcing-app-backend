const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
	const { username, password } = req.body;
	try {
		// Find user in database
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(401).json({ message: "Invalid Username or Password!" });
		}

		if (user.status === "Inactive") {
			return res.status(401).json({ message: "Invalid Username or Password!" });
		}

		// Compare passwords
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return res.status(401).json({ message: "Invalid Username or Password!" });
		}

		// Send user data
		res.status(200).json({
			message: "Successfully Logged In!",
			user_id: user._id,
			department: user.department,
			user_role: user.user_role,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error!" });
	}
};
