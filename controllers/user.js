const User = require("../models/user")
const Order = require("../models/order")

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user)
            return res.status(400).json({
                error: "No User Found "
            })
        req.profile = user;
        next();
    });
}


exports.getUser = (req, res) => {
    req.profile.salt = undefined; 
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile)
}


// exports.getAllUsers = (req, res) => {
//     User.find().exec((err, users) => {
//         if (err || !users)
//             return res.status(400).json({
//                 error : "No user found"
//             })
//         res.json(users)
//     })
// }


//updating existing user 
exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if (err || !users)
                return res.status(400).json({
                    error: "Update not successful"
                })
            user.profile.salt = undefined;
            user.profile.encry_password = undefined;
            user.profile.createdAt = undefined;
            user.profile.updatedAt = undefined;
            return res.json(user)
        }
    )
}


exports.userPurchaseList = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate("user", "__id name")
        .exec((err, order) => {
            if (err)
                return res.status(400).json(
                        {error : "No order in this account"}
                )
            return res.json(order)
        })
}


exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = []
    req.body.order.products.forEach(product => {
        purchases.push({
            __id: product._id,
            name: product.name,
            description: product.description,
            category: product._category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        })
    })
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { purchases } },
        { new: true },
        (err, purchases) => {
            if (err)
                return res.status(400).json({
                    error: "unable to save purchases"
                })
            next();
        }
    )
}