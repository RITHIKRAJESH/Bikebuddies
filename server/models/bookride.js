const mongoose=require('mongoose');
const rideSchema=new mongoose.Schema({
    riderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    driverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    source:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    fare:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:'pending'
    }
},{timestamps:true});

const riderModel=mongoose.model('ride',rideSchema);

module.exports=riderModel;