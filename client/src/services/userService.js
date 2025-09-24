// client/src/services/userService.js
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/users/';

const getLeaderboard = () => {
    return axios.get(API_URL + 'leaderboard');
};

const userService = {
    getLeaderboard,
};

export default userService;