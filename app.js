const express  = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

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
        const orderFound = await orderDetails.findByIdAndDelete(orderId)
        console.log(orderFound);
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
        const order = req.body
        await orderDetails.insertMany(order)
        const allOrders = await orderDetails.find({})
        const modResponse = allOrders.map((doc) => {
            const {_id, ...rest} = doc.toObject();
            return {id: _id, ...rest}
        })
        res.status(200).send(modResponse)
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
        if(userFound.loginPassword != loginPassword || userFound.userType.toLowerCase() != userType.toLowerCase()){
            return res.status(401).json({messege: `You are not authorized to login. Provide valid credentials..!`})
        }
        const modResponse = {
            id: userFound._id,   
            ...userFound.toObject(),
        }
        delete modResponse._id;
        return res.status(200).json(modResponse)
        
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



