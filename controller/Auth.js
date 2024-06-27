const User = require('../model/userschema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({
                success: false,
                message: "already customer exits"
            })
        }
        let hashedpassword;
        try {
            hashedpassword = await bcrypt.hash(password, 10);
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "error in hashing"
            })
        }
        const newUser = await User.create({
            name, email, password: hashedpassword, role
        });
        return res.status(200).json({
            success: true,
            Data: newUser,
            message: "successfully submitted"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "user cannot be registerd"
        })
    }
}
//login

exports.login = async (req, res) => {
    console.log("Someone is requestin this route")
    
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Filled data",
                status: false
            });
        }

        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return res.status(401).json({
                success: false,
                message: "User not registered"
            });
        }

        const payload = {
            email: foundUser.email,
            id: foundUser._id,
            role: foundUser.role,
        };

        if (await bcrypt.compare(password, foundUser.password)) {
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2m"
            });
            res.cookie("jwt",token,{
                expires: new Date(0), 
                httpOnly:true,
            });
            const { _id, email, role } = foundUser; // Destructuring to get required fields // Create user object without password
           
          return  res.status(200).json({
                success: true,
                token,
                message: "Successfully logged in",
            });

        } else {
            return res.status(403).json({
                success: false,
                message: "Password not matched"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Message failure"
        });
    }
};
