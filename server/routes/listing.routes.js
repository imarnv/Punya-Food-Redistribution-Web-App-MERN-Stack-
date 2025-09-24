// server/routes/listing.routes.js

const express = require('express');
const router = express.Router();
const { 
    createListing, 
    getAvailableListings, 
    claimListing,
    getMyListings,
    deleteListing,
    getAvailableDeliveries,
    acceptDelivery
} = require('../controllers/listing.controller');
const { protect } = require('../middleware/auth.middleware');

// Public route - anyone can see available food
router.get('/', getAvailableListings);

// Private route to get a user's own listings
router.get('/mylistings', protect, getMyListings);

// Private routes for volunteers
router.get('/deliveries', protect, getAvailableDeliveries);
router.patch('/:id/accept', protect, acceptDelivery);

// Private route - only logged-in users can create a listing
router.post('/', protect, createListing);

// Private route - only logged-in users (NGOs) can claim a listing
router.patch('/:id/claim', protect, claimListing);

// Private route to delete a listing
router.delete('/:id', protect, deleteListing);

module.exports = router;