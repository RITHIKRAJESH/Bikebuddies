import { useState } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import axios from 'axios';

// Styled form container
const FormContainer = styled(motion.div)({
    maxWidth: '400px',
    margin: 'auto',
    padding: '2rem',
    background: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)', 
});

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = { email, password };
        const url = 'http://localhost:9000/user/login';

        try {
            const res = await axios.post(url, payload);
            alert(res.data.message);
            localStorage.setItem("email", email);
            setEmail('');
            setPassword('');
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong!');
        }
    };

    return (
        <Container>
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
                    <FormContainer whileHover={{ scale: 1.02 }}>
                        <Typography variant="h5" textAlign="center" mb={2} fontWeight={600}>Login</Typography>

                        <TextField
                            fullWidth
                            label="Email"
                            margin="normal"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            margin="normal"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && <Typography color="error" variant="body2" textAlign="center" mt={2}>{error}</Typography>}

                        <motion.div whileTap={{ scale: 0.9 }}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                                onClick={handleSubmit}
                            >
                                Login
                            </Button>
                        </motion.div>

                        <Typography variant="body2" textAlign="center" mt={2}>
                            Don't have an account? <Button variant="text" href="/register">Register</Button>
                        </Typography>
                    </FormContainer>
                </motion.div>
            </Box>
        </Container>
    );
};

export default LoginPage;
