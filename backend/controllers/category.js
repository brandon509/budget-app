const Category = require("../models/Category");
const validator = require("validator");

module.exports = {
	get: async (req, res) => {
		try {
			let { year, month } = req.query;
			month++;
			const date = new Date(year, month, 1, -5, 0, 0);

			const categories = await Category.find({ user: req.user.id });

			const activeCategories = categories.filter((x) => x.active);
			const currentCategories = categories.filter((x) => (x.deactivationDate > date && x.createdAt < date) || (x.createdAt < date && x.active));

			const currentDate = new Date();
			let isCurrentDate = false;

			if (req.query.year > currentDate.getFullYear()) {
				isCurrentDate = true;
			} else if (req.query.year == currentDate.getFullYear() && req.query.month >= currentDate.getMonth()) {
				isCurrentDate = true;
			}

			res.status(200).json({ activeCategories, currentCategories, isCurrentDate });
		} catch (error) {
			console.log(error);
		}
	},
	new: async (req, res) => {
		try {
			let category = await Category.create({
				name: req.body.category.name,
				budget: req.body.category.budget,
				user: req.user.id,
				split: req.body.category.split,
				type: req.body.category.type,
			});

			res.status(200).json({ category });
		} catch (error) {
			console.log(error);
		}
	},
	delete: async (req, res) => {
		try {
			await Category.updateOne({ _id: req.body.id }, { active: false, deactivationDate: new Date() });
			res.status(200).json({ id: req.body.id });
		} catch (error) {
			console.log(error);
		}
	},
	update: async (req, res) => {
		try {
			let changes = {};
			if (req.body.name) {
				changes["name"] = req.body.name;
			}
			if (req.body.split) {
				changes["split"] = req.body.split;
			}
			if (req.body.budget) {
				changes["budget"] = req.body.budget;
			}
			if (req.body.type) {
				changes["type"] = req.body.type;
			}

			await Category.updateOne({ _id: req.body.id }, changes);
			const category = await Category.findById(req.body.id);

			res.status(200).json(category);
		} catch (error) {
			console.log(error);
		}
	},
};
