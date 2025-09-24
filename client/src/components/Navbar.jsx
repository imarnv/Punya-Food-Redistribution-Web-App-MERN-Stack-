// client/src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import authService from '../services/authService';

// PunyaLogo component
const PunyaLogo = () => (
  <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M50 95C47.2828 82.643 35.8582 72.8437 25 70C25 58.4234 32.235 48.2435 42.4264 42.4264C48.2435 32.235 58.4234 25 70 25C72.8437 35.8582 82.643 47.2828 95 50C82.643 52.7172 72.8437 64.1418 70 75C58.4234 75 48.2435 67.765 42.4264 57.5736C32.235 51.7565 25 41.5766 25 30C27.1563 17.3569 37.3569 7.15628 50 5C62.6431 7.15628 72.8437 17.3569 75 30C75 41.5766 67.765 51.7565 57.5736 57.5736C51.7565 67.765 41.5766 75 30 75C17.3569 72.8437 7.15628 62.6431 5 50C7.15628 37.3569 17.3569 27.1563 30 25C41.5766 25 51.7565 32.235 57.5736 42.4264C67.765 48.2435 75 58.4234 75 70C72.8437 82.643 62.6431 92.8437 50 95Z"
      fill="currentColor"
    />
  </svg>
);

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(authService.getCurrentUser());
  }, [location.pathname]);

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)', backdropFilter: 'blur(8px)' }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo */}
          <RouterLink
            to="/"
            style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}
          >
            <Box sx={{ color: 'primary.main', mr: 1 }}>
              <PunyaLogo />
            </Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              Punya
            </Typography>
          </RouterLink>

          <Box sx={{ flexGrow: 1 }} />

          {currentUser ? (
            <>
              <Button color="inherit" component={RouterLink} to="/dashboard">
                Dashboard
              </Button>
              <Button color="primary" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              {/* Smooth scroll only works when on homepage */}
              {location.pathname === '/' && (
                <ScrollLink to="tech-stack" smooth={true} duration={600} offset={-70}>
                  <Button color="inherit">Tech Stack</Button>
                </ScrollLink>
              )}

              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button variant="contained" component={RouterLink} to="/register" sx={{ ml: 2 }}>
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
