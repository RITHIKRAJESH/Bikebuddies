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

    AXIOS.post("http://localhost:9000/rider/addvehicle", formData, {
      headers: { id: userId, "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        alert(res.data.message);
        navigate("/rider/viewvehicle")
        window.location.reload()
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
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
      <Card sx={{ width: "100%", maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom align="center">
            Vehicle Registration Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Vehicle Name"
                  variant="outlined"
                  fullWidth
                  value={vehicleName}
                  onChange={(e) => setVehicleName(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Model"
                  variant="outlined"
                  fullWidth
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Registration Number"
                  variant="outlined"
                  fullWidth
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Place"
                  variant="outlined"
                  fullWidth
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  required
                />
              </Grid>

              {/* Multiple File Uploads */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileChange(e, setRcBookImage)}
                  />
                  <FormHelperText>Upload RC Book Images</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileChange(e, setInsuranceImage)}
                  />
                  <FormHelperText>Upload Insurance Images</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileChange(e, setLicenseImage)}
                  />
                  <FormHelperText>Upload License Images</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileChange(e, setVehicleImage)}
                  />
                  <FormHelperText>Upload Vehicle Images</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
