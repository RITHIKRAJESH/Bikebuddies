import { useState } from 'react';
import { Container, TextField, Button, ToggleButton, ToggleButtonGroup, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled(motion.div)({
    maxWidth: '400px',
    margin: 'auto',
    padding: '2rem',
    background: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
});

const RegisterPage = () => {
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState(null);
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);

    const [fullnameError, setFullnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [otpError, setOtpError] = useState('');

    const navigate = useNavigate();

    const handleToggle = (event, newRole) => {
        if (newRole !== null) {
            setRole(newRole);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Reset previous errors
        setFullnameError('');
        setEmailError('');
        setPasswordError('');
        setOtpError('');
        setError(null);

        // Validate fields
        let valid = true;

        // Full name validation
        if (!fullname) {
            setFullnameError('Full Name is required.');
            valid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            setEmailError('Please enter a valid email address.');
            valid = false;
        }

        // Password validation
        if (!password) {
            setPasswordError('Password is required.');
            valid = false;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long.');
            valid = false;
        }

        if (!valid) return; // Stop submission if validation fails

        const payload = { email, password, role, fullname };
        const url = 'http://localhost:9000/user/register';

        try {
            const res = await axios.post(url, payload);
            alert(res.data.message);

            if (!res.data.error) {
                setIsOtpSent(true); // OTP sent after successful registration
            }

            localStorage.setItem("email", email);
            setEmail('');
            setPassword('');
            setFullName('');
            setRole('user');
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong!');
        }
    };

    const handleOtpSubmit = async () => {
        const email = localStorage.getItem('email');

        // OTP validation
        if (!otp) {
            setOtpError('OTP is required.');
            return;
        } else if (isNaN(otp)) {
            setOtpError('OTP must be a number.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:9000/user/verify-otp', { email, otp });
            alert(response.data.message);
            navigate('/login');
        } catch (error) {
            alert(error.response?.data?.message || 'OTP verification failed!');
        }
    };

    return (
        <Container>
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
                    <FormContainer whileHover={{ scale: 1.02 }}>
                        <Typography variant="h5" textAlign="center" mb={2} fontWeight={600}>Register</Typography>

                        {/* Full Name Field */}
                        <TextField
                            fullWidth
                            label="Full Name"
                            margin="normal"
                            required
                            value={fullname}
                            onChange={(e) => setFullName(e.target.value)}
                            error={!!fullnameError}
                            helperText={fullnameError}
                        />

                        {/* Email Field */}
                        <TextField
                            fullWidth
                            label="Email"
                            margin="normal"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!emailError}
                            helperText={emailError}
                        />

                        {/* Password Field */}
                        <TextField
                            fullWidth
                            label="Password"
                            margin="normal"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!passwordError}
                            helperText={passwordError}
                        />

                        {/* Role Toggle */}
                        <ToggleButtonGroup
                            value={role}
                            exclusive
                            onChange={handleToggle}
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            <ToggleButton value="user">User</ToggleButton>
                            <ToggleButton value="rider">Rider</ToggleButton>
                        </ToggleButtonGroup>

                        {error && <Typography color="error" variant="body2" textAlign="center" mt={2}>{error}</Typography>}

                        {/* OTP Field (Only displayed if OTP is sent) */}
                        {isOtpSent && (
                            <>
                                <TextField
                                    fullWidth
                                    label="Enter OTP"
                                    margin="normal"
                                    type="text"
                                    required
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    error={!!otpError}
                                    helperText={otpError}
                                />
                                <motion.div whileTap={{ scale: 0.9 }}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        sx={{ mt: 2 }}
                                        onClick={handleOtpSubmit}
                                    >
                                        Verify OTP
                                    </Button>
                                </motion.div>
                            </>
                        )}

                        {/* Register Button */}
                        <motion.div whileTap={{ scale: 0.9 }}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                                onClick={handleSubmit}
                            >
                                Register
                            </Button>
                        </motion.div>

                        <Typography variant="body2" textAlign="center" mt={2}>
                            Already have an account? <Button variant="text" href="/login">Login</Button>
                        </Typography>
                    </FormContainer>
                </motion.div>
            </Box>
        </Container>
    );
};

export default RegisterPage;
