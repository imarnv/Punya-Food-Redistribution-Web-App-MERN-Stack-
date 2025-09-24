// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme.js';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import BackgroundAnimation from './components/BackgroundAnimation'; // <-- IMPORT
import VolunteerDashboard from './pages/VolunteerDashboard';
import RegisterFormPage from './pages/RegisterFormPage';  
import Footer from './components/footer'; 


// Import Pages
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <BackgroundAnimation /> {/* <-- ADD ANIMATION COMPONENT */}
          <Navbar />
          <main style={{ flexGrow: 1 }}>
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/register-form" element={<RegisterFormPage />} /> 
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
            </Route>
          </Routes>
          </main>
          <Footer /> 
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;