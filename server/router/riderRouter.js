const express = require('express');
const riderRouter = express.Router();
const { addVehicle,viewVehicle, viewRides, updateStatus} = require('../controls/riderControl');

const multer = require('multer');
const path = require('path');
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage });


riderRouter.route('/addvehicle').post(upload.fields([{ name: 'rcBookImage', maxCount: 2 }, { name: 'insuranceImage', maxCount: 2 }, { name: 'licenseImage', maxCount: 2 }, { name: 'vehicleImage', maxCount: 2 }]), addVehicle);
riderRouter.route('/viewvehicle').get(viewVehicle);
riderRouter.route('/viewrides').get(viewRides)
riderRouter.route('/updateStatus').put(updateStatus)
module.exports = riderRouter;