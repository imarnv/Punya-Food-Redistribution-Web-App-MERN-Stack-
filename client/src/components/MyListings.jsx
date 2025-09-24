// client/src/components/MyListings.jsx

import React, { useState } from 'react';
import { Box, Typography, Card, List, ListItem, ListItemText, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ChatIcon from '@mui/icons-material/Chat';
import listingService from '../services/listingService';
import ChatModal from './ChatModal';
import authService from '../services/authService';

const MyListings = ({ listings, setListings }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [selectedListing, setSelectedListing] = useState(null);
    const currentUser = authService.getCurrentUser();

    const handleDelete = async (listingId) => {
        if (window.confirm('Are you sure you want to delete this listing?')) {
            try {
                await listingService.deleteListing(listingId);
                setListings(listings.filter(listing => listing._id !== listingId));
            } catch (error) {
                alert('Failed to delete listing.');
            }
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
            <Typography variant="h5" gutterBottom>
                My Posted Listings
            </Typography>
            {listings.length === 0 ? (
                <Typography>You have not posted any listings yet.</Typography>
            ) : (
                <List>
                    {listings.map((listing) => (
                        <Card key={listing._id} sx={{ mb: 2, backgroundColor: 'background.paper' }}>
                            <ListItem>
                                <ListItemText
                                    primary={listing.foodName}
                                    secondary={`Status: ${listing.status} | Quantity: ${listing.quantity}`}
                                />
                                {/* --- THIS IS THE FIX --- */}
                                {/* The Chat button is now always visible */}
                                <Button
                                    variant="outlined"
                                    startIcon={<ChatIcon />}
                                    onClick={() => handleOpenChat(listing)}
                                    sx={{ mx: 2 }}
                                >
                                    Chat
                                </Button>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(listing._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        </Card>
                    ))}
                </List>
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

export default MyListings;