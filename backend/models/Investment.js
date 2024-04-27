const mongoose = require("mongoose");

const InvestmentSchema = new mongoose.Schema(
	{
		ticker: {
			type: String,
			required: true,
		},
		percentage: {
			type: Number,
			required: true,
			min: 0.01,
			max: 1,
		},
		investmentType: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Investment", InvestmentSchema);
