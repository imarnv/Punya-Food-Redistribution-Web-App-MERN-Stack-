// client/src/pages/VolunteerDashboard.jsx

import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Card, CardContent, Button, Grid, CircularProgress } from '@mui/material';
import listingService from '../services/listingService';
import DeliveryMap from '../components/DeliveryMap';

const VolunteerDashboard = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const [loading, setLoading] = useState(true);
    const userData = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
    const fetchDeliveries = async () => {
        try {
            const data = await listingService.getAvailableDeliveries();
            // --- THIS IS THE CRUCIAL LOG ---
            console.log("Data received from backend:", data);
            setDeliveries(data);
        } catch (error) {
            console.error("Failed to fetch deliveries:", error);
        } finally {
            setLoading(false);
        }
    };
    fetchDeliveries();
}, []);
    const handleAccept = async (deliveryId) => {
        try {
            const delivery = deliveries.find(d => d._id === deliveryId);
            // We call the acceptDelivery function here
            await listingService.acceptDelivery(deliveryId);
            setSelectedDelivery(delivery);
            setDeliveries(deliveries.filter(d => d._id !== deliveryId));
        } catch (error) {
            alert('Failed to accept delivery.');
        }
    };

    if (loading) {
        return <Container sx={{textAlign: 'center', mt: 8}}><CircularProgress /></Container>;
    }

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" sx={{ my: 4 }}>Welcome, {userData.name}!</Typography>
            
            {selectedDelivery ? (
                <Box>
                    <Typography variant="h5" gutterBottom>Delivery Details</Typography>
                    {selectedDelivery.postedBy?.location && selectedDelivery.claimedBy?.location ? (
                        <DeliveryMap pickup={selectedDelivery.postedBy} dropoff={selectedDelivery.claimedBy} />
                    ) : (
                        <Typography color="error">Map data is unavailable for this delivery.</Typography>
                    )}
                    <Button sx={{mt: 2}} onClick={() => setSelectedDelivery(null)}>Back to List</Button>
                </Box>
            ) : (
                <Box>
                    <Typography variant="h5" gutterBottom>Available Deliveries</Typography>
                    <Grid container spacing={3}>
                        {deliveries.length > 0 ? deliveries.map(item => (
                            item.postedBy && item.claimedBy && (
                                <Grid item key={item._id} xs={12} md={6}>
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h6">{item.foodName}</Typography>
                                            <Typography color="text.secondary">From: {item.postedBy.name} ({item.postedBy.city})</Typography>
                                            <Typography color="text.secondary">To: {item.claimedBy.name} ({item.claimedBy.city})</Typography>
                                            <Button variant="contained" sx={{ mt: 2 }} onClick={() => handleAccept(item._id)}>Accept Delivery</Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        )) : <Typography sx={{ml: 3}}>No available deliveries right now. Check back soon!</Typography>}
                    </Grid>
                </Box>
            )}
        </Container>
    );
};

export default VolunteerDashboard;