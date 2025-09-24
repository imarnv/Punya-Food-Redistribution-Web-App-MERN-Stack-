// client/src/pages/RegisterPage.jsx

import React from 'react';
import { Container, Grid, Card, CardActionArea, CardMedia, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const roles = [
    {
        name: 'Hotel / Restaurant',
        role: 'hotel',
        imagePath: '/assets/hotel.jpg', // Path for your hotel image
    },
    {
        name: 'NGO / Orphanage',
        role: 'ngo',
        imagePath: '/assets/ngo.png', // Path for your NGO image
    },
    {
        name: 'Volunteer Driver',
        role: 'volunteer',
        imagePath: '/assets/volunteer.png', // Path for your volunteer image
    },
];

const RegisterPage = () => {
    const navigate = useNavigate();

    // When a card is clicked, navigate to a new form page with the role selected
    const handleRoleSelect = (role) => {
        navigate(`/register-form?role=${role}`);
    };

    return (
        <Container maxWidth="lg" sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h3" gutterBottom>Join Punya</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 6 }}>
                Choose your role to get started.
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {roles.map((roleInfo) => (
                    <Grid item xs={12} sm={6} md={4} key={roleInfo.role}>
                        <Card sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden' }}>
                            <CardActionArea onClick={() => handleRoleSelect(roleInfo.role)}>
                                <CardMedia
                                    component="img"
                                    height="400"
                                    image={roleInfo.imagePath}
                                    alt={roleInfo.name}
                                    sx={{ filter: 'brightness(0.6)' }}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        width: '100%',
                                        color: 'white',
                                        p: 3,
                                    }}
                                >
                                    <Typography variant="h5" fontWeight="bold">
                                        Join us as a {roleInfo.name}
                                    </Typography>
                                </Box>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default RegisterPage;