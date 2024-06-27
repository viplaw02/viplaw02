const jwt  = require("jsonwebtoken");
const User = require("../model/userschema");
const dotenv = require('dotenv').config();
exports.verify = async (req,res)=>{
    try {
    const token = req.headers.authorization;
     if(!token){
        return res.status(401).json({
          success:false,
          message:"token is missing"
        })
     }
 const decode= jwt.verify(token,dotenv.JWT_SECRET,);
 console.log(decode);
 if (!decode) {
    return res.status(401).json({
        success: false,
        message: "Token could not be decoded"
    });
}
      const{name,email,role} = decode;
      const isuser = await User.findOne({email});
      if(!isuser){
        return res.status(404).json({
            success:false,
            message:"user not found"
        });
       }
 else{
    return res.status(200).json({
    success:true,
    // isuser:{
    // name,
    // email,
    // role
    // }
    });
 }
    } catch (error) {
        return res.status(401).json({
            success:false,
            Message:"Unauthorized access"
        })
    }
}