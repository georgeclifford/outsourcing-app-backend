const path = require("path");
const fs = require("fs");
const SLA = require("../models/slaModel");

// New SLA
exports.newSLA = async (req, res) => {
	try {
		if (!req.file) {
			console.error("No File Submitted!");
			return res.status(400).json({ message: "No File Submitted!" });
		}

		const thirdPartyId = req.params.id;

		const existingSLA = await SLA.findOne({ thirdPartyId });
		if (existingSLA) {
			existingSLA.status = "Pending";
			existingSLA.sla = req.file.filename;
			await existingSLA.save();
		} else {
			const newSLA = new SLA({
				thirdPartyId: req.params.id,
				status: "Pending",
				sla: req.file.filename,
			});
			await newSLA.save();
		}

		res.status(201).json({ message: "SLA Added Successfully!" });
	} catch (error) {
		console.error("Error adding SLA:", error);
		res.status(500).json({ message: "Server Error!" });
	}
};

// Fetch all SLAs
exports.getSLA = async (req, res) => {
	try {
		const sla = await SLA.find();
		res.status(200).json(sla);
	} catch (error) {
		console.error("Error fetching SLAs:", error);
		res.status(500).json({ message: "Server Error!" });
	}
};

// Serve SLA file
exports.downloadSLA = async (req, res) => {
	const sla = req.params.sla;
	const filePath = path.join(__dirname, "..", "uploads", sla);

	fs.access(filePath, fs.constants.F_OK, (error) => {
		if (error) {
			console.error("SLA not found:", error);
			res.status(404).json({ message: "SLA Not Found!" });
			return;
		}

		res.download(filePath); // Serve the file for download
	});
};

// Review engagement request controller function
exports.reviewSLA = async (req, res) => {
	try {
		const slaId = req.params.id;
		const sla = await SLA.findById(slaId);

		if (!sla) {
			return res.status(404).json({ message: "SLA Not Found!" });
		}

		sla.status = "Reviewed";
		await sla.save();

		return res.status(200).json({ message: "SLA Reviewed Successfully!" });
	} catch (error) {
		console.error("Error Reviewing SLA:", error);
		return res.status(500).json({ message: "Server Error!" });
	}
};

// Approve engagement request controller function
exports.approveSLA = async (req, res) => {
	try {
		const slaId = req.params.id;
		const sla = await SLA.findById(slaId);

		if (!sla) {
			return res.status(404).json({ message: "SLA Not Found!" });
		}

		sla.status = "Approved";
		await sla.save();

		return res.status(200).json({ message: "SLA Approved Successfully!" });
	} catch (error) {
		console.error("Error Approving SLA:", error);
		return res.status(500).json({ message: "Server Error!" });
	}
};

// Reject engagement request controller function
exports.rejectSLA = async (req, res) => {
	try {
		const slaId = req.params.id;
		const sla = await SLA.findById(slaId);

		if (!sla) {
			return res.status(404).json({ message: "SLA Not Found!" });
		}

		sla.status = "Rejected";
		await sla.save();

		return res.status(200).json({ message: "SLA Rejected Successfully!" });
	} catch (error) {
		console.error("Error Rejecting SLA:", error);
		return res.status(500).json({ message: "Server Error!" });
	}
};
