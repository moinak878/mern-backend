var express = require("express");
var router = express.Router();

const {getProductById,createProduct} = require("../controllers/product");
const {isAdmin,isSignedIn,isAuthenticated} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("productId", getProductById);

//routes
router.post("/product/createProduct/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct)

module.exports = router;
