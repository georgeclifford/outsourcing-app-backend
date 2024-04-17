const Regulatory = require("../models/regulatoryModel");

// New regulatory
exports.newRegulatory = async (req, res) => {
	try {
		const { thirdPartyId, description, cardNumber, nameOnCard, expirationDate, cvv, amount, date } = req.body;
		const newRegulatory = new Regulatory({
			thirdPartyId,
			description,
			cardNumber,
			nameOnCard,
			expirationDate,
			cvv,
			amount,
			date,
		});
		await newRegulatory.save();
		res.status(201).json({ message: "Regulatory Created Successfully!" });
	} catch (error) {
		console.error("Error creating regulatory:", error);
		res.status(500).json({ message: "Server Error!" });
	}
};

// Fetch all regulatories
exports.getRegulatory = async (req, res) => {
	try {
		const regulatory = await Regulatory.find();
		res.status(200).json(regulatory);
	} catch (error) {
		console.error("Error fetching tasks:", error);
		res.status(500).json({ message: "Server Error!" });
	}
};
