const nodemailer = require('nodemailer');
const crypto = require('crypto');
const userModel = require('../models/userModel');
const riderModel = require('../models/bookride');

// Create a Nodemailer transporter object
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use the email provider (e.g., Gmail, Outlook, etc.)
    auth: {   
        user: "rajeshrithik49@gmail.com", // Replace with your email
        pass: "rasj auvd oxsh qsjp"  // Replace with your email password or app-specific password
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
    const { fullname, email, password, role } = req.body;
    // Generate OTP for email verification
    const otp = generateOTP();
    const otpExpiration = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

    try {
        // Create a new user instance
        const newUser = new userModel({
            fullname,
            email,
            password,
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





const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    console.log(req.body);
    try {
        // Find the user by email
        const user = await userModel.findOne({ email });

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


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) return res.status(404).json("User doesn't exist" );
        if (password !== existingUser.password) return res.status(400).json("Invalid credentials" );
        res.status(200).json({ user:existingUser });
    } catch (error) {
        res.status(500).json(error.message );
    }
}


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



module.exports = { registerUser, verifyOTP,loginUser,bookRide };