// client/src/services/listingService.js

import axios from 'axios';

const API_URL = 'http://localhost:5001/api/listings/';

const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return { headers: { Authorization: `Bearer ${user.token}` } };
};

const createListing = async (listingData) => {
    const response = await axios.post(API_URL, listingData, getAuthHeaders());
    return response.data;
};

const getAvailableListings = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const claimListing = async (listingId) => {
    const response = await axios.patch(`${API_URL}${listingId}/claim`, {}, getAuthHeaders());
    return response.data;
};

// --- THIS IS THE NEW, CORRECT FUNCTION ---
const getAvailableDeliveries = async () => {
    const response = await axios.get(API_URL + 'deliveries', getAuthHeaders());
    return response.data;
};

// --- ADDED A NEW FUNCTION FOR VOLUNTEERS TO ACCEPT ---
const acceptDelivery = async (listingId) => {
    const response = await axios.patch(`${API_URL}${listingId}/accept`, {}, getAuthHeaders());
    return response.data;
};


const getMyListings = async () => {
    const response = await axios.get(API_URL + 'mylistings', getAuthHeaders());
    return response.data;
};

const deleteListing = async (listingId) => {
    const response = await axios.delete(API_URL + listingId, getAuthHeaders());
    return response.data;
};

const listingService = {
    createListing,
    getAvailableListings,
    claimListing,
    getMyListings,
    deleteListing,
    getAvailableDeliveries, // <-- EXPORT IT
    acceptDelivery,         // <-- EXPORT IT
};

export default listingService;