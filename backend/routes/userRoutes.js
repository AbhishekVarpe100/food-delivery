const express=require('express')
const router=express.Router();
const bcrypt=require('bcrypt')
require('../Connection')
const User=require('../models/User')
const {body,validationResult}=require('express-validator')
const registerValidator=[
    body('username','Minimum length 6 characters required').isLength({min:6}),
    body('email','Invalid email address').isEmail(),
    body('password','Minimum length 6 characters required').isLength({min:6}),
]

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

module.exports=router