const product = require('../models/productModel')

const deleteProduct = async(req,res) => {
    try {
        const {foodId} = req.query
        const deleteProduct = await product.findOneAndDelete(foodId)
        if(deleteProduct){
            return res.status(200).json({message: `product of id ${foodId} is deleted successfully`})
        } else {
            return res.status(404).send(`ProductId : ${foodId} is not found`)
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getAllProducts = async(req, res) => {
    try {
        const productsList = await product.find({}, {__v:0})
        const data = productsList.map((prod) => {
            const { _id, ...rest} = prod.toObject();
            return {id: _id, ...rest}
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const addProduct = async(req, res) => {
    try {
        const productDetails = req.body
        if(!productDetails){
            return res.status(404).send('Enter valid details')
        }
        await product.create(productDetails)
        res.status(200).json({success: true, message: 'Product added successfully'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {addProduct,getAllProducts,deleteProduct}