const mongoose = require("mongoose");

const regulatorySchema = new mongoose.Schema({
	thirdPartyId: { type: mongoose.Schema.Types.ObjectId, ref: "EngagementRequest" },
    description: { type: String, required: true },
	cardNumber: { type: String, required: true },
	nameOnCard: { type: String, required: true },
	expirationDate: { type: Date, required: true },
	cvv: { type: String, required: true },
    amount: { type: String, required: true },
    date: { type: Date, required: true },
});

module.exports = mongoose.model("Regulatory", regulatorySchema);
