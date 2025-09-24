const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderName: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const foodListingSchema = new mongoose.Schema({
    
    foodName: {
        type: String,
        required: [true, "Please provide a name for the food item."]
    },
    description: {
        type: String,
        required: [true, "Please provide a brief description."]
    },
    quantity: {
        type: String,
        required: [true, "Please specify the quantity (e.g., 'Feeds 10 people')."]
    },
    pickupTime: {
        type: Date,
        required: [true, "Please provide a pickup time."]
    },
    status: {
        type: String,
        enum: ['Available', 'Claimed', 'Expired'],
        default: 'Available'
    },
    category: {
        type: String,
        enum: ['Veg', 'Non-Veg', 'Milk'],
        required: [true, "Please specify a food category."]
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // <-- The fix is here. Ensure ref is 'User' (capital U).
        required: true
    },
    claimedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // <-- The fix is here. Ensure ref is 'User' (capital U).
        default: null
    },
    deliveryAcceptedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // <-- And here as well.
        default: null
    },
    chatHistory: [messageSchema]

}, {
    timestamps: true
});

const FoodListing = mongoose.model('FoodListing', foodListingSchema);

module.exports = FoodListing;