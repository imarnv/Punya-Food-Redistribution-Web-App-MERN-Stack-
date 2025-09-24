// server/socketHandler.js
const FoodListing = require('./models/foodListing.model');

function initializeSocket(io) {
    // This function runs every time a new user connects to our Socket.IO server
    io.on('connection', (socket) => {
        console.log(`🔌 New user connected: ${socket.id}`);

        // --- 1. Event for Joining a Chat Room ---
        socket.on('joinRoom', (listingId) => {
            socket.join(listingId);
            console.log(`User ${socket.id} joined room: ${listingId}`);
        });

        // --- 2. Event for Sending a Message ---
        socket.on('sendMessage', async (data) => {
            const { listingId, message, senderName } = data;
            
            try {
                // Save the new message to the database
                const newMessage = { senderName, message };
                await FoodListing.findByIdAndUpdate(listingId, {
                    $push: { chatHistory: newMessage }
                });

                // Broadcast the new message to everyone in the room
                io.in(listingId).emit('receiveMessage', {
                    ...newMessage, // Send the saved message data
                    timestamp: new Date()
                });
            } catch (error) {
                console.error("Error in sendMessage:", error);
            }
        });

        // --- 3. Event for When a User Disconnects ---
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
}

module.exports = initializeSocket;