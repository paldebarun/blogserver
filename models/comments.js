const mongoose=require('mongoose');

const commentSchema=new mongoose.Schema({

user_id:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'UserSchema'
},

blog_id:{

    type:mongoose.Schema.Types.ObjectId,
    ref:"blogSchema"


}
,

comment_body:{

    type:String,
    require:true
}



});

module.exports=mongoose.model('commentschema',commentSchema);


