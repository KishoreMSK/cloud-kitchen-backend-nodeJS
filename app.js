const express  = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

const login = require('./models/loginModel')
const registerUser = require('./models/registerModel')
const product = require('./models/productModel')
const orderDetails = require('./models/orderModel')

const app = express()
app.use(cors("*"));
app.use(express.json())

app.delete('/admin/deleteById/', async(req,res) => {
    try {
        const {foodId} = req.query
        const deleteProduct = await product.findOneAndDelete(foodId)
        if(deleteProduct){
            const remainingProducts = await product.find({})
            return res.status(200).json({message: `product of id ${foodId} is deleted successfully and remaining products are ${remainingProducts}`})
        } else {
            return res.status(404).send(`ProductId : ${foodId} is not found`)
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.delete('/order/cancelOrders', async(req, res) => {
    try {
        const {productName,orderId} = req.body
        const orderFound = await orderDetails.findOneAndDelete(orderId)
        if(!orderFound){
            return res.status(404).send(`Orderid: ${orderId} was not found`)
        }
        const orderItems = await orderDetails.find({})
        return res.status(200).send(`Order id: ${orderId} with the product name:${productName} is deleted successfully and the remaining orders are ${orderItems}`)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.post('/order/insertOrders', async(req, res) => {
    try {
        const order= req.body
        //to find whether the order is already exist or not
        const orderFound = await orderDetails.findOne({order})
        console.log(orderFound);
        if(orderFound){
            const {price, quantity} = others
            const updatedPrice = orderFound.price = price * quantity
            // console.log(price * quantity);
            await orderDetails.findOneAndUpdate({orderId}, {$set : {price : updatedPrice, quantity}}, {new : true})
            const updatedOrder = await orderDetails.find({orderId},{createdAt:0,updatedAt:0,__v:0})
            return res.status(200).send(`order updated successfully ${updatedOrder}`)
        } else {
            // console.log(others[0].orderStatus === 'Ordered');
            if(others[0].orderStatus === 'Ordered'){
                //..another way of inserting a document
                // const newOrder = new orderDetails({
                //     orderId,
                //     ...others
                // })
                // await newOrder.save()
                await orderDetails.create({orderId,...others})
                const createdOrder = await orderDetails.findOne({orderId},{ createdAt:0, updatedAt:0, __v:0})
                return res.status(200).json(`Order created successfully with ${createdOrder}`)
           } else {
               return res.status(400).json({message: `invalid orderstatus found`})
           }
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.get('/admin/getAll', async(req, res) => {
    try {
        const productsList = await product.find({})
        res.status(200).json(productsList)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.post('/admin/insert', async(req, res) => {
    try {
        const productDetails = req.body
        if(!productDetails){
            return res.status(404).send('Enter valid details')
        }
        const products = await product.create(productDetails)
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Login user 
app.post('/validateUser', async(req, res) => {
    try {
        const {email , loginPassword, userType} = req.body
        const userFound = await registerUser.findOne({email})
        console.log(userFound.userType.toLowerCase() != userType.toLowerCase());
        if(userFound.loginPassword != loginPassword || userFound.userType.toLowerCase() != userType.toLowerCase()){
            return res.status(401).json({messege: `You are not authorized to login. Provide valid credentials..!`})
        }
        return res.status(200).json(true)
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//register user details
app.post('/createUser',async( req, res) => {
    try {
        const userDetails = req.body
        console.log(userDetails);
        if(!userDetails){
            return res.status(404).send('Enter valid details')
        }
        const user = await registerUser.create(userDetails)
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

mongoose.connect('mongodb://0.0.0.0:27017/cloud-kitchen')
.then(() => {
    console.log('connected to mongodb successfully');
    app.listen(5001, () => {
        console.log('Server started in port 5001');
    })
})
.catch((error) => {
    console.log('in error '+error);
})



