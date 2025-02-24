const express=require('express');
const app=express();
const path=require('path');
const cors=require('cors');
const dbConnect=require('./models/dbconnect');
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));   
app.use("/uploads", express.static(path.join(__dirname, "uploads")));;

dbConnect()

const userRouter=require('./router/userRouter');
app.use('/user',userRouter);

const riderRouter=require('./router/riderRouter');  
app.use('/rider',riderRouter);

const adminRouter=require('./router/adminRouter');
app.use('/admin',adminRouter);
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});
