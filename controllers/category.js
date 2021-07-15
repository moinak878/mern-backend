const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
	Category.findById(id).exec((err, category) => {
		if (err || !category)
			return res.status(400).json({
				error: "Category not found",
			});
		req.category = category;
		next();
	});
};

//create
exports.createCategory = (req, res) => {
	const category = new Category(req.body);
	category.save((err, category) => {
		if (err || !category)
			return res.status(400).json({
				error: "Not able to save category in DB",
			});
		res.json({ category });
	});
};

//read
exports.getCategory = (req, res) => {
	return res.json(req.category);
};

exports.getAllCategories = (req, res) => {
	Category.find().exec((err, categories) => {
		if (err || !categories)
			return res.status(400).json({
				error: "No category found",
			});
		res.json(categories);
	});
};

//update
exports.updateCategory = (req, res) => {
	const category = req.category;
	category.name = req.body.name;
	category.save((err, updatedCategory) => {
		if (err || !updatedCategory)
			return res.status(400).json({
				error: "Failed to update category",
			});
		res.json(updatedCategory);
	});
};

//delete
exports.removeCategory = (req, res) => {
	const category = req.category;
	category.remove((err, category) => {
		if (err || !category)
			return res.status(400).json({
				error: "Failed to delete category",
			});
		res.json({
			message: `Deletion Successful ${category}`,
		});
	});
};
