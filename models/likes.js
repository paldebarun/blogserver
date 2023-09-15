const mongoose=require('mongoose');

const likesSchema=new mongoose.Schema({

user_id:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'UserSchema'
},

autherName:{
type:String
},

blog_id:{

    type:mongoose.Schema.Types.ObjectId,
    ref:"blogSchema"


}


});

module.exports=mongoose.model('likesSchema',likesSchema);
