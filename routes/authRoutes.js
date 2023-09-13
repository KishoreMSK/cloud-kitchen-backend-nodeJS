const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

//Login user 
router.post('/',authController.validateUser)

//register user details
router.post('/user', authController.createUser)

module.exports = router