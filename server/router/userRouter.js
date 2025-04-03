const express=require('express');
const userRouter=express.Router();

const {registerUser,loginUser,verifyOTP, viewVehicle, booking, Mybooking, addReview, addMessage, profile, verifyOTPLogin, resendOTP, createOrder}=require('../controls/userControls');

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/verify-otp').post(verifyOTP);
userRouter.route('/viewbikes').get(viewVehicle)
userRouter.route("/bookride").post(booking)
userRouter.route("/viewmybookings").get(Mybooking)
userRouter.route("/addReview").post(addReview)
userRouter.route("/contact").post(addMessage)
userRouter.route("/profile").get(profile)
userRouter.route("/verify-otplogin").post(verifyOTPLogin)
userRouter.route("/resend-otp").post(resendOTP)
userRouter.route("/create-order").post(createOrder)

module.exports=userRouter;