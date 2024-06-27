const mongoose = require('mongoose');
require('dotenv').config();
exports.connect = ()=>{
    mongoose.connect(process.env.MONGOOSE_URL)
    .then(()=>console.log("db successfully connected"))
    .catch((err)=>{
    console.log("some error has occurred");
    console.log(err);
    process.exit(1);
    });
}