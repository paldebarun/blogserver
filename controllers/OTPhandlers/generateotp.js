const otpgenerator=require('otp-generator');
const Otp=require('../../models/otp');


exports.generateotp=async (req,res)=>{

    try{
    
      const {email}=req.body;
      console.log(email);
      var otp= otpgenerator.generate(6,{
       digits:true,
       lowerCaseAlphabets:false,
       upperCaseAlphabets:false,
       specialChars:false
      });
      console.log(otp);
      const otpalreadypresent=await Otp.findOne({otpcode:otp});
    
      while(otpalreadypresent){
        otp= otpgenerator.generate(6,{
          digits:true,
          lowerCaseAlphabets:false,
          upperCaseAlphabets:false,
          specialChars:false
         });
        
        
      }
    
      const newOtp=await Otp.create({
       otpcode:otp,
       email
      });
    
      res.status(200).json({
       success:true,
       message:"the otp is created successfully",
       otp:newOtp.otpcode
    
      });
    }
    catch(error){
       console.log(error);
       res.status(400).json({
          success:false,
          message:"the otp is not created",
          
       
         });
    
    }
    
    }