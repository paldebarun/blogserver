
const Otp=require('../../models/otp');

exports.checkOtp=async (req,res,next)=>{

    try{
      
       const {otp,email}=req.body;
 
       const findOtp=await Otp.findOne({email:email}).sort({ createdAt: 'desc' });
       console.log(findOtp);
       if(!findOtp){
         res.status(400).json({
          success:false,
          message:"the otp entered is not matching"
       })
       }
        res.status(200).json({
             success:true,
             message:"the otp is matched successfully",
             otp
          });
         next();
    }
    catch(error){
 
     console.log(error);
 
     res.status(200).json({
       success:false,
       message:"an error ocurred"
    });
    }
 
 
 }