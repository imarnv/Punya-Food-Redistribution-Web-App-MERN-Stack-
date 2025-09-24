import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Container, Divider, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// Import all the components the dashboard might show
import PostFoodForm from '../components/PostFoodForm';
import AvailableListings from '../components/AvailableListings';
import MyListings from '../components/MyListings';

// Import the service to fetch data
import listingService from '../services/listingService';

const DashboardPage = () => {
    // Get the current user's data from browser storage
    const userData = JSON.parse(localStorage.getItem('user'));
    
    // This state is only for the hotel user's list of their own posts
    const [myListings, setMyListings] = useState([]);

    // This function fetches the hotel's personal listings and is passed to children components
    const fetchMyListings = async () => {
        if (userData?.role === 'hotel') {
            try {
                const data = await listingService.getMyListings();
                setMyListings(data);
            } catch (error) {
                console.error("Failed to fetch my listings:", error);
            }
        }
    };

    // When the dashboard first loads, fetch the hotel's listings
    useEffect(() => {
        fetchMyListings();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ marginTop: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h4">
                        Welcome, {userData ? userData.name : 'User'}!
                    </Typography>
                    <Button variant="contained" color="secondary" onClick={handleLogout}>
                        Logout
                    </Button>
                </Box>
                
                {/* --- Content for Hotel Users --- */}
                {userData && userData.role === 'hotel' && (
                    <>
                        <PostFoodForm onPostSuccess={fetchMyListings} />
                        <Divider sx={{ my: 4 }} />
                        <MyListings listings={myListings} setListings={setMyListings} />
                    </>
                )}

                {/* --- Content for NGO Users --- */}
                {userData && userData.role === 'ngo' && (
                    <AvailableListings />
                )}

                {/* --- Content for Volunteer Users --- */}
                {userData && userData.role === 'volunteer' && (
                    <Paper sx={{ p: 4, textAlign: 'center' }}>
                        <Typography variant="h6">Thank you for your help!</Typography>
                        <Typography>Click the button below to see available deliveries in your area.</Typography>
                        <Button variant="contained" component={RouterLink} to="/volunteer-dashboard" sx={{ mt: 2 }}>
                            View Available Deliveries
                        </Button>
                    </Paper>
                )}
            </Box>
        </Container>
    );
};

export default DashboardPage;