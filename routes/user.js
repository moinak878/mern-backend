const express = require("express")
const router = express.Router()
const { getUserById, getUser } = require("../controllers/user")
const { isSignedIn, isAdmin, isAuthenticated, updateUser } = require("../controllers/auth")

router.param("userId", getUserById)

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser)

router.put("/user/:userid", isSignedIn, isAuthenticated, updateUser)

router.get("/order/user/:userid",isSignedIn, isAuthenticated,userPurchaseList)

module.exports = router;