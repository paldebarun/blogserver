const mongoose=require('mongoose');
const replySchema=require('../models/reply');


const commentSchema=new mongoose.Schema({

user_id:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'UserSchema'
},

autherName:{
type:String,
require:true
},

blog_id:{

    type:mongoose.Schema.Types.ObjectId,
    ref:"blogSchema"


}
,



comment_body:{

    type:String,
    require:true
},

replies: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'replySchema' 
}]



});

module.exports=mongoose.model('commentschema',commentSchema);


