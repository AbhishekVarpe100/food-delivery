const mongoose=require('mongoose')
const suggestionSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    suggestion:{
        type:String,
        required:true
    },
    reply:String
},{timestamps:true})

module.exports=mongoose.model("Suggestion",suggestionSchema)