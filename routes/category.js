var express = require('express')
var router = express.Router()
const { getCategoryById,createCategory } = require('../controllers/category')
const { isAdmin,isAuthenticated,isSignedIn } = require('../controllers/auth')
const { getUserById } = require('../controllers/user')

router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

router.post("category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory)


module.exports = router;