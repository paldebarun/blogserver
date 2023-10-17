const mongoose=require('mongoose');

const replyschema=new mongoose.Schema({

    comment_id :
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'commentschema'
        },
        autherName:{
            type:String,
            require:true
            },
    user_id :{
     type: mongoose.Schema.Types.ObjectId,
     ref:'UserSchema'
    },

    body:{
        type:String,
        require:true
    }

});

module.exports=mongoose.model("replySchema",replyschema);
