const registerUser = require('../models/registerModel')
const bcrypt = require('bcrypt')
const validateUser = async(req, res) => {
    try {
        const {email , loginPassword, userType} = req.body
        const userFound = await registerUser.findOne({email},{__v:0,createdAt:0,updatedAt:0})
        
        if(!userFound){
           return res.status(404).json({message: `Emailid not found..try another..`})
        }
        const checkPassword = await bcrypt.compare(loginPassword,userFound.loginPassword);
        console.log(userFound.loginPassword);
        console.log(loginPassword)
        if (!checkPassword || userFound.userType.toLowerCase() != userType.toLowerCase()) {
          return res
            .status(401)
            .json({ messege: `You are not authorized to login. Check your password and usertype..!`});
        }
        //use this to change in a single object
        const data = {
          id: userFound._id,
          ...userFound.toObject(),
        };
        delete data._id;
        return res.status(200).json({ success: true, ...data });
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const createUser = async(req, res) => {
    try {
        const userDetails = req.body
        // console.log(userDetails.phoneNo);
        if(!userDetails){
            return res.status(404).send('Enter valid details')
        }
        // 1-way of creating salt and then adding it to the password
        // const salt = await bcrypt.genSalt(10);
        // const hashPassword = await bcrypt.hash(userDetails.loginPassword , salt)

        //Another way-- Auto generate the salt and add to the password
        const hashPassword = await bcrypt.hash(userDetails.loginPassword, 10)
        console.log(userDetails.loginPassword);
        console.log(hashPassword);
        userDetails.loginPassword = hashPassword
        console.log(userDetails);
        const user = await registerUser.create(userDetails)
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {validateUser, createUser};