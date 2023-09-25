const commentSchema=require('../../models/comments');
const blogSchema=require('../../models/blog');
const UserSchema=require('../../models/user');
const mongoose = require('mongoose');


exports.addcomments=async (req,res)=>{

    try{

        const {email,id,body}=req.body;
        console.log("these are the credentials",email,id,body);

        const user=await UserSchema.findOne({email});

        const blogId = new mongoose.Types.ObjectId(id);

        if(!user){
            return res.status(400).json({
                success:false,
                message:"the user is not found"
            })
        }

        const blog=await blogSchema.findById(blogId);

        if(!blog){
            return res.status(400).json({
                success:false,
                message:"the blog is not found"
            })
        }

        const commentobj=new commentSchema({
            user_id:user._id,
            autherName:user.autherName,
            blog_id:id,
            comment_body:body.comment
        });

        console.log("user name : ",user.autherName);

        if(!commentobj){
            return res.status(400).json({
                success:false,
                message:"the comment obj is not formed"
            });
        }

        const savedcomment=await commentobj.save();

        if(!savedcomment){
          


            return res.status(400).json({
                success:false,
                message:"the comment is not saved"
            });
        }
        
        blog.comments.push(savedcomment._id);

        
        await blog.save();



        return res.status(200).json({
            success:true,
            message:"the comment is successfully posted"
        });

      


    }
    catch(error){
     
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });


    }



}

