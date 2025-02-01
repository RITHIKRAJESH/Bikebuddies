const express = require('express');
const riderRouter = express.Router();
const { addVehicle } = require('../controls/riderControl');

const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


riderRouter.route('/addvehicle').post(upload.fields([{ name: 'rcBookImage', maxCount: 2 }, { name: 'insuranceImage', maxCount: 2 }, { name: 'licenseImage', maxCount: 2 }, { name: 'vehicleImage', maxCount: 2 }]), addVehicle);

module.exports = riderRouter;