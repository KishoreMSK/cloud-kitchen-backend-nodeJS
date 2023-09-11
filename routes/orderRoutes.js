const express = require('express')
const router = express.Router()
const manageOrders = require('../controllers/orderController')

//inserting orders
router.post('/insertOrders', manageOrders.insertOrders)

//cancelling orders
router.delete('/cancelOrders', manageOrders.cancelOrders)

module.exports = router