const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const verifyToken = require('../middleware/verifyToken')

router.delete('/deleteById', adminController.deleteProduct)

router.get('/getAll', adminController.getAllProducts)

router.post('/insert', adminController.addProduct)

module.exports = router