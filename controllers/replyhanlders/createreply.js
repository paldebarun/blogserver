const replySchema=require('../../models/reply');
const commentschema=require('../../models/comments');
const mongoose=require('mongoose');
const UserSchema=require('../../models/user');

exports.createreply=async (req,res)=>{

try{
  
    const {user_id,body,comment_id}=req.body;

    const userid=new mongoose.Types.ObjectId(user_id);
    const user=await UserSchema.findById({userid});

   
    const replyobj=new replySchema({
        user_id,body,comment_id,autherName:user.autherName
    });

    const savedreply=await replyobj.save();

    if(!savedreply){
        return res.status(404).json({
            success:false,
            message:"the reply couldn't be saved"
        });
    }
    const comment = await commentschema.findById(comment_id);
        comment.replies.push(savedreply._id);
        await comment.save();


    return res.status(200).json({
        success:true,
        message:"the reply is successfully posted"
    })



}
catch(error){

    return res.status(400).json({
        success:false,
        message:"there was an error while creating the reply"
    })
}


}