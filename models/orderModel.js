const mongoose = require('mongoose')

const orderDetails = mongoose.Schema(
    {
        orderId:{
            type: String,
            required: true
        },
        customerId:{
            type: String,
            required: true
        },
        productId:{
            type: String,
            required: true
        },
        productName:{
            type: String,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        quantity:{
            type: Number,
            required: true,
            min: 1
        },
        orderStatus:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const orderModel = mongoose.model('orderDetails',orderDetails)

module.exports = orderModel