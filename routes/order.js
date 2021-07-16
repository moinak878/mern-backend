var express = require("express");
var router = express.Router();

const {
	getOrderById,
	createOrder,
	getAllOrders,
	getOrderStatus,
	updateOrderStatus,
} = require("../controllers/order");
const { isAdmin, isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");

//params
router.param("orderId", getOrderById);
//routes
router.get(
	"/order/all/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	getAllOrders
);
router.post(
	"/order/create/:userId",
	isSignedIn,
	isAuthenticated,
	pushOrderInPurchaseList,
	updateStock,
	createOrder
);

router.get(
	"/order/status/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	getOrderStatus
);
router.put(
	"/order/:orderId/status/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	updateOrderStatus
);

module.exports = router;
