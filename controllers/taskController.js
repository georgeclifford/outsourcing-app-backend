const Task = require("../models/taskModel");

// New task
exports.newTask = async (req, res) => {
	try {
		const { thirdPartyId, description, assignTo, priority, dueDate, status } = req.body;
		const newTask = new Task({
			thirdPartyId,
			description,
			assignTo,
			priority,
			dueDate,
			status,
		});
		await newTask.save();
		res.status(201).json({ message: "Task Created Successfully!" });
	} catch (error) {
		console.error("Error creating task:", error);
		res.status(500).json({ message: "Server Error!" });
	}
};

// Fetch all tasks
exports.getTasks = async (req, res) => {
	try {
		const tasks = await Task.find();
		res.status(200).json(tasks);
	} catch (error) {
		console.error("Error fetching tasks:", error);
		res.status(500).json({ message: "Server Error!" });
	}
};

// Controller function to complete task
exports.completeTask = async (req, res) => {
	const taskId = req.params.id;
	try {
		// Find the user by ID
		const task = await Task.findById(taskId);
		if (!task) {
			return res.status(404).json({ message: "Task not found" });
		}
		// Update user status to Active
		task.status = "Completed";
		await task.save();
		res.status(200).json({ message: "Task Completed!" });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Server Error!" });
	}
};