const EngagementRequest = require("../models/engagementRequestModel");

exports.newEngagementRequest = async (req, res) => {
	try {
		console.log("Request: ", req.body);
		console.log("Request file: ", req.file);

		const { thirdPartyName, typeOfWork, fromDate, toDate, outsourcingType, status } = req.body;

		if (!req.file) {
			console.error("No File Submitted!");
			return res.status(400).json({ message: "No File Submitted!" });
		}

		const newEngagementRequest = new EngagementRequest({
			thirdPartyName,
			typeOfWork,
			fromDate,
			toDate,
			outsourcingType,
			status,
			attachment: {
				filename: req.file.filename, // Extract filename from multer
				path: req.file.path, // Extract path from multer
			},
		});

		await newEngagementRequest.save();
		return res.status(201).json({ message: "Engagement Request Submitted Successfully!" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error!" });
	}
};
