const registerUser = require('../models/registerModel')

const validateUser = async(req, res) => {
    try {
        const {email , loginPassword, userType} = req.body
        const userFound = await registerUser.findOne({email})
        if(userFound.loginPassword != loginPassword || userFound.userType.toLowerCase() != userType.toLowerCase()){
            return res.status(401).json({messege: `You are not authorized to login. Provide valid credentials..!`})
        }
        //use this to change in a single object
        const data = {
            id: userFound._id,   
            ...userFound.toObject(),
        }
        delete data._id;
        return res.status(200).json({success: true,...data})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const createUser = async(req, res) => {
    try {
        const userDetails = req.body
        console.log(userDetails.phoneNo);
        if(!userDetails){
            return res.status(404).send('Enter valid details')
        }
        const user = await registerUser.create(userDetails)
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {validateUser, createUser};