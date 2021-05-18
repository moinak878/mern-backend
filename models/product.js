const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

var productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
    },
    description: {
        type: String,
        required: true,
        maxlength: 1000,
    },
    price: {
        type: Number,
        required: true,
        maxlength: 32,
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required:true
    },
    stock : Number,
    sold: {
        type: Number,
        defualt: 0,
    },
    photo: {
        type: Buffer,
        ContentType : String
    }

}, {timestamps:true})

module.exports=mongoose.model("Product",productSchema)