// 1. IMPORT DEPENDENCIES
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const initializeSocket = require('./socketHandler');

// 2. INITIALIZE APP & HTTP SERVER
const app = express();
const server = http.createServer(app);

// 3. INITIALIZE SOCKET.IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Allow connections from your React frontend
        methods: ["GET", "POST"]
    }
});
initializeSocket(io);

// 4. MIDDLEWARE
app.use(cors());
app.use(express.json());

// 5. IMPORT & USE API ROUTES
const authRoutes = require('./routes/auth.routes');
const listingRoutes = require('./routes/listing.routes');
const userRoutes = require('./routes/user.routes.js');

app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/users', userRoutes);

// 6. ROOT ROUTE
app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to the Punya API! 🍔" });
});

// 7. CONNECT TO DB & START SERVER
const PORT = process.env.PORT || 5001;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ Successfully connected to MongoDB.");
        // Use server.listen() to start both the API and the chat server
        server.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Database connection failed.", err);
        process.exit(1);
    });