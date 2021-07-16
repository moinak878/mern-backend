var express = require("express");
var router = express.Router();

const {
	getProductById,
	getProduct,
	createProduct,
	photo,
	getAllProducts,
	removeProduct,
	updateProduct,
	getAllUniqueCategories,
} = require("../controllers/product");
const { isAdmin, isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("productId", getProductById);

//routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo); //optimisation
router.post(
	"/product/createProduct/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	createProduct
);
router.delete(
	"/product/:productId/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	removeProduct
);
router.put(
	"/product/createProduct/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	updateProduct
);
router.get("/product/all", getAllProducts);
router.get("/product/categories", getAllUniqueCategories);

module.exports = router;
