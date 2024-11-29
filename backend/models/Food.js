const mongoose=require('mongoose')
const Schema=mongoose.Schema


//Define the food schema
const foodSchema=new Schema({
    name:{
        type:String,
        required:true,
    }
    ,
    file:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    quantity:{
        type:String,
        required:true
    },
    cart_status:{
        type:String,
    }
})

// Create the food model
const Food = mongoose.model('Food', foodSchema);
module.exports = Food;