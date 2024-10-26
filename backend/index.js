require('dotenv').config();
const express =require('express');
const app=express();
const cors=require('cors')
const userRoutes=require('./routes/userRoutes')
// const Connection=require('./Connection')
app.use(cors())
app.use(express.json())
app.use(userRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on the port ${process.env.PORT}`)
})
