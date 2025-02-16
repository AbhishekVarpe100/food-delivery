const {validationResult}=require('express-validator');
const User = require('../models/User');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const Food = require('../models/Food');
const Order = require('../models/Order');
const Fav = require("../models/Fav");
const Cart = require('../models/Cart');
const secretKey='food-delivery-web-app';
exports.register=async(req,res)=>{
    const {username,email,password}=req.body;
    const error=validationResult(req);
    const Username=await User.find({username})
    const Email=await User.find({email})
    if( Email.length>0 || Username.length>0){
        res.json({msg:'exist'})
    }
    else{
        if(error.isEmpty()){
            const hashedPass=await bcrypt.hash(password,10)
            const user=new User({username,email,password:hashedPass})
            user.save()
            const response=await axios.post("http://localhost:3000/send-mail",{email})
            res.json({register:response.data})
        }
        else{
            res.json({errors:error.array()})
        } 
    }
}



exports.login=async(req,res)=>{
    let user=await User.find({username:req.body.username})

    if(req.body.username!='admin'){
        const isCompare=await bcrypt.compare(req.body.password,user[0].password)
        if(isCompare){
            jwt.sign({username:user.username,email:user.email},secretKey,{expiresIn:'1h'},(err,token)=>{
                if(err){
                    console.log(err)    
                }
                else{
                    res.json({token,message:"login successful",username:user[0].username,email:user[0].email})
                }
            })
        }
        else{
            res.json('Incorrect password')
        }
    }
    else{
        res.json("admin")
    }
}


exports.getHome=async(req,res)=>{

    jwt.verify(req.token,secretKey,(err,authData)=>{
        if(err){
            res.json({msg:'invalid token'})
        }
        else{
            res.json({msg:'profile accesed',authData})
        }
    })

}

exports.getItem=async(req,res)=>{
    const {id}=req.query;
    const data=await Food.findById(id)
    res.json(data)
}

exports.getOrder=async(req,res)=>{
    const username=req.query.username;
    const data=await Order.find({username:username})
    res.json(data)
}

exports.deleteOrder=async(req,res)=>{
    const id=req.params.id;
    await Order.findByIdAndDelete(id)
    res.json('deleted')
}

exports.getCart=async(req,res)=>{
    const username=req.query.username;
    const data=await Cart.find({username})
    res.json(data)
}

exports.removeCart=async(req,res)=>{
    const id=req.params.id;
    const data=await Cart.findById(id)
    await Food.updateOne({name:data.name},{$set:{cart_status:""}})
    await Cart.findByIdAndDelete(id)
    res.json('deleted')
    
}

exports.getStatus=async(req,res)=>{
    const id=req.params.id
    const item=await Order.findOne({_id:id})
    res.json(item)
}


exports.postComment=async(req,res)=>{
    const {id,username,rating,comment}=req.body
    const added_review=await Food.findByIdAndUpdate(id,{$push:{reviews:{reviewer:username,rating,comment}}},{new:true})
    res.json('added')
}

exports.getReview=async(req,res)=>{
    const id=req.params.id;
    const data=await Food.findById(id)
    res.json(data.reviews)
}

exports.deleteReview= async (req, res) => {
    try {
        const { review_id, item_id } = req.query; // Extract food and review identifiers from query params

        // Update the food document to remove the review
        const result = await Food.findByIdAndUpdate(
            {_id:item_id}, // The ID of the food item
            { $pull: { reviews: { _id: review_id } } }, // Remove the review by its unique `_id`
            { new: true } // Return the updated document
        );

        if (result) {
            res.status(200).json({
                message: 'Review deleted successfully',
                updatedFood: result,
            });
        } else {
            res.status(404).json({ message: 'Food item or review not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
}

exports.orderBy=async(req,res)=>{
    const option=req.query.option
    if(option==""){
        console.log("invalid sorting")
    } 
    else{
        const data=await Food.find().sort({[option]:1}) 
        res.json(data)
    }
}

exports.nextPage=async (req, res) => {
    const {page}=req.body;
    var data=await Food.find().limit(page)
    if(page>3){
        data=await Food.find().skip(page-3).limit(3)
    }
    res.json(data)
}
exports.prevPage=async(req,res)=>{
    const {page}=req.body;
    var data=await Food.find().limit(page)
    if(page>3){
        data=await Food.find().skip(page-3).limit(3)
    }
    else if(page<=0){
        data=await Food.find().limit(3)
    }
    res.json(data)
}

exports.cartCount=async(req,res)=>{
    let username=req.query.username
    let cartData=await Cart.find({username})
    res.json({"cart_count":cartData.length})
}

exports.searchItem=async(req,res)=>{
    let text=(req.query.searchText).toLowerCase()
    let data=await Food.find()
    let filteredData=data.filter((item)=>item.name.toLowerCase().includes(text))
    if(filteredData.length>0){
        res.json(filteredData)
    }
    else{
        res.json([])
    }
}

exports.addFav=async(req,res)=>{
    const username=req.body.username
    const {name,file,price}=req.body[0];
    const newFav=new Fav({username,file,price:Number(price),name})
    newFav.save()
    res.json('added')
}

exports.getFav=async(req,res)=>{
    const username=req.query.username
    const data=await Fav.find({username})
    res.json(data)
}

exports.delFav=async(req,res)=>{
    const id=req.query.id
    await Fav.findByIdAndDelete(id)
    res.json('deleted').status(200)
}

exports.getStatus_=async(req,res)=>{
    const username=req.query.username;
    const fav=await Fav.find({username})
    const data=fav.map(item=>item.name)
    res.json(data)

}

