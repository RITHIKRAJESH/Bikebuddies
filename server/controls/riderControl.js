const vehicleModel = require('../models/bikemodel');
const riderModel = require('../models/bookride')

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


const viewRides = async (req, res) => {
    try {
      const userId = req.headers._id; // Get userId from headers
      console.log(userId)
      // Find all the rides and populate the vehicleId field
      const rides = await riderModel.find({}).populate('vehicleId');
      console.log(rides)
      // Filter the rides to only include those where the userId matches
      const userRides = rides.filter(ride => ride.vehicleId.userId.toString() === userId.toString());
      console.log(userRides)
      if (userRides.length > 0) {
        // Return the filtered rides (bookings)
        res.json(userRides);
      } else {
        // If no matching rides, return an empty array
        res.json([]);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Error fetching rides' });
    }
  };
  
  const updateStatus=async(req,res)=>{
    try{
     const {status,id}=req.body
     const booking=await riderModel.findOne({_id:id})
     booking.status=status
     booking.save()
     res.json(`The Ride is ${status} successfully`)
    }catch(err){
      console.log(err)
    }
  }

module.exports = { addVehicle,viewVehicle,viewRides,updateStatus};