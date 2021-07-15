const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const productCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: { type: Number },
    price: { type: Number }
})

const ProductCart=mongoose.model("ProductCart",productCartSchema)

var orderSchema = new mongoose.Schema({
    products: [productCartSchema],
    transaction_id: {},
    amount: Number,
    address: String,
    updated: Date,
    user: {
        type: ObjectId,
        ref : "User"
    }
}, {timestamps:true})

const Order = mongoose.model("Order", orderSchema)


module.exports = {Order,ProductCart}