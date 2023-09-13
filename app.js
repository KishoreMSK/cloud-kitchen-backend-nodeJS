const express  = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

const auth = require('./routes/authRoutes')
const orderRoutes = require('./routes/orderRoutes')
const adminRoutes = require('./routes/adminRoutes')
const app = express()
app.use(cors("*"));
app.use(express.json())

app.use('/validateUser',auth)
app.use('/create',auth)
app.use('/order',orderRoutes)
app.use('/admin',adminRoutes)


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



