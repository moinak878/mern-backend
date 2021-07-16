const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
	Product.findById(id)
		.populate("category")
		.exec((err, product) => {
			if (err || !product)
				res.status(400).json({
					error: "Product not found",
				});
			req.product = product;
			next();
		});
};

exports.createProduct = (req, res) => {
	const form = new formidable.IncomingForm();
	form.keepExtension = true;
	form.parse(req, (err, fields, file) => {
		if (err)
			res.status(400).json({
				error: "problem with image",
			});
		//destructuring the fields
		const { name, description, price, category, stock } = fields;
		//restrictions on field
		if (!name || !description || !price || !category || !stock)
			res.status(400).json({ error: "Please enter all fields" });
		let product = new Product(fields);
		//handle file
		if (file.photo) {
			if (file.photo.size > 3000000)
				return res.status(400).json({
					error: "File size too big ",
				});
			product.photo.data = fs.readFileSync(file.photo.path);
			product.photo.contentType = file.photo.type;
		}
		//save to db
		product.save((err, product) => {
			if (err)
				res.status(400).json({
					error: "saving product in DB failed ",
				});
			res.json(product);
		});
	});
};
