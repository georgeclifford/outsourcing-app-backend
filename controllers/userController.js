const User = require("../models/userModel");

// Controller function to get all users
exports.getAllUsers = async (req, res) => {
	try {
		// Fetch all users from the database
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ message: "Server Error" });
	}
};

// Controller function to update user_role
exports.updateUserRole = async (req, res) => {
	const userId = req.params.id;
	const { user_role } = req.body;
	try {
		const user = await User.findByIdAndUpdate(userId, { user_role }, { new: true });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json({ message: "User Role Updated Successfully!", user });
	} catch (error) {
		console.error("Error updating user role:", error);
		res.status(500).json({ message: "Server Error" });
	}
};

// Controller function to activate a user
exports.activateUser = async (req, res) => {
	const userId = req.params.id;
	try {
		// Find the user by ID
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		// Update user status to Active
		user.status = "Active";
		await user.save();
		res.status(200).json({ message: "User Activated Successfully!" });
	} catch (error) {
		console.error("Error activating user:", error);
		res.status(500).json({ message: "Server Error" });
	}
};

// Controller function to deactivate a user
exports.deactivateUser = async (req, res) => {
	const userId = req.params.id;
	try {
		// Find the user by ID
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		// Update user status to Inactive
		user.status = "Inactive";
		await user.save();
		res.status(200).json({ message: "User Deactivated Successfully!" });
	} catch (error) {
		console.error("Error deactivating user:", error);
		res.status(500).json({ message: "Server Error" });
	}
};
