// server/routes/user.routes.js
const express = require('express');
const router = express.Router();
const { getLeaderboard } = require('../controllers/user.controller.js');

router.get('/leaderboard', getLeaderboard);

module.exports = router;