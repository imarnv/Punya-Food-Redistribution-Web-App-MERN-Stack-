// client/src/socket.js
import { io } from 'socket.io-client';

// Connect to your backend server's URL
const URL = 'http://localhost:5001';
const socket = io(URL);

export default socket;