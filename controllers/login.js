const UserSchema=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

require('dotenv').config();

exports.login=async(req,res)=>{

try{
// data is fetched
const {email,password}=req.body;
//data is matched
const User=await UserSchema.findOne({email});
// if the user is not present

if (!User) {
    return res.status(404).json({
      success: false,
      message: "The user is not registered",
    });
  }
  
  if (!await bcrypt.compare(password, User.password)) {
    return res.status(401).json({
      success: false,
      message: "The password doesn't match",
    });
  }
  
  const payload = {
    email: User.email,
    password: password,
  };
  
  let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
  
  const userWithToken = User.toObject();
  userWithToken.token = token;
  
  return res.status(200).json({
    success: true,
    message: "The user is successfully logged in",
    user: userWithToken,
  });
  
 
  

}
catch(error){
// error is handled
    return res.status(400).json({
        success:false,
        message:"there was an error in logging in"
    });

}
}