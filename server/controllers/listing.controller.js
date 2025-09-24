// server/controllers/listing.controller.js

const FoodListing = require('../models/foodListing.model');
const User = require('../models/user.model');

// @desc    Create a new food listing
// @route   POST /api/listings
exports.createListing = async (req, res) => {
    try {
        const { foodName, description, quantity, pickupTime, category } = req.body;
        
        const newListing = new FoodListing({
            foodName,
            description,
            quantity,
            pickupTime,
            category,
            postedBy: req.user.id,
            status: 'Available' // <-- THIS IS THE FIX
        });

        const savedListing = await newListing.save();
        res.status(201).json(savedListing);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Get all available food listings
// @route   GET /api/listings
exports.getAvailableListings = async (req, res) => {
    try {
        const listings = await FoodListing.find({ status: 'Available' })
            .populate('postedBy', 'name address')
            .sort({ createdAt: -1 });

        // --- THIS IS THE MOST IMPORTANT LOG ---
        // It will show us exactly what the database found.
        
        res.status(200).json(listings);
    } catch (error) {
        console.error("Error in getAvailableListings:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
// server/controllers/listing.controller.js
// Add this new function to the file. You can put it after getAvailableListings.

// @desc    Get all listings for the logged-in user
// @route   GET /api/listings/mylistings
exports.getMyListings = async (req, res) => {
    try {
        // req.user.id is available from our 'protect' middleware
        const listings = await FoodListing.find({ postedBy: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Delete a listing
// @route   DELETE /api/listings/:id
exports.deleteListing = async (req, res) => {
    try {
        const listing = await FoodListing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        // Check if the user trying to delete is the one who posted it
        if (listing.postedBy.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await listing.deleteOne();
        res.status(200).json({ message: 'Listing removed' });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    An NGO claims a food listing
// @route   PATCH /api/listings/:id/claim
exports.claimListing = async (req, res) => {
    try {
        const listing = await FoodListing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        
        if (listing.status !== 'Available') {
            return res.status(400).json({ message: 'This food has already been claimed or is expired' });
        }

        listing.status = 'Claimed';
        listing.claimedBy = req.user.id; // The NGO user's ID
        await User.findByIdAndUpdate(listing.postedBy, { $inc: { donationsCount: 1 } });


        const updatedListing = await listing.save();
        res.status(200).json(updatedListing);

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Get listings that are claimed but need a driver
// @route   GET /api/listings/deliveries
exports.getAvailableDeliveries = async (req, res) => {
    try {
        const listings = await FoodListing.find({ 
            status: 'Claimed',
            deliveryAcceptedBy: null 
        })
        .populate({ path: 'postedBy', select: 'name city location' })
        .populate({ path: 'claimedBy', select: 'name city location' })
        .sort({ createdAt: -1 });

        // --- THIS IS THE CRUCIAL LOG ---

        const validListings = listings.filter(listing => listing.postedBy && listing.claimedBy);
        res.status(200).json(validListings);
    } catch (error) {
        console.error("ERROR in getAvailableDeliveries:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    A volunteer accepts a delivery
// @route   PATCH /api/listings/:id/accept
exports.acceptDelivery = async (req, res) => {
    try {
        const listing = await FoodListing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        
        listing.deliveryAcceptedBy = req.user.id; // Assign the logged-in volunteer

        const updatedListing = await listing.save();
        res.status(200).json(updatedListing);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};