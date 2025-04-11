const express = require('express');
const riderRouter = express.Router();
const { addVehicle,viewVehicle, viewRides, updateStatus, deleteVehicle, updateVehicle, riderDashboard, viewRating} = require('../controls/riderControl');
const { v2: cloudinary } = require("cloudinary");
require('dotenv').config();
const { CloudinaryStorage } = require("multer-storage-cloudinary");
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

const multer = require('multer');
const path = require('path');
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "vehicles", 
        allowedFormats: ["jpg", "jpeg", "png", "gif"],
        public_id: (req, file) => `${Date.now()}-${file.originalname}`, 
    },
});

const upload = multer({ storage: storage });


riderRouter.route('/addvehicle').post(upload.fields([{ name: 'rcBookImage', maxCount: 2 }, { name: 'insuranceImage', maxCount: 2 }, { name: 'licenseImage', maxCount: 2 }, { name: 'vehicleImage', maxCount: 2 }]), addVehicle);
riderRouter.route('/viewvehicle').get(viewVehicle);
riderRouter.route('/viewrides').get(viewRides)
riderRouter.route('/updateStatus').put(updateStatus)
riderRouter.route('/deleteVehicle').delete(deleteVehicle)
riderRouter.route('/updatevehicle').put(upload.fields([{ name: 'rcBookImage', maxCount: 2 }, { name: 'insuranceImage', maxCount: 2 }, { name: 'licenseImage', maxCount: 2 }, { name: 'vehicleImage', maxCount: 2 }]),updateVehicle);
riderRouter.route('/viewtravel').get(riderDashboard)
riderRouter.route('/viewrating').get(viewRating)


module.exports = riderRouter;