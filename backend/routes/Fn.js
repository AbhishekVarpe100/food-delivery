const Calc={
  add: function(req,res){
        const {n1,n2}=req.query
        console.log(n1,n2)
        
        res.json({addition:(Number(n1)+Number(n2))})
    }
}


module.exports={Calc}