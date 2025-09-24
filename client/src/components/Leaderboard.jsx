// client/src/components/Leaderboard.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Paper, CircularProgress } from '@mui/material';
import userService from '../services/userService';

const Leaderboard = () => {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaders = async () => {
            try {
                const response = await userService.getLeaderboard();
                setLeaders(response.data);
            } catch (error) {
                console.error("Failed to fetch leaderboard:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaders();
    }, []);

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>;
    }

    return (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h4" fontWeight="700" align="center" gutterBottom>
                Top Donors
            </Typography>
            <List>
                {leaders.map((leader, index) => (
                    <ListItem key={leader._id} divider={index < leaders.length - 1}>
                        <ListItemIcon sx={{ fontSize: '1.5rem', minWidth: 40 }}>
                            {index === 0 ? '🏆' : `${index + 1}.`}
                        </ListItemIcon>
                        <ListItemText
                            primary={leader.name}
                            primaryTypographyProps={{ fontWeight: 'bold' }}
                            secondary={`${leader.donationsCount} Donations`}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default Leaderboard;