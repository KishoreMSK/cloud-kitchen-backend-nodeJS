const express  = require('express')
const mongoose = require('mongoose')
const login = require('./models/loginModel')
const register = require('./models/registerModel')
const product = require('./models/productModel')

const app = express()

app.use(express.json())


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

app.post('/createUser',async( req, res) => {
    try {
        const userDetails = req.body
        // console.log(userDetails.userType.toLowerCase() === 'customer');
        // if(userDetails.phoneNo.length != 10 || userDetails.userType.toLowerCase() != 'customer'){
        if(!userDetails){
            return res.status(404).send('Enter valid details')
        }
        const user = await register.create(userDetails)
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.post('/validateUser', async(req, res) => {
    try {
        const loginDetails = req.body
        if(!loginDetails){
            return res.status(404).send('No login details found')
        }
        const checkLogin = await login.create(loginDetails)
        res.status(200).send(checkLogin)
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



