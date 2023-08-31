const mongoose=require('mongoose');
const nodemailer=require('nodemailer');

const UserSchema=new mongoose.Schema({

    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    autherName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
    },
   
    password:{
        type:String,
        require:true
    },

    job:{
      type:String,
      require:true
    },
    country:{
     type:String,
     require:true
    },
    blogs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blog'
    }
    ],
    profile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'profile'
    }

    
});

UserSchema.post('save',async function(doc){

    try{
        console.log("DOC",doc)

   
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        //send mail 
        let info = await transporter.sendMail({
            from:`Debarun Pal`,
            to: doc.email,
            subject: "User registration",
            html:`<h2>Hello !</h2> <br/> <p> user - " ${doc.firstName} ${doc.lastName} " has been registered successfully</p> <br/> <p> thank you for your participation <p/>`,
        })
        
        console.log("INFO", info);


    }
    catch(error) {
        console.error(error);
    }

})


module.exports=mongoose.model('UserSchema',UserSchema);