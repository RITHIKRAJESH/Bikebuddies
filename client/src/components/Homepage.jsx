import React from 'react';
import { AppBar, Toolbar, Button, Container, Box, Typography, Grid, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { gsap } from 'gsap';
import { useEffect } from 'react';

// Material UI styling for a custom Navbar
const navbarStyles = {
  backgroundColor: '#333',
  boxShadow: 'none',
};

import person1 from '../images/person_1.jpg';
import person2 from '../images/person_2.jpg';
import person3 from '../images/person_3.jpg';
import person4 from '../images/person_4.jpg';
import slider1 from '../images/slide1.webp';
import slider2 from '../images/slider2.jpg';
import BookRide from './Bookride';

const buttonStyles = {
  marginLeft: '20px',
  backgroundColor: '#ff7043',
  color: 'white',
  '&:hover': {
    backgroundColor: '#f4511e',
  },
};

const HomePage = () => {
  // GSAP effect on component mount
  useEffect(() => {
    gsap.fromTo(".header-text", 
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
    );
    
    // Additional GSAP animation for elements in the About section
    gsap.fromTo(".about-text", 
      { opacity: 0, x: -100 }, 
      { opacity: 1, x: 0, duration: 1.5, ease: "power2.out", delay: 1 }
    );
    gsap.fromTo(".testimonial-box", 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1.5, stagger: 0.2, ease: "power2.out", delay: 1.5 }
    );
  }, []);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      {/* Navbar */}
      <AppBar position="sticky" sx={navbarStyles}>
        <Toolbar>
          <Typography variant="h6">My Stylish Homepage</Typography>
          <Box ml="auto">
            <Button sx={buttonStyles} href="#about">About</Button>
            <Button sx={buttonStyles} href="#testimonials">Testimonials</Button>
            <Button sx={buttonStyles} href="#contact">Contact</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section with Slider */}
      <motion.div
        className="header-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Slider {...sliderSettings}>
          <div>
            <img src={slider1} alt="slider 1" style={{ width: '100%', height: '80vh', objectFit: 'fill' }} />
          </div>
          <div>
            <img src={slider2} alt="slider 2" style={{ width: '100%', height: '80vh', objectFit: 'fill' }} />
          </div>
        </Slider>
      </motion.div>

      {/* About Section with GSAP Animation */}
      <motion.section
        id="about"
        className="about-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Container sx={{ py: 8 }}>
          <Typography variant="h4" textAlign="center" mb={3}>
            About Us
          </Typography>
          <Typography variant="body1" textAlign="center" paragraph>
            We are a company committed to providing the best services for our customers. Our goal is to deliver high-quality products with excellent customer service. With years of experience in the industry, we focus on innovation, customer satisfaction, and sustainable practices.
          </Typography>
          <Typography variant="body1" textAlign="center" paragraph>
            Our team works relentlessly to ensure that we meet and exceed your expectations. Whether it's through our personalized services or our ever-expanding range of products, we promise to always prioritize quality.
          </Typography>
        </Container>
      </motion.section>
      {/* Book Ride */}
     

      {/* Testimonials Section with GSAP Animations */}
      <motion.section
        id="testimonials"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Container>
          <Typography variant="h4" textAlign="center" mb={3}>
            What Our Customers Say
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Box
                className="testimonial-box"
                sx={{
                  backgroundColor: '#f4f4f4',
                  padding: '1rem',
                  borderRadius: '8px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Avatar src={person1} alt="John Doe" sx={{ width: 56, height: 56, marginRight: 2 }} />
                <Box>
                  <Typography variant="h6">John Doe</Typography>
                  <Typography variant="body2" color="textSecondary">
                    "Great service! I'm really happy with the quality and timely delivery of the product."
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                className="testimonial-box"
                sx={{
                  backgroundColor: '#f4f4f4',
                  padding: '1rem',
                  borderRadius: '8px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Avatar src={person2} alt="Jane Smith" sx={{ width: 56, height: 56, marginRight: 2 }} />
                <Box>
                  <Typography variant="h6">Jane Smith</Typography>
                  <Typography variant="body2" color="textSecondary">
                    "The user experience is fantastic! I would highly recommend this platform to anyone."
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                className="testimonial-box"
                sx={{
                  backgroundColor: '#f4f4f4',
                  padding: '1rem',
                  borderRadius: '8px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Avatar src={person3} alt="Mark Lee" sx={{ width: 56, height: 56, marginRight: 2 }} />
                <Box>
                  <Typography variant="h6">Mark Lee</Typography>
                  <Typography variant="body2" color="textSecondary">
                    "An amazing platform that delivers on its promises. Customer support was top-notch!"
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </motion.section>

      {/* Footer Section */}
      <Box sx={{ backgroundColor: '#333', padding: '1rem' }}>
        <Typography variant="body2" color="white" textAlign="center">
          © 2025 All Rights Reserved.
        </Typography>
      </Box>
    </div>
  );
};

export default HomePage;
