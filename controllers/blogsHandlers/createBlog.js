const blogSchema=require('../../models/blog');
const UserSchema = require('../../models/user');

exports.createblog=async (req,res)=>{
try{


const {email,name,heading,auther,content,category,tags}=req.body;

if (!email || !name || !heading || !auther || !content || !category ) {
    return res.status(400).json({
        success: false,
        message: "Fill all the fields correctly"
    });
}
const prototypeblog= new blogSchema({
    name,heading,auther,content,tags,category
});

const redundent1=await blogSchema.findOne({name:name});

if(redundent1){
    return res.status(400).json({
        success:false,
        message:"change the name of the blog , it has already be taken"
    });
}

const redundent2=await blogSchema.findOne({heading:heading});

if(redundent2){
    return res.status(400).json({
        success:false,
        message:"change the heading of the blog , it has already be taken"
    });
}

const redundent3=await blogSchema.findOne({content:content});

if(redundent3){
    return res.status(400).json({
        success:false,
        message:"change the content of the blog , it has already be taken"
    });
}



const savedblog=await prototypeblog.save();

const updatedUser = await UserSchema.findOneAndUpdate(
    { email },
    { $push: { blogs: savedblog._id } },
    { new: true }

);

if(savedblog){
    return res.status(200).json({
        success:true,
        message:"blog created successfully",
        blog:savedblog,
        updatedUser:updatedUser
    })
}


return res.status(400).json({
    success:false,
    message:"blog is not created"
})





}

catch(error){

console.log("this is the error : ",error);

return res.status(400).json({
    success:false,
    message:error
});




}




}