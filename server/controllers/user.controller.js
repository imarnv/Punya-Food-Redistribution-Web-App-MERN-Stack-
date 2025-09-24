// server/controllers/user.controller.js
const User = require('../models/user.model');

// @desc    Get top donating hotels for the leaderboard
// @route   GET /api/users/leaderboard
exports.getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await User.find({ role: 'hotel' })
            .sort({ donationsCount: -1 }) // Sort by most donations
            .limit(5) // Get the top 5
            .select('name donationsCount'); // Only send back name and count

        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};