const mongoose=require('mongoose')
const Schema=mongoose.Schema


//Define the order schema
const orderSchema=new Schema({
    cust_name:{
        type:String,
        required:true,
    }
    ,
    mobile:{
        type:String,
        required:true,
    },
    addr:{
        type:String,
        required:true,
    },
    item_name:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    quantity:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    }
})

// Create the order model
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;