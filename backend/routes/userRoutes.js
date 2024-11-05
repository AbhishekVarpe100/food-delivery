const express=require('express')
const router=express.Router();
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('../Connection')
const User=require('../models/User')

const secretKey='food-delivery-web-app';

const {body,validationResult}=require('express-validator')
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
            jwt.sign({username:user.username,email:user.email},secretKey,{expiresIn:'30s'},(err,token)=>{
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

module.exports=router