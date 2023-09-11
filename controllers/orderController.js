const orderDetails = require('../models/orderModel')
const productDetails = require('../models/productModel')
    const insertOrders = async(req, res) => {
        try {
            const order = req.body
            await orderDetails.insertMany(order)
            // const allOrders = await orderDetails.find({})
            //use this to change in array of objects
            // const modResponse = allOrders.map((doc) => {
            //     const {_id, ...rest} = doc.toObject();
            //     return {id: _id, ...rest}
            // })
            const productId =  order.map(item => item.productId)
            console.log(order , productId);
            const productFound = await productDetails.findById(productId)
            const newStockCount = Number(productFound.stockCount) - Number(order.quantity)
            console.log(newStockCount);
            // await productDetails.findOneAndUpdate(order.productId, {$set: {stockCount: stockCount-order.quantity}},{new: true})
            // res.status(200).json({success: true,message:'Order created succseefully..!'})
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }
    
    const cancelOrders = async(req, res) => {
        try {
            const {productName,orderId} = req.body
            const orderFound = await orderDetails.findByIdAndDelete(orderId)
            console.log(orderFound);
            if(!orderFound){
                return res.status(404).send(`Orderid: ${orderId} was not found`)
            }
            return res.status(200).send(`Order id: ${orderId} with the product name:${productName} is deleted successfully`)
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }


module.exports = {insertOrders,cancelOrders};
