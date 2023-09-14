const jwt = require('jsonwebtoken')

//middleware funtion to verifytoken
const verifyToken = (req, res, next) =>{
    try {
     const token = req.headers['authorization'].split(' ')[1]
     if(!token)
     return res.status(403).json({message: 'Authorization header not found'})

    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, data) => {
        if(err)
          return res.status(403).json({message: 'Invalid token..'})

        // console.log(req.);
        console.log(data);
        req.userData = data;
        next();
    })
    } catch (error) {
        console.log(error.message);
    }
} 

const verifyUser = (req,res,next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1]
     if(!token)
     return res.status(403).json({message: 'Authorization header not found'})

    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, data) => {
        if(err)
          return res.status(403).json({message: 'Invalid token..'})

        // console.log(req.);
        console.log(data);
        req.userData = data;
        next()
    })
    } catch (error) {
        
    }
}

module.exports = {verifyToken, verifyUser};