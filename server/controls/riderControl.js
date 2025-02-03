const vehicleModel = require('../models/bikemodel');


const addVehicle = async (req, res) => {
    const userId = req.headers.id
    const {vehicleName, model, regNo,place } = req.body;
    const rcBookImage = req.files.rcBookImage.map(file => file.path);
    const insuranceImage = req.files.insuranceImage.map(file => file.path);
    const licenseImage = req.files.licenseImage.map(file => file.path);
    const vehicleImage = req.files.vehicleImage.map(file => file.path);
    try {
        const newVehicle = new vehicleModel({
            userId,
            vehicleName,
            model,
            regNo,
            rcBookImage,
            insuranceImage,
            licenseImage,
            vehicleImage,
            place
        });
        await newVehicle.save();
        res.status(201).json({ message: 'Vehicle added successfully' });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


const viewVehicle = async (req, res) => {
    const userId = req.headers._id
    console.log(userId)
    try {
        const vehicle = await vehicleModel.findOne({ userId });
        console.log(vehicle);
        res.status(200).json([vehicle]);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


module.exports = { addVehicle,viewVehicle};