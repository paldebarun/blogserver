const Blog=require('../../models/blog');

exports.fetchAllblogs=async (req,res)=>{

try{

    const blogs=await Blog.find();

    if(blogs){
        return res.status(200).json({
            success:true,
            message:"fetched all blogs",
            blogs:blogs
        });
    }

    return res.status(400).json({
        success:false,
        message:"no blogs",
       
    });



}
catch(error){

res.status(400).json({
    success:true,
    message:"the blogs are not fetched an error occured"
})


}




}