const path = require("path");
const fs = require("fs");
const EngagementRequest = require("../models/engagementRequestModel");

exports.newEngagementRequest = async (req, res) => {
	try {
		const { thirdPartyName, typeOfWork, fromDate, toDate, outsourcingType, status } = req.body;

		if (!req.file) {
			console.error("No File Submitted!");
			return res.status(400).json({ message: "No File Submitted!" });
		}

		const attachment = req.file.filename;

		const newEngagementRequest = new EngagementRequest({
			thirdPartyName,
			typeOfWork,
			fromDate,
			toDate,
			outsourcingType,
			status,
			attachment,
		});

		await newEngagementRequest.save();
		return res.status(201).json({ message: "Engagement Request Submitted Successfully!" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error!" });
	}
};

// Fetch all engagement requests
exports.getEngagementRequests = async (req, res) => {
	try {
		const engagementRequests = await EngagementRequest.find();
		res.status(200).json(engagementRequests);
	} catch (error) {
		console.error("Error fetching engagement requests:", error);
		res.status(500).json({ message: "Server Error!" });
	}
};

// Serve attachment file
exports.getAttachment = async (req, res) => {
	const attachment = req.params.attachment;
	const filePath = path.join(__dirname, "..", "uploads", attachment);

	fs.access(filePath, fs.constants.F_OK, (error) => {
		if (error) {
			console.error("Attachment not found:", error);
			res.status(404).json({ message: "Attachment Not Found!" });
			return;
		}

		res.download(filePath); // Serve the file for download
	});
};

// Approve engagement request controller function
exports.approveEngagementRequest = async (req, res) => {
	try {
		const engagementRequestId = req.params.id;
		const engagementRequest = await EngagementRequest.findById(engagementRequestId);

		if (!engagementRequest) {
			return res.status(404).json({ message: "Engagement Request Not Found!" });
		}

		engagementRequest.status = "Approved";
		await engagementRequest.save();

		return res.status(200).json({ message: "Engagement Request Approved Successfully!" });
	} catch (error) {
		console.error("Error approving engagement request:", error);
		return res.status(500).json({ message: "Server Error!" });
	}
};

// Reject engagement request controller function
exports.rejectEngagementRequest = async (req, res) => {
	try {
		const engagementRequestId = req.params.id;
		const engagementRequest = await EngagementRequest.findById(engagementRequestId);

		if (!engagementRequest) {
			return res.status(404).json({ message: "Engagement Request Not Found!" });
		}

		engagementRequest.status = "Rejected";
		await engagementRequest.save();

		return res.status(200).json({ message: "Engagement Request Approved Successfully!" });
	} catch (error) {
		console.error("Error rejecting engagement request:", error);
		return res.status(500).json({ message: "Server Error!" });
	}
};

// Renew engagement request
exports.engagementRenewal = async (req, res) => {
	try {
		const { thirdPartyName, typeOfWork, fromDate, toDate, status } = req.body;

		if (!req.file) {
			console.error("No File Submitted!");
			return res.status(400).json({ message: "No File Submitted!" });
		}

		const attachment = req.file.filename;

		const engagementRequest = await EngagementRequest.findById(req.params.id);

		if (!engagementRequest) {
			return res.status(404).json({ message: "Engagement Request Not Found!" });
		}

		engagementRequest.thirdPartyName = thirdPartyName;
		engagementRequest.typeOfWork = typeOfWork;
		engagementRequest.fromDate = fromDate;
		engagementRequest.toDate = toDate;
		engagementRequest.status = status;
		engagementRequest.attachment = attachment;

        console.log(req.params.id);
        console.log(attachment);

		await engagementRequest.save();

		return res.status(200).json({ message: "Engagement Request Renewed Successfully!" });
	} catch (error) {
		console.error("Error renewing engagement request:", error);
		return res.status(500).json({ message: "Server Error!" });
	}
};
