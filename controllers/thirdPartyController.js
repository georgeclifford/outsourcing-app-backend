const ThirdParty = require("../models/thirdPartyModel");

// New third party
exports.newThirdParty = async (req, res) => {
	try {
		const {
			thirdPartyId,
			email,
			addressDetails,
			typeOfServiceProvider,
			accessToCriticalData,
			status,
		} = req.body;

		const newThirdParty = new ThirdParty({
			thirdPartyId,
			email,
			addressDetails,
			typeOfServiceProvider,
			accessToCriticalData,
			status,
		});
		await newThirdParty.save();
		res.status(201).json({ message: "Third Party Created Successfully!" });
	} catch (error) {
		console.error("Error creating third party:", error);
		res.status(500).json({ message: "Server Error!" });
	}
};

// Fetch all third party
exports.getThirdParty = async (req, res) => {
	try {
		const thirdParty = await ThirdParty.find();
		res.status(200).json(thirdParty);
	} catch (error) {
		console.error("Error fetching third party:", error);
		res.status(500).json({ message: "Server Error!" });
	}
};

// Edit Third Party
exports.editThirdParty = async (req, res) => {
	try {
		const { email, addressDetails, typeOfServiceProvider, accessToCriticalData } = req.body;

		const id = req.params.id;

		const thirdParty = await ThirdParty.findById(id);

		if (!thirdParty) {
			return res.status(404).json({ message: "Third Party Not Found!" });
		}

		thirdParty.email = email;
		thirdParty.addressDetails = addressDetails;
		thirdParty.typeOfServiceProvider = typeOfServiceProvider;
		thirdParty.accessToCriticalData = accessToCriticalData;

		await thirdParty.save();

		return res.status(200).json({ message: "Third Party Edited Successfully!" });
	} catch (error) {
		console.error("Error editing third party request:", error);
		return res.status(500).json({ message: "Server Error!" });
	}
};

// Controller function to activate third party
exports.activateThirdParty = async (req, res) => {
	const thirdPartyId = req.params.id;
	try {
		const thirdParty = await ThirdParty.findById(thirdPartyId);
		if (!thirdParty) {
			return res.status(404).json({ message: "Third Party not found" });
		}

		thirdParty.status = "Active";
		await thirdParty.save();
		res.status(200).json({ message: "Third Party Activated!" });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Server Error!" });
	}
};

// Controller function to activate third party
exports.deactivateThirdParty = async (req, res) => {
	const thirdPartyId = req.params.id;
	try {
		const thirdParty = await ThirdParty.findById(thirdPartyId);
		if (!thirdParty) {
			return res.status(404).json({ message: "Third Party not found" });
		}

		thirdParty.status = "Inactive";
		await thirdParty.save();
		res.status(200).json({ message: "Third Party Deactivated!" });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Server Error!" });
	}
};
