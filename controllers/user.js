const User = require("../models/user")

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
exports.updateUser = (req, res , next , id ) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if (err || !users)
                        return res.status(400).json({
                            error : "Update not successful"
                        })
            user.profile.salt = undefined; 
            user.profile.encry_password = undefined;
            user.profile.createdAt = undefined;
            user.profile.updatedAt = undefined;
            res.json(user)
        }
    )
}