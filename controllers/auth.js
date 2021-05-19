const User = require('../models/user')


exports.signup = (req, res) => {
    // console.log("REQ BODY",req.body);
    // res.json({
    //     message : " Signup route works "
    // })

    //save the user in db
    const user = new User(req.body)
    user.save((err,user) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to save user in db "
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id : user._id
        })
    })

}

exports.signout = (req, res) => {
    //res.send('user signout success')
    res.json({
        message : " User Signout "
    })
}
