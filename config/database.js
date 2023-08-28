const mongoose=require('mongoose');
require('dotenv').config();


exports.database= ()=>{
       //connecting database
        mongoose.connect(process.env.DATABASE_URL,{

            useUnifiedTopology:true,
            useNewUrlParser:true
        }).then(()=>{
            console.log("the database is connected");
        }).catch((error)=>{
            console.log("an error has occured : ",error);
            process.exit(1);
        });
    
    
}