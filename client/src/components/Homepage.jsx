// import React from 'react';
// import { AppBar, Toolbar, Button, Container, Box, Typography, Grid, Avatar, TextField } from '@mui/material';
// import { motion } from 'framer-motion';
// import Slider from 'react-slick';
// import { gsap } from 'gsap';
// import { useEffect } from 'react';

// const navbarStyles = {
//   backgroundColor: '#333',
//   boxShadow: 'none',
// };

// import person1 from '../images/person_1.jpg';
// import person2 from '../images/person_2.jpg';
// import person3 from '../images/person_3.jpg';
// import slider1 from '../images/slide1.webp';
// import slider2 from '../images/slider2.jpg';


// const buttonStyles = {
//   marginLeft: '20px',
//   backgroundColor: '#ff7043',
//   color: 'white',
//   '&:hover': {
//     backgroundColor: '#f4511e',
//   },
// };

// const HomePage = () => {


//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   return (
//     <div>
//       <AppBar position="sticky" sx={navbarStyles}>
//         <Toolbar>
//           <Typography variant="h6">Bike Taxi Service</Typography>
//           <Box ml="auto">
//             <Button sx={buttonStyles} href="#about">About</Button>
//             <Button sx={buttonStyles} href="#testimonials">Testimonials</Button>
//             <Button sx={buttonStyles} href="#contact">Contact</Button>
//             <Button sx={buttonStyles} href="/login">Login</Button>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       <motion.div className="header-text">
//         <Slider {...sliderSettings}>
//           <div>
//             <img src={slider1} alt="slider 1" style={{ width: '100%', height: '80vh', objectFit: 'fill' }} />
//           </div>
//           <div>
//             <img src={slider2} alt="slider 2" style={{ width: '100%', height: '80vh', objectFit: 'fill' }} />
//           </div>
//         </Slider>
//       </motion.div>

//     </div>
//   );
// };

// export default HomePage;


import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Container, Box, Typography, Grid, Avatar, TextField, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { gsap } from 'gsap';
import person1 from '../images/person_1.jpg';
import person2 from '../images/person_2.jpg';
import slider1 from '../images/slide1.webp';
import slider2 from '../images/slider2.jpg';

const navbarStyles = {
  backgroundColor: '#333',
  boxShadow: 'none',
};

const buttonStyles = {
  backgroundColor: '#ff7043',
  color: 'white',
  '&:hover': {
    backgroundColor: '#f4511e',
  },
};

const HomePage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    gsap.fromTo(".header-text", 
      { opacity: 0, y: -100 }, 
      { opacity: 1, y: 0, duration: 1.5, ease: "bounce.out" }
    );
    

    gsap.fromTo(".about-text", 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out", stagger: 0.1 }
    );
    gsap.fromTo(".testimonial-box", 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1.5, stagger: 0.2, ease: "power2.out", delay: 1.5 }
    );
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <AppBar position="sticky" sx={navbarStyles}>
        <Toolbar>
          <Typography variant="h6">Bike Taxi Service</Typography>
          {isMobile ? (
            <IconButton color="inherit" edge="end" onClick={handleDrawerToggle} sx={{ ml: 'auto' }}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box ml="auto">
              <Button sx={buttonStyles} href="#about">About</Button>
              <Button sx={buttonStyles} href="#testimonials">Testimonials</Button>
              <Button sx={buttonStyles} href="#contact">Contact</Button>
              <Button sx={buttonStyles} href="/login">Login</Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <List>
          <ListItem button component="a" href="#about" onClick={handleDrawerToggle}>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button component="a" href="#testimonials" onClick={handleDrawerToggle}>
            <ListItemText primary="Testimonials" />
          </ListItem>
          <ListItem button component="a" href="#contact" onClick={handleDrawerToggle}>
            <ListItemText primary="Contact" />
          </ListItem>
          <ListItem button component="a" href="/login" onClick={handleDrawerToggle}>
            <ListItemText primary="Login" />
          </ListItem>
        </List>
      </Drawer>

      <motion.div className="header-text">
        <Slider {...sliderSettings}>
          <div>
            <img src={slider1} alt="slider 1" style={{ width: '100%', height: '80vh', objectFit: 'cover' }} />
          </div>
          <div>
            <img src={slider2} alt="slider 2" style={{ width: '100%', height: '80vh', objectFit: 'fill' }} />
          </div>
        </Slider>
      </motion.div>
      
      <Container id="about" sx={{ py: 8 }} className="about-text">
        <Typography variant="h4" textAlign="center" mb={3}>About Us</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" mb={2}>About Our Site</Typography>
            <Typography variant="body1">We provide fast and reliable bike taxi services, making transportation more convenient and efficient for everyone.</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" mb={2}>Our Goals & Vision</Typography>
            <Typography variant="body1">Our goal is to revolutionize urban mobility with eco-friendly and affordable bike taxi solutions, ensuring convenience and efficiency for all users.</Typography>
          </Grid>
        </Grid>
      </Container>

      <motion.section id="testimonials">
        <Container>
          <Typography variant="h4" textAlign="center" mb={3}>What Our Customers Say</Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Box className="testimonial-box">
                <Avatar src={person1} alt="John Doe" />
                <Box>
                  <Typography variant="h6">John Doe</Typography>
                  <Typography variant="body2">"Great service! Fast and convenient."</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box className="testimonial-box">
                <Avatar src={person2} alt="Jane Smith" />
                <Box>
                  <Typography variant="h6">Jane Smith</Typography>
                  <Typography variant="body2">"Reliable and affordable bike taxi service!"</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </motion.section>

      <Container id="contact" sx={{ py: 8 }}>
        <Typography variant="h4" textAlign="center" mb={3}>Contact Us</Typography>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <TextField fullWidth label="Name" margin="normal" />
            <TextField fullWidth label="Email" margin="normal" />
            <TextField fullWidth label="Message" margin="normal" multiline rows={4} />
            <Button fullWidth sx={buttonStyles} style={{ marginTop: '10px' }}>Send Enquiry</Button>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ backgroundColor: '#333', padding: '1rem' }}>
        <Typography variant="body2" color="white" textAlign="center">© 2025 All Rights Reserved.</Typography>
      </Box>
    </div>
  );
};

export default HomePage;
