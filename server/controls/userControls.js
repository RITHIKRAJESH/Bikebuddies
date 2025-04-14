const nodemailer = require('nodemailer');
const crypto = require('crypto');
const userModel = require('../models/userModel');
const riderModel = require('../models/bookride');
const vehicleModel=require('../models/bikemodel');
const contactModel=require('../models/contact')
const Razorpay = require("razorpay");
const { getSocketIdForUser } = require('../socketmanager');


const razorpay = new Razorpay({
    key_id: process.env.key_id, // Replace with your Razorpay Key
    key_secret: process.env. key_secret, // Replace with your Razorpay Secret
  });

// Create a Nodemailer transporter object
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use the email provider (e.g., Gmail, Outlook, etc.)
    auth: {   
        user: "rajeshrithik49@gmail.com", // Replace with your email
        pass: "wjqo hcwa blhb dmjq"  // Replace with your email password or app-specific password
    },
});

const generateOTP = () => {
    return crypto.randomInt(100000, 999999); // Generates a 6-digit OTP
};

const sendOTPEmail = (email, otp) => {
    const mailOptions = {
        from: "rajeshrithik49@gmail.com", // Replace with your email
        to: email,
        subject: 'OTP for User Registration',
        text: `Your OTP for registration is: ${otp}`,
    };
    console.log('Sending OTP to email:', email);
    return transporter.sendMail(mailOptions);
};

const registerUser = async (req, res) => {
    const { fullname, email, role } = req.body;
    // Generate OTP for email verification
    const otp = generateOTP();
    const otpExpiration = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

    try {
        // Create a new user instance
        const newUser = new userModel({
            fullname,
            email,
            password:"123456",
            role,
            otp,               // Save OTP
            otpExpiration,     // Save OTP expiration time
        });

        await newUser.save();

        // Send OTP to user's email
        await sendOTPEmail(email, otp);
          console.log('OTP:', otp);
        res.status(201).json({
            message: "User registered successfully. Please check your email for the OTP."
        });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};


const resendOTP = async (req, res) => {
    const { email } = req.body;

    try {
        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate a new OTP (you can adjust the length and complexity as needed)
        const otp = user.otp;  // Generates a 6-digit OTP
        user.otpExpiration = Date.now() + 60 * 1000;  // OTP expires in 1 minute
        await user.save();

        // Send the OTP email
        await sendOTPEmail(email, otp);

        // Log OTP for debugging purposes (avoid logging in production)
        console.log('OTP:', otp);

        // Respond with success
        res.status(200).json({
            message: "OTP resent successfully"
        });

    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({
            message: "Failed to resend OTP. Please try again later."
        });
    }
};

const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    console.log(req.body);
    try {
        // Find the user by email
        const user = await userModel.findOne({email});

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if OTP is expired
        if (user.otpExpiration < Date.now()) {
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }

        // Check if OTP matches
        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }

        // OTP is valid
        // You can now mark the user as verified or continue with the registration process
        user.verified = true;
        await user.save();

        res.status(200).json({ message: 'OTP verified successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const verifyOTPLogin = async (req, res) => {
    const { email, otp } = req.body;
    console.log(req.body);
    try {
        // Find the user by email
        const user = await userModel.findOne({email});
        console.log(user)
        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }
        res.status(200).json({ message: 'OTP verified successfully!' , user:user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// const loginUser = async (req, res) => {
//     const { email, password } = req.body;
//     console.log(req.body);
//     try {
//         const existingUser = await userModel.findOne({ email });
//         if (!existingUser) return res.status(404).json("User doesn't exist" );
//         if (password !== existingUser.password) return res.status(400).json("Invalid credentials" );
//         res.status(200).json({ user:existingUser });
//     } catch (error) {
//         res.status(500).json(error.message );
//     }
// }

const sendOTPEmail1 = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use the email provider (e.g., Gmail, Outlook, etc.)
        auth: {   
            user: "rajeshrithik49@gmail.com", // Replace with your email
            pass: "wjqo hcwa blhb dmjq"  // Replace with your email password or app-specific password
        },
    });
  
    const mailOptions = {
      from: 'rajeshrithik49@gmail.com',
      to: email,
      subject: 'Your OTP for Login',
      text: `Your OTP is: ${otp}`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      
      console.log('OTP sent to email');
    } catch (error) {
      console.error('Error sending OTP email:', error);
      throw new Error('Error sending OTP email');
    }
  };
  
  const loginUser = async (req, res) => {
    const { email, otp, enteredOTP } = req.body; // Receiving email and OTP from request body
    console.log(req.body);
  
    try {
      const existingUser = await userModel.findOne({ email });
  
      if (!existingUser) {
        return res.status(404).json({ message: "User doesn't exist" });
      }
  
      // Check if the OTP exists and if it matches the entered OTP
      if (enteredOTP) {
        if (existingUser.otp === enteredOTP) {
          // OTP matched, authenticate the user
          res.status(200).json({ user: existingUser });
        } else {
          return res.status(400).json({ message: "Invalid OTP" });
        }
      } else {
        // If OTP is not provided, generate and send OTP
        const otp = generateOTP();
        // Save the generated OTP to the user's document
        existingUser.otp = otp;
        await existingUser.save();
  
        // Send OTP to user's email
        await sendOTPEmail1(email, otp);
        
        return res.status(200).json({ message: "OTP sent to email" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

const bookRide = async (req, res) => {
    try {
        const { riderId, driverId, source, destination, fare } = req.body;
        const rider = await userModel.findById(riderId);
        const driver = await userModel.findById(driverId);

        if (!rider) {
            return res.status(404).json({ message: 'Rider not found' });
        }
        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }

        const newRide = new riderModel({
            riderId,
            driverId,
            source,
            destination,
            fare,
            status: 'pending'  
        });

        // Save the ride to the database
        await newRide.save();
        
        return res.status(200).json({ message: 'Ride booked successfully', ride: newRide });
    } catch (error) {
        console.error('Error booking ride:', error);
        return res.status(500).json({ message: 'Error booking ride', error });
    }
};

const viewVehicle=async(req,res)=>{
    try{
       const details=await vehicleModel.find().populate("userId")
       console.log(details)
       res.json(details)
    }catch(err){
        console.log(err)
    }
}

const booking = async (req, res) => {
  try {
    const { vehicleId, userId, startAddress, endAddress, totalCost, distance, paymentStatus } = req.body;
    
    const ride = new riderModel({
      vehicleId, userId, startAddress, endAddress, fare: totalCost, totalDistance: distance, status: "Booked", paymentStatus
    });

    const vehicle = await vehicleModel.findOne({ _id: vehicleId });
    const riderId = vehicle.userId;
    console.log(riderId)
    await ride.save();
    

    const riderSocketId = getSocketIdForUser(riderId);
    console.log("Socket id",riderSocketId)
    if (riderId) {
      global._io.to(riderSocketId).emit("Booked", {
        riderId,
        ride,
        status: "New Booking Assigned"
      });
    } else {
      console.log("Rider is not connected via WebSocket");
     
    }

  
    res.json("Booking Successful" );
  } catch (err) {
    console.error("Error in booking:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const createOrder = async (req, res) => {
    try {
      console.log("create")
      const { amount } = req.body; 
      console.log(amount)
      const options = {
        amount: amount*100, 
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
      };
      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      res.status(500).json({ message: "Error creating order" });
    }
  };
  
  const verifyPayment = async (req, res) => {
    try {
      console.log("verify")
      const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;
  
      const body = razorpayOrderId + "|" + razorpayPaymentId;
      const expectedSignature = crypto
        .createHmac("sha256", "Sj5CF71O3PvsM5Aex3Q2AtOk") // Replace with your Razorpay Secret
        .update(body)
        .digest("hex");
  
      if (expectedSignature === razorpaySignature) {
        // Payment is successful, proceed with booking confirmation
        const bookingDetails = req.body;
        const ride = new riderModel({
          vehicleId: bookingDetails.vehicleId,
          userId: bookingDetails.userId,
          startAddress: bookingDetails.startAddress,
          endAddress: bookingDetails.endAddress,
          fare: bookingDetails.totalCost,
          totalDistance: bookingDetails.distance,
          status: "Booked",
          paymentStatus: "paid",
        });
  
        await ride.save();
        res.json({ message: "Booking confirmed" });
      } else {
        res.status(400).json({ message: "Payment verification failed" });
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      res.status(500).json({ message: "Payment verification failed" });
    }
  };






const Mybooking=async(req,res)=>{
    try{
        const userid=req.headers._id
        const bookings=await riderModel.find({userId:userid}).populate("vehicleId")
        res.json(bookings)
    }catch(err){
        console.log(err)
    }
}

const addReview=async(req,res)=>{
    try{
     const {bookid,review,rating}=req.body
     await riderModel.findByIdAndUpdate({_id:bookid},{review:review,rating:rating,reviewstatus:"completed"})
     res.json("Review Submitted Successfully")
    }catch(err){
        console.log(err)
    }
}


const addMessage=(req,res)=>{
    const {Name,Message,Email}=req.body;
    if(!Name || !Message || !Email){
        res.json("All Fields are required")
    }
    const contact=new contactModel({
        Name,Message,Email
    })
    contact.save()
    res.json("Message Received Successfully")
}
const profile = async (req, res) => {
    try {
      const userid = req.headers.id;
      
      // Fetch user data using findOne (assuming only one user per ID)
      const user = await userModel.findOne({ _id: userid });
  
      // Ensure user was found
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Fetch completed rides using the appropriate model (assuming it's rideModel, not userModel)
      const rides = await riderModel.find({ userId: userid, status: "Completed" }).populate("vehicleId");
  
      console.log(user);
      console.log(rides);
  
      // Respond with user and completed rides
      res.json({ user, rides});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred", error: err.message });
    }
  };
  

module.exports = { registerUser, verifyOTP,loginUser,bookRide,viewVehicle ,booking, Mybooking,addReview,addMessage,profile, verifyOTPLogin, resendOTP,createOrder, verifyPayment};