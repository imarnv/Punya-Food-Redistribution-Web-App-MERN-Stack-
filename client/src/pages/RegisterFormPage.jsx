// client/src/pages/RegisterFormPage.jsx

import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Container, Paper } from '@mui/material';
import { useSearchParams } from 'react-router-dom'; // <-- Import this hook
import authService from '../services/authService';

const RegisterFormPage = () => {
    const [searchParams] = useSearchParams(); // Hook to read URL parameters
    const selectedRole = searchParams.get('role') || 'hotel'; // Get role from URL

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        city: '',
        role: selectedRole, // Set default role from URL
    });

    // Update the form's role if the URL parameter changes
    useEffect(() => {
        setFormData(prev => ({ ...prev, role: selectedRole }));
    }, [selectedRole]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.register(formData);
            alert(`Registration as a ${formData.role} successful! You can now log in.`);
        } catch (error) {
            const message = error.response?.data?.message || "Registration failed.";
            alert(message);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Typography component="h1" variant="h4">
                        Register as a {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
                    </Typography>
                    <TextField fullWidth label="Full Name / Organization Name" name="name" value={formData.name} onChange={handleChange} required />
                    <TextField fullWidth label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
                    <TextField fullWidth label="Password (min. 6 characters)" name="password" type="password" value={formData.password} onChange={handleChange} required />
                    <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} required />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign Up</Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default RegisterFormPage;