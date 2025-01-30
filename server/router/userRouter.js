const express=require('express');
const userRouter=express.Router();

const {registerUser,loginUser,verifyOTP}=require('../controls/userControls');

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/verify-otp').post(verifyOTP);

module.exports=userRouter;