const express = require('express')
const router = express.Router()
const manageOrders = require('../controllers/orderController')
const verifyUser = require('../middleware/verifyToken')

//inserting orders
router.post('/insertOrders', manageOrders.insertOrders)

//cancelling orders
router.delete('/cancelOrders', manageOrders.cancelOrders)

module.exports = router