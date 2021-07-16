const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

//params
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

//create
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

//read
exports.getProduct = (req, res) => {
	req.product.photo = undefined;
	return res.json(req.product);
};

//delete
exports.removeProduct = (req, res) => {
	const product = req.product;
	product.remove((err, deltedProduct) => {
		if (err)
			res.status(400).json({
				error: "Cannot delete Product",
			});
		res.json({
			message: "Product succesfully deleted",
			deltedProduct,
		});
	});
};

//update
exports.updateProduct = (req, res) => {
	const form = new formidable.IncomingForm();
	form.keepExtension = true;
	form.parse(req, (err, fields, file) => {
		if (err)
			res.status(400).json({
				error: "problem with image",
			});
		//updating product
		let product = req.product;
		product = _.extend(product, fields);
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
					error: "failed to update product",
				});
			res.json(product);
		});
	});
};

//all product list
exports.getAllProducts = (req, res) => {
	let mylimit = req.query.limit ? parseInt(req.query.limit) : 8;
	let sortBy = req.query.sortBy ? req.query.SortBy : "_id";

	Product.find()
		.select("-photo")
		.populate("category")
		.sort([[sortBy, "asc"]])
		.limit(mylimit)
		.exec((err, products) => {
			if (err)
				res.status(400).json({
					error: "No Product found",
				});
			res.json(products);
		});
};

//all categories listing
exports.getAllUniqueCategories = (req, res) => {
	Product.distinct("category", {}, (err, categories) => {
		if (err)
			res.status(400).json({
				error: "No category found",
			});
		res.json(categories);
	});
};

//middleware
exports.photo = (req, res, next) => {
	if (req.product.photo.data) {
		res.set("Content-type", req.product.photo.contentType);
		return res.send(req.product.photo.data);
		next();
	}
};

exports.updateStock = (req, res, next) => {
	let myOperations = req.body.order.products.map((product) => {
		return {
			UpdateOne: {
				filter: { _id: product._id },
				update: { $inc: { stock: -product.count, sold: +product.count } },
			},
		};
	});
	Product.bulkWrite(myOperations, {}, (err, products) => {
		if (err)
			res.status(400).json({
				error: "Bulk operation failed",
			});
		next();
	});
};
