const mongoose = require('mongoose')

const loginSchema = mongoose.Schema(
        {
            emailId:{
                type: String,
                required: true
            },
            password:{
                type: String,
                required: true
            },
            userType:{
                type: String,
                required: true
            }
        },
        {
            timestamps: true
        }
)

const loginModel = mongoose.model('LoginDetails',loginSchema)

module.exports = loginModel;