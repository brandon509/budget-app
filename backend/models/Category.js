const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		budget: {
			type: Number,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		split: {
			type: Number,
			default: 1,
			min: 0.01,
			max: 1,
		},
		type: {
			type: String,
			required: true,
		},
		active: {
			type: Boolean,
			default: true,
		},
		deactivationDate: {
			type: Date,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
