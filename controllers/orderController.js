const orderDetails = require('../models/orderModel')
const productDetails = require('../models/productModel')

    const insertOrders = async(req, res) => {
        try {
            const order = req.body
            await orderDetails.insertMany(order)
            // console.log(order);
            // const allOrders = await orderDetails.find({})
            //use this to change in array of objects
            // const modResponse = allOrders.map((doc) => {
            //     const {_id, ...rest} = doc.toObject();
            //     return {id: _id, ...rest}
            // })
            const updatedProducts = [];
            for (const orderItem of order) {
              const { productId, quantity } = orderItem;
            // using custom method for finding
            //   const nameFound = await productDetails.findByFoodName(productName)
            //   console.log(nameFound);

              const updatedProduct = await productDetails.findOneAndUpdate(
                { _id: productId },
                { $inc: { stockCount: -quantity } },
                // { runValidators: true} // will check for the validation mention in the schema.. otherwise it will update the value regardless of the validation in schema
                { new: true }
              );
            //   console.log(updatedProduct);
              if (updatedProduct) {
                updatedProducts.push(updatedProduct);
              }
            }
            res.status(200).json({success: true,message:'Order created successfully..!'})
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
            return res.status(200).json({success: true,message:`Order id: ${orderId} with the product name:${productName} is deleted successfully`})
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }

module.exports = {insertOrders,cancelOrders};
