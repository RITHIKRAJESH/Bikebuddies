const express=require('express');
const app=express();
const cors=require('cors');
const dbConnect=require('./models/dbconnect');
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));   

dbConnect()

const userRouter=require('./router/userRouter');
app.use('/user',userRouter);

const riderRouter=require('./router/riderRouter');  
app.use('/rider',riderRouter);
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});
