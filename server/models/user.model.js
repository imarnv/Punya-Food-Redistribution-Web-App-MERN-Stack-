// server/models/user.model.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// We no longer need the geocoder here

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name."]
    },
    email: {
        type: String,
        required: [true, "Please provide an email."],
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, "Please enter a valid email address."]
    },
    password: {
        type: String,
        required: [true, "Please provide a password."],
        minlength: 6,
        select: false
    },
    role: {
        type: String,
        enum: ['hotel', 'ngo', 'volunteer'],
        required: true
    },
    city: {
        type: String,
        required: [true, 'Please provide a city']
    },
    location: { // The GeoJSON point
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String
    },
    donationsCount: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

// This hook will now ONLY handle password hashing
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;