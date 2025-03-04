const express=require('express');
const userRouter=express.Router();

const {registerUser,loginUser,verifyOTP, viewVehicle, booking, Mybooking, addReview}=require('../controls/userControls');

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/verify-otp').post(verifyOTP);
userRouter.route('/viewbikes').get(viewVehicle)
userRouter.route("/bookride").post(booking)
userRouter.route("/viewmybookings").get(Mybooking)
userRouter.route("/addReview").post(addReview)

module.exports=userRouter;