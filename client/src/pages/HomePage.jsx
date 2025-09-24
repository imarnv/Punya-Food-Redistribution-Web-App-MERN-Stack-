// client/src/pages/HomePage.jsx
import React from 'react';
import { Box, Button, Typography, Container, Card, CardMedia, CardContent, List, ListItem, ListItemText, Divider, Grid, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Element } from 'react-scroll';
import Leaderboard from '../components/Leaderboard';

// Section wrapper for animations
const Section = ({ children, sx = {} }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <Box sx={sx}>{children}</Box>
    </motion.div>
  );
};

// Animated stats component
const StatCounter = ({ value, suffix, label }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  return (
    <Box
      ref={ref}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography variant="h3" component="div" color="primary" fontWeight="700" sx={{ lineHeight: 1 }}>
        {inView && <CountUp end={value} duration={2.2} />}
        {suffix}
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
        {label}
      </Typography>
    </Box>
  );
};

const HomePage = () => {
  const steps = [
    {
      title: 'Hotels List Surplus',
      text: 'Hotels and restaurants upload their available surplus food in under a minute.',
      image: '/assets/section2o1.jpg.webp',
    },
    {
      title: 'NGOs Claim Food',
      text: 'Verified NGOs instantly receive alerts and claim what they need.',
      image: '/assets/section2o2.jpg',
    },
    {
      title: 'Volunteers Deliver',
      text: 'Volunteer drivers swiftly pick up and deliver the meals to communities.',
      image: '/assets/section2o3.jpeg',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Section sx={{ display: 'flex', alignItems: 'center', minHeight: '85vh', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" fontWeight={700} gutterBottom>
            Share More. Waste Less.
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Transforming surplus food into hope. Hotels donate, NGOs claim, volunteers deliver — together we end hunger.
          </Typography>
          <Button variant="contained" color="primary" size="large" component={RouterLink} to="/register">
            Get Started
          </Button>
        </Container>
      </Section>

      {/* Why This Is Needed */}
      <Section
        sx={{
          py: 20,
          position: 'relative',
          textAlign: 'center',
          color: 'white',
          backgroundImage: `url('/assets/section1.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            bgcolor: 'rgba(0,0,0,0.65)',
            zIndex: 1,
          }}
        />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h3" fontWeight="700" gutterBottom>
            Millions of meals are wasted while millions go hungry.
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto', mt: 3, fontSize: '1.2rem' }}>
            Punya bridges this painful gap by redirecting surplus food to hungry hands. Donations become effortless,
            tracking is transparent, and impact is immediate — ensuring meals feed people, not landfills.
          </Typography>
        </Container>
      </Section>
      {/* --- ADD THIS NEW LEADERBOARD SECTION --- */}
        <Section sx={{ py: 10 }}>
            <Container maxWidth="md">
                <Leaderboard />
            </Container>
        </Section>

      {/* How It Works */}
      <Section sx={{ py: 10, textAlign: 'center' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight="700" gutterBottom>
            Simple. Impactful. Transparent.
          </Typography>
          <Grid container spacing={4} sx={{ mt: 3 }} justifyContent="center">
            {steps.map((step) => (
              <Grid item key={step.title} xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card elevation={3} sx={{ width: '100%', maxWidth: 360, borderRadius: 3, overflow: 'hidden' }}>
                  <CardMedia component="img" image={step.image} alt={step.title} sx={{ height: 220, objectFit: 'cover' }} />
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" fontWeight="700" gutterBottom>
                      {step.title}
                    </Typography>
                    <Typography color="text.secondary">{step.text}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Impact Section */}
      <Section sx={{ py: 10, bgcolor: 'background.paper', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight="700" gutterBottom>
            Together, we can make a difference.
          </Typography>
          <Grid container spacing={4} sx={{ mt: 3 }} justifyContent="center">
            <Grid item xs={12} sm={4}><StatCounter value={125000} suffix="+" label="Meals Saved" /></Grid>
            <Grid item xs={12} sm={4}><StatCounter value={300} suffix="+" label="NGOs Connected" /></Grid>
            <Grid item xs={12} sm={4}><StatCounter value={500} suffix="+" label="Volunteers Engaged" /></Grid>
          </Grid>
        </Container>
      </Section>

{/* Tech Stack Section */}
<Element name="tech-stack">
  <Section id="techstack" sx={{ py: 12, bgcolor: '#f9fafb' }}>
    <Container maxWidth="lg">
      <Typography
        variant="h3"
        fontWeight="700"
        align="center"
        gutterBottom
      >
        Our Tech Stack
      </Typography>
      <Typography
        variant="body1"
        align="center"
        sx={{ mb: 6, maxWidth: 700, mx: 'auto', color: 'text.secondary' }}
      >
        Powering Punya with a modern, scalable, and efficient technology stack to ensure seamless performance and reliability.
      </Typography>

      {/* Centered Grid */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="stretch" // ensures both cards stretch equally
      >
        {/* Frontend Card */}
        <Grid item xs={12} md={5}>
          <Card
            sx={{
              p: 4,
              borderRadius: '20px',
              boxShadow: 4,
              textAlign: 'left',
              height: '100%', // equal height
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h5" fontWeight="700" gutterBottom align="center">
              Frontend
            </Typography>
            <List sx={{ flexGrow: 1 }}>
              <ListItem><strong>Core Framework:</strong> React.js</ListItem>
              <ListItem><strong>UI Component Library:</strong> Material-UI (MUI)</ListItem>
              <ListItem><strong>Routing:</strong> React Router DOM</ListItem>
              <ListItem><strong>API Communication:</strong> Axios</ListItem>
              <ListItem><strong>Animation:</strong> Framer Motion & React-tsparticles</ListItem>
              <ListItem><strong>Mapping:</strong> Leaflet & React-Leaflet</ListItem>
              <ListItem><strong>Scrolling:</strong> React Scroll</ListItem>
              <ListItem><strong>Build Tool:</strong> Vite</ListItem>
            </List>
          </Card>
        </Grid>

        {/* Backend Card */}
        <Grid item xs={12} md={5}>
          <Card
            sx={{
              p: 4,
              borderRadius: '20px',
              boxShadow: 4,
              textAlign: 'left',
              height: '100%', // equal height
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h5" fontWeight="700" gutterBottom align="center">
              Backend
            </Typography>
            <List sx={{ flexGrow: 1 }}>
              <ListItem><strong>Runtime Environment:</strong> Node.js</ListItem>
              <ListItem><strong>Web Framework:</strong> Express.js</ListItem>
              <ListItem><strong>Database:</strong> MongoDB (Mongoose ODM)</ListItem>
              <ListItem><strong>Authentication:</strong> JWT & bcrypt.js</ListItem>
              <ListItem><strong>Geolocation:</strong> Node Geocoder</ListItem>
              <ListItem><strong>Development Utility:</strong> Nodemon</ListItem>
              <ListItem><strong>Environment Variables:</strong> Dotenv</ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Container>
  </Section>
</Element>


      {/* About Us */}
      <Section sx={{ py: 10, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Grid container spacing={6} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" fontWeight="700" gutterBottom>
                Who We Are
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Punya was born from a simple belief — food should feed people, not landfills. We’re a small team with a
                big mission: stop edible food from being wasted and connect it to communities in need.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/assets/section3.png"
                alt="Our mission"
                sx={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 3, boxShadow: 3 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Section>
    </Box>
  );
};

export default HomePage;
