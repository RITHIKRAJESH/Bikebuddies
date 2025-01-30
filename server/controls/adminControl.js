const userModel=require('../models/userModel');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const viewUsers=async(req,res)=>{
    try{
        const users=await userModel.find({role:'user'});
        res.status(200).json(users);
    }catch(error){
        res.status(404).json(error.message);
    }
}


const viewRiders=async(req,res)=>{
    try{
        const riders=await userModel.find({role:'rider'});
        res.status(200).json(riders);   
    }catch(error){   
        res.status(404).json(error.message);
    }
}


const verifyRider=async(req,res)=>{
    const id=req.params.id;
    try{
        await userModel.findByIdAndUpdate(id,{verified:true});
        res.status(200).json('Rider verified successfully');    
    }catch(error){
        res.status(404).json(error.message);
    }
}

const deleteUser=async(req,res)=>{
    const id=req.params.id;
    try{
        await userModel.findByIdAndRemove(id);
        res.status(200).json('User deleted successfully');
    }catch(error){
        res.status(404).json(error.message);
    }
}

