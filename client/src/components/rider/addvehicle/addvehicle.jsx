import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import AXIOS from "axios";
import { useNavigate } from "react-router-dom";
import './styles.css';
import { toast, ToastContainer } from 'react-toastify';
export default function Addvehicle() {
  const [vehicleName, setVehicleName] = useState("");
  const [model, setModel] = useState("");
  const [regNo, setRegNo] = useState("");
  const [rcBookImage, setRcBookImage] = useState([]);
  const [insuranceImage, setInsuranceImage] = useState([]);
  const [licenseImage, setLicenseImage] = useState([]);
  const [vehicleImage, setVehicleImage] = useState([]);
  const [place, setPlace] = useState("");
  
  const navigate=useNavigate()
  const userId =localStorage.getItem("id");
   const url = import.meta.env.VITE_BASE_URL;
    console.log(url);
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("vehicleName", vehicleName);
    formData.append("model", model);
    formData.append("regNo", regNo);
    formData.append("place", place);

    // Append multiple images correctly
    rcBookImage.forEach((file) => formData.append("rcBookImage", file));
    insuranceImage.forEach((file) => formData.append("insuranceImage", file));
    licenseImage.forEach((file) => formData.append("licenseImage", file));
    vehicleImage.forEach((file) => formData.append("vehicleImage", file));
    console.log(formData)
    AXIOS.post(`${url}/rider/addvehicle`, formData, {
      headers: { id: userId, "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/rider/viewvehicle")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Handler for multiple file uploads
  const handleFileChange = (event, setter) => {
    setter(Array.from(event.target.files)); // Convert FileList to Array
  };

  return (
    <div className="flex-center mt-6 px-2">
      <ToastContainer/>
    <div className="card p-4">
      <h1 className="title">Vehicle Registration</h1>
      <p className="subtitle">Register your vehicle by filling out the details below.</p>
  
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2">
          <input
            className="input-field"
            placeholder="Vehicle Name"
            value={vehicleName}
            onChange={(e) => setVehicleName(e.target.value)}
            required
          />
          <input
            className="input-field"
            placeholder="Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
          <input
            className="input-field"
            placeholder="Registration Number"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
            required
          />
          <input
            className="input-field"
            placeholder="Place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
          />
        </div>
  
        <h2 className="section-title">Upload Documents</h2>
        <div className="grid grid-cols-2">
          <label className="file-upload-btn">
            Upload RC Book
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileChange(e, setRcBookImage)}
              hidden
            />
          </label>
  
          <label className="file-upload-btn">
            Upload Insurance
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileChange(e, setInsuranceImage)}
              hidden
            />
          </label>
  
          <label className="file-upload-btn">
            Upload License
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileChange(e, setLicenseImage)}
              hidden
            />
          </label>
  
          <label className="file-upload-btn">
            Upload Vehicle Images
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileChange(e, setVehicleImage)}
              hidden
            />
          </label>
        </div>
  
        <button type="submit" className="submit-btn mt-6">Submit</button>
      </form>
    </div>
  </div>
  

  );
}
