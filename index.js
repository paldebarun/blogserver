const express=require('express');
const app=express();
const cors = require('cors');
//connecting database

require('./config/database').database();
require('dotenv').config();

const { router } = require('./routes/routes'); // Make sure the path is correct
app.use(cors({
    credentials : true,
    origin:true
}));

const fileupload = require("express-fileupload");

app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

app.use(express.json());


app.use('/api/v1', router);

const PORT = process.env.PORT || 4000;




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/',(req,res)=>{
    res.send("hello");
})