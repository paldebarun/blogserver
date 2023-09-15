const UserSchema=require('../../models/user');

exports.fetchuser=async (req,res)=>{

try{


    const {email}=req.body;

    if(!email){
        return res.status(400).json({
            success:false,
            message:"the email is necessary"
        })
    }

    const user = await UserSchema.findOne({email});

    if(!user){
        return res.status(400).json({
            success:false,
            message:"the user is not found"
        });
    }

    return res.status(200).json({
        success:true,
        message:"the user is found",
        user:user
    })

}
catch(error){


    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });


}


}