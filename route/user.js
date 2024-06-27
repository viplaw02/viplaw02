const express = require('express');
const router = express.Router();
const{login,signup}=require("../controller/Auth");
const {auth,isStudent,isAdmin}= require("../middleware/auth");
const{verify} = require("../controller/verify");
const {dd} = require("../controller/decode");
const { decode } = require('jsonwebtoken');

router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        Message:"welcome in test protected route"
    })
})
router.get("/verify",verify,(req,res)=>{
    res.json({
   success:true,
   Message:" welecome to this route"
    });
});
router.post("/decode",dd,(req,res)=>{
    res.json({
 Success:true,
    })
})
router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        Message:"welcome in student protected route"
    })
})
router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        Message:"welcome in admin protected route"
    })
})
router.post('/login',login);
router.post('/signup',signup);
module.exports = router;
