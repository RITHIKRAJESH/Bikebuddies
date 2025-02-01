import React, { useState } from 'react';
import { TextField, Button, Input, FormControl, FormHelperText, Grid, Card, CardContent, Typography, Box } from '@mui/material';
import AXIOS from 'axios';

export default function Addvehicle() {
  const [vehicleName, setVehicleName] = useState('');
  const [model, setModel] = useState('');
  const [regNo, setRegNo] = useState('');
  const [rcBookImage, setRcBookImage] = useState(null);
  const [insuranceImage, setInsuranceImage] = useState(null);
  const [licenseImage, setLicenseImage] = useState(null);
  const [vehicleImage, setVehicleImage] = useState(null);  
  const [place, setPlace] = useState('');
  const userId="679cb475d138d509e1edd125"
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a FormData object to send the images
    const formData = new FormData();
    formData.append('vehicleName', vehicleName);
    formData.append('model', model);
    formData.append('regNo', regNo);
    formData.append('place', place);
    formData.append('rcBookImage', rcBookImage);
    formData.append('insuranceImage', insuranceImage);
    formData.append('licenseImage', licenseImage);
    formData.append('vehicleImage', vehicleImage);
    AXIOS.post("http://localhost:9000/rider/addvehicle", formData,{headers: {id: userId}})
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRcBookChange = (e) => {
    setRcBookImage(e.target.files[0]);
  };

  const handleInsuranceChange = (e) => {
    setInsuranceImage(e.target.files[0]);
  };

  const handleLicenseChange = (e) => {
    setLicenseImage(e.target.files[0]);
  };

  const handleVehicleImageChange = (e) => {  // New function for handling vehicle image upload
    setVehicleImage(e.target.files[0]);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
      <Card sx={{ width: '100%', maxWidth: 600 }}>
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

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleRcBookChange}
                  />
                  <FormHelperText>Upload RC Book Image</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleInsuranceChange}
                  />
                  <FormHelperText>Upload Insurance Image</FormHelperText>
                </FormControl>
              </Grid>

              {/* License Image Upload Field */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleLicenseChange}
                  />
                  <FormHelperText>Upload Rider License Image</FormHelperText>
                </FormControl>
              </Grid>

              {/* Vehicle Image Upload Field */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleVehicleImageChange}  // Handling the vehicle image
                  />
                  <FormHelperText>Upload Vehicle Image</FormHelperText>
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
