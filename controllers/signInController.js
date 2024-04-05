const User = require("../models/userModel");

exports.login = async (req, res) => {
	const { username, password } = req.body;
	try {
		// Find user in database
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(401).json({ message: "Invalid Username or Password!" });
		}
		// Send user data
		res.status(200).json({ user_id: user._id, user_type: user.user_type });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error!" });
	}
};
