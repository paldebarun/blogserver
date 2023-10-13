const replySchema=require('../../models/reply');
const commentschema=require('../../models/comments');

exports.createreply=async (req,res)=>{

try{
  
    const {user_id,body,comment_id}=req.body;

    const replyobj=new replySchema({
        user_id,body,comment_id
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