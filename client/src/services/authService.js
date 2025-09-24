// client/src/services/authService.js
// Replace the entire file's content

import axios from 'axios';

const API_URL = 'http://localhost:5001/api/auth/';

const register = (userData) => {
    return axios.post(API_URL + 'register', userData);
};

const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

// --- ADD THIS NEW FUNCTION ---
const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const authService = {
    register,
    login,
    logout,
    getCurrentUser, // <-- EXPORT IT
};

export default authService;