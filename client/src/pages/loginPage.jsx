// client/src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // <-- IMPORT useNavigate
import authService from '../services/authService';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate(); // <-- INITIALIZE THE HOOK

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.login(formData);
            // Replace the alert with a redirect to the dashboard
            navigate('/dashboard'); // <-- REDIRECT ON SUCCESS
        } catch (error) {
            const message = error.response?.data?.message || "Login failed. Please check your credentials.";
            alert(message);
        }
    };

    // ... the rest of your return JSX for the form is the same
    return (
        <Container maxWidth="sm">
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Typography component="h1" variant="h4">
                    Sign In
                </Typography>
                <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
            </Box>
        </Container>
    );
};

export default LoginPage;