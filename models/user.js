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

        const emailTemplate = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>User Registration</title>
                <style>
                    
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }

                    @media screen and (max-width: 320px) {
                        
                        .container {
                            width: 100% !important;
                        }
                      
                    }

                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 5px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    }
                    h2 {
                        color: #333;
                    }
                    p {
                        color: #777;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Hello!</h2>
                    <p>User - ${doc.firstName} ${doc.lastName} has been registered successfully.</p>
                    <p>Thank you for your participation.</p>
                </div>
            </body>
            </html>
        `;

        //send mail 
        let info = await transporter.sendMail({
            from: `Debarun Pal`,
            to: doc.email,
            subject: "User Registration",
            html: emailTemplate,
        });

        console.log("INFO", info);

    } catch (error) {
        console.error(error);
    }
})

module.exports = mongoose.model('UserSchema', UserSchema);