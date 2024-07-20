const mongoose = require('mongoose');
let chatSchema=mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        maxLength:100
    },
    to:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true
    }
});
let chat=mongoose.model("chat",chatSchema);
module.exports= chat;