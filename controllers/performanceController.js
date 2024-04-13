const Performance = require("../models/performanceModel");

// New performance
exports.addPerformance = async (req, res) => {
	try {
		const { thirdPartyId, performanceArea, date, rating, comments } = req.body;
		const addPerformance = new Performance({
			thirdPartyId,
			performanceArea,
			date,
			rating,
			comments,
		});
		await addPerformance.save();
		res.status(201).json({ message: "Performance Added Successfully!" });
	} catch (error) {
		console.error("Error adding performance:", error);
		res.status(500).json({ message: "Server Error!" });
	}
};

// Fetch all performances
exports.getPerformance = async (req, res) => {
	try {
		const performance = await Performance.find();
		res.status(200).json(performance);
	} catch (error) {
		console.error("Error fetching performances:", error);
		res.status(500).json({ message: "Server Error!" });
	}
};
