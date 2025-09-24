import { Box, Typography, Divider, Grid, Paper } from '@mui/material';
import { Element } from 'react-scroll';

const TechStackSection = () => {
  return (
    <Element name="tech-stack">
      <Box sx={{ py: 8, px: 4, backgroundColor: '#fafafa' }}>
        <Typography 
          variant="h4" 
          align="center" 
          sx={{ fontWeight: 'bold', mb: 4 }}
        >
          Our Tech Stack
        </Typography>

        <Grid container spacing={4} alignItems="stretch">
          {/* Frontend Section */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={3} 
              sx={{ p: 4, height: '100%', borderRadius: 3 }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                Frontend
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                <Typography variant="body1">React.js</Typography>
                <Typography variant="body1">Material-UI</Typography>
                <Typography variant="body1">React Router</Typography>
                <Typography variant="body1">React Scroll</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Backend Section */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={3} 
              sx={{ p: 4, height: '100%', borderRadius: 3 }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                Backend
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                <Typography variant="body1">Node.js</Typography>
                <Typography variant="body1">Express.js</Typography>
                <Typography variant="body1">MongoDB</Typography>
                <Typography variant="body1">JWT Authentication</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Element>
  );
};

export default TechStackSection;
