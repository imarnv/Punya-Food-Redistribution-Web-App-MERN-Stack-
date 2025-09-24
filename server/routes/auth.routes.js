// server/routes/auth.routes.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/auth.controller');

// URL: /api/auth/register
router.post('/register', registerUser);

// URL: /api/auth/login
router.post('/login', loginUser);

module.exports = router;