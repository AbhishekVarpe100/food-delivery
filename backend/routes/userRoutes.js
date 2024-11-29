const express=require('express')
const router=express.Router();
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const fs=require('fs')
const path=require('path')
require('../Connection')
const User=require('../models/User')
const Food=require('../models/Food')
const Order=require('../models/Order')

const secretKey='food-delivery-web-app';

const {body,validationResult}=require('express-validator');
const Cart = require('../models/Cart');
const registerValidator=[
    body('username','Minimum length 6 characters required').isLength({min:6}),
    body('email','Invalid email address').isEmail(),
    body('password','Minimum length 6 characters required').isLength({min:6}),
]


// register route

router.post('/register',registerValidator,async(req,res)=>{
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
            res.json({register:'success'})
        }
        else{
            res.json({errors:error.array()})
        } 
    }
})



// login route

router.post('/login',async(req,res)=>{
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
})

router.get('/gethome',verifyToken,async(req,res)=>{

    jwt.verify(req.token,secretKey,(err,authData)=>{
        if(err){
            res.json({msg:'invalid token'})
        }
        else{
            res.json({msg:'profile accesed',authData})
        }
    })

})

function verifyToken(req,res,next){

    const bearerHeader=req.query.token;
    if(!bearerHeader){
        res.json({msg:"token not present"})
    }
    else{

        const bearer=bearerHeader.split(" ")
        const token=bearer[1]
        req.token=token;
        next()

        
    }

}

router.get('/get-data',async(req,res)=>{
    const data=await Food.find();
    res.json(data)

})

router.delete('/delete-item/:id',async(req,res)=>{
    const id=req.params.id;
    const user=await Food.findById(id)
    
    fs.unlink(`./Public/Food_Images/${user.file}`,async (err)=>{
        if(err){
            console.log(err)
        }
        else{
           await Food.findByIdAndDelete(id);
            res.json('deleted')
        }
    })
})

router.get('/get-item',async(req,res)=>{
    const {id}=req.query;
    const data=await Food.findById(id)
    res.json(data)
})

router.post('/confirm-order',async(req,res)=>{

    const { name, phone, address ,item,price,quantity,av_quantity,username}=req.body;
    try{

        const order=new Order({cust_name:name,mobile:phone,addr:address,item_name:item,price,quantity,username})
        await order.save();
        await Food.updateOne({name:item},{$set:{quantity:`${Number.parseInt(av_quantity-quantity)}`}})
        res.json('confirm')
    }
    catch(err){
        console.log(err)
    }

})



router.put('/update-quantity',async(req,res)=>{
    
    const {quantity,id,av_quantity}=req.body;
    await Food.updateOne({_id:id},{$set:{quantity:Number.parseInt(av_quantity)+Number.parseInt(quantity)}})
    res.json('updated')
    // console.log(id,quantity,av_quantity)
    
})

router.put('/update-price',async(req,res)=>{
    const {price,id,prev_price}=req.body;
    await Food.updateOne({_id:id},{price:price})
    res.json('updated')
})


router.get('/get-orders',async(req,res)=>{
    const username=req.query.username;
    const data=await Order.find({username:username})
    res.json(data)
})

router.delete('/delete-order/:id',async(req,res)=>{
    const id=req.params.id;
    await Order.findByIdAndDelete(id)
    res.json('deleted')
})


router.post('/add-to-cart',async(req,res)=>{
    const data=await Food.findById({_id:req.body.id})
    const cartItem=new Cart({username:req.body.username,name:data.name,file:data.file,price:data.price})
    cartItem.save()
    await Food.findByIdAndUpdate({_id:req.body.id},{$set:{cart_status:'added'}})
    res.json({msg:'added'})
})

router.get('/get-cart',async(req,res)=>{
    const username=req.query.username;
    const data=await Cart.find({username})
    res.json(data)

})

router.delete('/remove-cart/:id',async(req,res)=>{
    const id=req.params.id;
    const data=await Cart.findById(id)
    await Food.updateOne({name:data.name},{$set:{cart_status:""}})
    await Cart.findByIdAndDelete(id)
    res.json('deleted')
    

})

module.exports=router
