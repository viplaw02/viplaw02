const express = require('express');
require('dotenv').config();
require("./config/dbconnect").connect();

const cors = require('cors')
const user = require("./route/user")

const app = express();
const PORT = process.env.PORT||4000;

app.use(express.json());
app.use(cors("*"))
app.use('/api/v1',user);

app.get('/',(req,res)=>{
    res.send("<h1>welcome</h1>")
})



app.listen(PORT,()=>{
console.log(`server has startd at this ${PORT}`);
})