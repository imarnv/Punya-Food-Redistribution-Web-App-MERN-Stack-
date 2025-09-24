// client/src/components/AvailableListings.jsx

import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, CardMedia, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import listingService from '../services/listingService';
import ChatModal from './ChatModal';
import authService from '../services/authService';

const categoryImages = {
  'Veg': '/assets/veg_food.jpg',
  'Non-Veg': '/assets/non_veg_food.jpg',
  'Milk': '/assets/milk_item.png',
};

const AvailableListings = () => {
    const [listings, setListings] = useState([]);
    const [filteredListings, setFilteredListings] = useState([]);
    const [filter, setFilter] = useState('All');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [selectedListing, setSelectedListing] = useState(null);
    const currentUser = authService.getCurrentUser();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const data = await listingService.getAvailableListings();
                setListings(data);
                setFilteredListings(data);
            } catch (error) {
                console.error("Failed to fetch listings:", error);
            }
        };
        fetchListings();
    }, []);
    
    useEffect(() => {
        if (filter === 'All') {
            setFilteredListings(listings);
        } else {
            setFilteredListings(listings.filter(listing => listing.category === filter));
        }
    }, [filter, listings]);

    const handleClaim = async (listingId) => {
        try {
            await listingService.claimListing(listingId);
            alert('Food claimed successfully!');
            const updatedListings = listings.filter(listing => listing._id !== listingId);
            setListings(updatedListings);
        } catch (error) {
            alert('Failed to claim food. It might have already been taken.');
            console.error("Claiming failed:", error);
        }
    };

    const handleOpenChat = (listing) => {
        setSelectedListing(listing);
        setIsChatOpen(true);
    };

    const handleCloseChat = () => {
        setIsChatOpen(false);
        setSelectedListing(null);
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                 <Typography variant="h5">Available Food Donations</Typography>
                 <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>Filter by Category</InputLabel>
                    <Select value={filter} label="Filter by Category" onChange={(e) => setFilter(e.target.value)}>
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Veg">Veg</MenuItem>
                        <MenuItem value="Non-Veg">Non-Veg</MenuItem>
                        <MenuItem value="Milk">Milk Items</MenuItem>
                    </Select>
                 </FormControl>
            </Box>
            
            {filteredListings.length === 0 ? (
                <Typography>No available food listings match your filter.</Typography>
            ) : (
                <Grid container spacing={3}>
                    {filteredListings.map((listing) => (
                        <Grid item xs={12} md={6} lg={4} key={listing._id}>
                            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <CardMedia component="img" height="160" image={categoryImages[listing.category] || '/assets/default-food.jpg'} alt={listing.foodName} />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" component="div">{listing.foodName}</Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">From: {listing.postedBy ? listing.postedBy.name : 'Unknown'}</Typography>
                                    <Typography variant="body2"><strong>Quantity:</strong> {listing.quantity}</Typography>
                                    <Typography variant="body2"><strong>Pickup By:</strong> {new Date(listing.pickupTime).toLocaleString()}</Typography>
                                </CardContent>
                                <Box sx={{ p: 2, pt: 0, display: 'flex', gap: 1 }}>
                                    <Button fullWidth variant="outlined" onClick={() => handleOpenChat(listing)}>Chat</Button>
                                    <Button fullWidth variant="contained" onClick={() => handleClaim(listing._id)}>Claim Food</Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
            
            {selectedListing && (
                <ChatModal
                    open={isChatOpen}
                    handleClose={handleCloseChat}
                    listing={selectedListing}
                    currentUser={currentUser}
                />
            )}
        </Box>
    );
};

export default AvailableListings;