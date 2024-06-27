const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
exports.auth = (req,res,next)=>{
    try{
   const token = req.headers.authorization;
   console.log(token);
   if(!token){
    return res.status(401).json({
        success:false,
        message:"token missing"
    });
   }
   try{
    const decode = jwt.verify(token.split(" ")[1],process.env.JWT_SECRET);
    console.log(decode);
    req.user = decode;
   }catch(err){
    return res.status(401).json({
        success:false,
        message:"token is invalid"
    });
   }
  next();

    }catch(err){
        console.log(err)
        return res.status(401).json({
            success:false,
            message:"somthing went wrong"
        });

    }
}

//isstudent
exports.isStudent=(req,res,next)=>{
    try{
        if(req.user.role!='Student'){
            return res.status(401).json({
                success:false,
                message:"this is protected route for student"
            });
        }
        next();
    }catch(err){
  return res.status(401).json({
   success:false,
   message:"user role not matching"
  });
    }

}
// admin
exports.isAdmin = (req,res,next)=>{
    try{
        if(req.user.role!='Admin'){
            return res.status(401).json({
                success:false,
                message:"this is protected route for admin"
            });
        }
        next();
    }catch(err){
  return res.status(401).json({
   success:false,
   message:"user role not matching"
  });
    }

}
