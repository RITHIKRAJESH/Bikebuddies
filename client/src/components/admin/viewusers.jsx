import { useEffect, useState } from 'react';
import AXIOS from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
export default function ViewUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const url = import.meta.env.VITE_BASE_URL;
        console.log(url);
        AXIOS.get(`${url}/admin/viewusers`)
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => console.log(err));
    }, []);
    const url = import.meta.env.VITE_BASE_URL;
    console.log(url);
    const deleteUser = (id) => {    
        AXIOS.delete(`${url}/admin/deleteuser/${id}`)
            .then(res => {
                toast.error(res.data);
                setUsers(prevUsers => prevUsers.filter(u => u._id !== id));
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <Typography variant="h4" gutterBottom>View Users</Typography>
            <ToastContainer/>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>SI</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={user._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{user.fullname}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="contained" 
                                        color="error" 
                                        onClick={() => deleteUser(user._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
