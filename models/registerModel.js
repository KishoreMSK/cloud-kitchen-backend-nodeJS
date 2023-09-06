const mongoose = require('mongoose')

const user = mongoose.Schema(
    {
        userName: {
            type: String,
            required: true
        },
        phoneNo: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        userType: {
            type: String,
            required: true,
            default: "Customer"
        },
        loginPassword: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const registerUser = mongoose.model('RegisterUserDetails',user);

module.exports = registerUser;