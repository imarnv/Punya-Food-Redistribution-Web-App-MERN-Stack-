// server/controllers/auth.controller.js

const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const geocoder = require('../utils/geocoder');

// Helper function to generate a JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token will expire in 30 days
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role, city } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // --- THIS IS THE NEW LOGIC ---
        // 1. Geocode the city to get location data BEFORE creating the user
        const loc = await geocoder.geocode(city);
        const location = {
            type: 'Point',
            coordinates: [loc[0].longitude, loc[0].latitude],
            formattedAddress: loc[0].formattedAddress
        };
        // -----------------------------

        // 2. Create the new user, now including the location data
        const user = await User.create({
            name,
            email,
            password,
            role,
            city,
            location // <-- Pass the generated location object here
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error("Error during registration:", error); 
        res.status(500).json({ message: 'Server error' });
    }
};
// @desc    Authenticate user & get token (Login)
// @route   POST /api/auth/login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find the user by email
        // We add .select('+password') because we set select:false in the model
        const user = await User.findOne({ email }).select('+password');

        // 2. Check if user exists and if the password matches
        if (user && (await user.matchPassword(password))) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            // Use a generic message for security
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};