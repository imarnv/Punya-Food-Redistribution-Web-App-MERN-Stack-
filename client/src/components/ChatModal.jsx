// client/src/components/ChatModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Box, Modal, Typography, TextField, IconButton, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import socket from '../socket'; // Import our socket connection

// Styling for the modal window
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 0, // No padding on the modal itself
  borderRadius: 3,
  display: 'flex',
  flexDirection: 'column',
  height: '70vh',
};

const ChatModal = ({ open, handleClose, listing, currentUser }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    // Function to scroll to the latest message
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    
    // This effect runs when the modal opens and when new messages arrive
    useEffect(() => {
        if (open) {
            // --- THIS IS THE FIX ---
            // 1. Load the existing chat history from the listing object
            setMessages(listing.chatHistory || []);
            // ---------------------

            // 2. Join the live chat room
            socket.emit('joinRoom', listing._id);

            // 3. Listen for new incoming messages
            socket.on('receiveMessage', (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
                if (message.senderName !== currentUser.name) {
                    setMessages((prevMessages) => [...prevMessages, message]);
                }
            });
        }
        
        // Cleanup function to leave the room and remove listener when the modal closes
        return () => {
            socket.off('receiveMessage');
        };
    }, [open, listing._id]);

    useEffect(scrollToBottom, [messages]); // Scroll whenever messages update

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const messageData = {
                listingId: listing._id,
                message: newMessage,
                senderName: currentUser.name,
            };
            // Send the message to the server
            socket.emit('sendMessage', messageData);
            
            // Add your own message to the chat window immediately
            setMessages([...messages, { ...messageData, isOwnMessage: true }]);
            setNewMessage('');
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                {/* Header */}
                <Box sx={{ p: 2, borderBottom: '1px solid #ddd', bgcolor: 'primary.main', color: 'white', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
                    <Typography variant="h6">Chat about: {listing.foodName}</Typography>
                    <Typography variant="body2">With: {listing.postedBy.name}</Typography>
                </Box>
                
                {/* Message Display Area */}
                <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
                    {messages.map((msg, index) => (
                        <Paper
                            key={index}
                            elevation={1}
                            sx={{
                                p: 1.5,
                                mb: 1,
                                maxWidth: '75%',
                                bgcolor: msg.isOwnMessage ? 'primary.light' : '#e0e0e0',
                                color: msg.isOwnMessage ? 'white' : 'black',
                                ml: msg.isOwnMessage ? 'auto' : '0', // Align right for own messages
                                mr: msg.isOwnMessage ? '0' : 'auto', // Align left for others' messages
                                borderRadius: msg.isOwnMessage ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
                            }}
                        >
                            <Typography variant="caption" sx={{ display: 'block', fontWeight: 'bold' }}>
                                {msg.senderName}
                            </Typography>
                            <Typography variant="body1">{msg.message}</Typography>
                        </Paper>
                    ))}
                    <div ref={messagesEndRef} />
                </Box>
                
                {/* Message Input Form */}
                <Box component="form" onSubmit={handleSendMessage} sx={{ p: 2, borderTop: '1px solid #ddd' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <IconButton type="submit" color="primary">
                                    <SendIcon />
                                </IconButton>
                            ),
                        }}
                    />
                </Box>
            </Box>
        </Modal>
    );
};

export default ChatModal;