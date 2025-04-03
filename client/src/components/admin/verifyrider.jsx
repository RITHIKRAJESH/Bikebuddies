import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export default function VerifyRider() {
    const [riders, setRiders] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedRider, setSelectedRider] = useState(null);

    useEffect(() => {
        const url = import.meta.env.VITE_BASE_URL;
  console.log(url);
        axios.get(`${url}/admin/viewriders`)
            .then((res) => {
                setRiders(res.data);
            }).catch((err) => {
                console.log(err);
            });
    }, []);

    const handleOpen = (rider) => {
        setSelectedRider(rider);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedRider(null);
    };
    const url = import.meta.env.VITE_BASE_URL;
    console.log(url);
    const verifyUser = (id) => {
        axios.put(`${url}/admin/verifyrider/${id}`)
          .then((res) => {
            alert(res.data);
            setRiders((prevRiders) =>
              prevRiders.map((r) =>
                r._id === id ? { ...r, verifieddriver: !r.verifieddriver } : r
              )
            );
          })
          .catch((err) => console.log(err));
    };

    const deleteUser = (id) => {
        axios.delete(`${url}/admin/deleteuser/${id}`)
          .then((res) => {
            alert(res.data);
            setRiders((prevRiders) => prevRiders.filter((r) => r._id !== id));
          })
          .catch((err) => console.log(err));
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Vehicle</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {riders.map((rider, index) => (
                            <TableRow key={rider._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{rider.userId.fullname}</TableCell>
                                <TableCell>{rider.userId.email}</TableCell>
                                <TableCell>{rider.vehicleName}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleOpen(rider)}>Details</Button>
                                    {!rider.userId.verifieddriver ? (
                                        <Button variant="contained" color="success" onClick={() => verifyUser(rider.userId._id)}>Verify</Button>
                                    ) : (
                                        <Button variant="contained" color="error" onClick={() => deleteUser(rider.userId._id)}>Delete</Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {selectedRider && (
                <Dialog open={open} onClose={handleClose} fullWidth>
                    <DialogTitle>Rider Details</DialogTitle>
                    <DialogContent>
                        <p><strong>Name:</strong> {selectedRider.userId.fullname}</p>
                        <p><strong>Email:</strong> {selectedRider.userId.email}</p>
                        <p><strong>Vehicle:</strong> {selectedRider.vehicleName} ({selectedRider.model})</p>
                        <p><strong>Registration No:</strong> {selectedRider.regNo}</p>
                        <p><strong>Location:</strong> {selectedRider.place}</p>
                        <p><strong>Created At:</strong> {new Date(selectedRider.createdAt).toLocaleString()}</p>
                        <div>
                            <p><strong>Vehicle Image:</strong></p>
                            <img src={`${url}/${selectedRider.vehicleImage[0]}`} alt="Vehicle" width="100%" />
                        </div>
                        <div>
                            <p><strong>RC Book:</strong></p>
                            {selectedRider.rcBookImage.map((img, i) => (
                                <img 
                                    key={i} 
                                    src={`${url}/${img}`} 
                                    alt={`RC Book ${i + 1}`} 
                                    width="100%" 
                                    style={{ marginBottom: 10 }} 
                                />
                            ))}
                        </div>
                        <div>
                            <p><strong>License:</strong></p>
                            <img src={`${url}/${selectedRider.licenseImage[0]}`} alt="License" width="100%" />
                        </div>
                        <div>
                            <p><strong>Insurance:</strong></p>
                            <img src={`${url}/${selectedRider.insuranceImage[0]}`} alt="Insurance" width="100%" />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">Close</Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
}
