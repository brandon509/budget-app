const Investment = require("../models/Investment");

module.exports = {
	get: async (req, res) => {
		try {
			const investments = await Investment.find({ user: req.user.id }).populate("investmentType");

			res.json({ investments });
		} catch (error) {
			console.log(error);
		}
	},
	new: async (req, res) => {
		try {
			const investment = await Investment.create({
				ticker: req.body.investment.ticker,
				percentage: req.body.investment.percentage,
				investmentType: req.body.investment.investmentType,
				user: req.user.id,
			});

			res.json({ investment });
		} catch (error) {
			console.log(error);
		}
	},
	update: async (req, res) => {
		try {
			let changes = {};
			if (req.body.ticker) {
				changes["ticker"] = req.body.ticker;
			}
			if (req.body.percentage) {
				changes["percentage"] = req.body.percentage;
			}
			if (req.body.investmentType) {
				changes["investmentType"] = req.body.investmentType;
			}

			console.log(changes);

			await Investment.findByIdAndUpdate(req.body.id, changes);
			const investment = await Investment.findById(req.body.id).populate("investmentType");

			res.json(investment);
		} catch (error) {
			console.log(error);
		}
	},
	delete: async (req, res) => {
		try {
			const investment = await Investment.findByIdAndDelete(req.query.id);
			res.status(200).json(req.query.id);
		} catch (error) {
			console.log(error);
		}
	},
};
