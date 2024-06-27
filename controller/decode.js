const jwt = require("jsonwebtoken");
const User = require("../model/userschema");
const dotenv = require('dotenv').config();
exports.dd = async (req,res)=>{
    try {
        console.log("data:: ",req.body);
        const token = req.body.data;
        console.log(process.env.JWT_SECRET);   
        console.log("token ::",token.token);   
        const decode= jwt.verify(token.token,process.env.JWT_SECRET);
        if(!decode){
            return res.status(401).json({
                success:false,
                Message:"found error while decoding"
            })
        }
        else{
             return res.status(200).json({
                role:decode?.role,
                email:decode?.email,
                status:true

             })
            
        }

    } catch (error) {
        console.log(error);
      return res.status(401).json({
        success:false
      })
}
}
