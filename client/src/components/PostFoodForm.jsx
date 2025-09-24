// client/src/components/PostFoodForm.jsx

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, ToggleButton, ToggleButtonGroup, FormControl, FormLabel } from '@mui/material';
import listingService from '../services/listingService';

// ... getLocalDateTime helper function remains the same ...
const getLocalDateTime = () => { /* ... */ };

const PostFoodForm = ({ onPostSuccess }) => {
    const [formData, setFormData] = useState({
        foodName: '',
        description: '',
        quantity: '',
        pickupTime: getLocalDateTime(),
        category: 'Veg', // <-- Add category to state, default to 'Veg'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (event, newCategory) => {
        if (newCategory !== null) { // Ensure a category is always selected
            setFormData({ ...formData, category: newCategory });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await listingService.createListing(formData);
            alert('Food listing created successfully!');
            // Reset form
            setFormData({ foodName: '', description: '', quantity: '', pickupTime: getLocalDateTime(), category: 'Veg' });
            if (onPostSuccess) onPostSuccess();
        } catch (error) {
            alert('Failed to create listing. Please try again.');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 3, p: 3, border: '1px solid #ddd', borderRadius: 2, backgroundColor: 'background.paper' }}>
            <Typography variant="h5" component="h2" gutterBottom>Create New Food Listing</Typography>
            
            {/* --- NEW CATEGORY TOGGLE --- */}
            <FormControl component="fieldset">
                <FormLabel component="legend">Food Category</FormLabel>
                <ToggleButtonGroup
                    color="primary"
                    value={formData.category}
                    exclusive
                    onChange={handleCategoryChange}
                    aria-label="food category"
                >
                    <ToggleButton value="Veg">Veg</ToggleButton>
                    <ToggleButton value="Non-Veg">Non-Veg</ToggleButton>
                    <ToggleButton value="Milk">Milk Items</ToggleButton>
                </ToggleButtonGroup>
            </FormControl>
            
            {/* ... other form fields are the same ... */}
            <TextField label="Food Name / Title" name="foodName" value={formData.foodName} onChange={handleChange} required />
            <TextField label="Description" name="description" value={formData.description} onChange={handleChange} multiline rows={3} required />
            <TextField label="Quantity" name="quantity" value={formData.quantity} onChange={handleChange} required />
            <TextField label="Pickup Deadline" name="pickupTime" type="datetime-local" value={formData.pickupTime} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
            <Button type="submit" variant="contained" size="large">Post Listing</Button>
        </Box>
    );
};

export default PostFoodForm;