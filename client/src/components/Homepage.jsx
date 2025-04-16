// import React, { useState, useEffect } from 'react';
// import { AppBar, Toolbar, Button, Container, Box, Typography, Grid, Avatar, TextField, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { useMediaQuery } from '@mui/material';
// import { motion } from 'framer-motion';
// import Slider from 'react-slick';
// import { gsap } from 'gsap';
// import axios from 'axios';
// import ReactStars from 'react-stars'; 
// import slider1 from '../images/slide1.webp';
// import logo from '../assets/bikebuddieslogo1.png'
// const navbarStyles = {
//   backgroundColor: '#333',
//   boxShadow: 'none',
// };

// const buttonStyles = {
//   marginLeft: '10px', 
//   backgroundColor: '#ff7043',
//   color: 'white',
//   '&:hover': {
//     backgroundColor: '#f4511e',
//   },
// };

// const buttonStyles1 = { 
//   backgroundColor: '#ff7043',
//   color: 'white',
//   '&:hover': {
//     backgroundColor: '#f4511e',
//   },
// };

// const defaultAvatar = "https://www.w3schools.com/howto/img_avatar.png"; 

// const HomePage = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
  // const isMobile = useMediaQuery('(max-width:600px)');
//   const [reviews, setReviews] = useState([]);
  
//   // Contact form state
  // const [contact, setContact] = useState({
  //   Name: '',
  //   Email: '',
  //   Message: '',
  // });

  // const [errors, setErrors] = useState({
  //   Name: '',
  //   Email: '',
  //   Message: '',
  // });

  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };

  // // Handle form input changes
  // const handleChange = (e) => {
  //   setContact({
  //     ...contact,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // // Simple email validation
  // const validateEmail = (email) => {
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   return emailRegex.test(email);
  // };

  // // Validation function
  // const validateForm = () => {
  //   let formIsValid = true;
  //   const newErrors = { Name: '', Email: '', Message: '' };

  //   // Validate Name
  //   if (!contact.Name) {
  //     newErrors.Name = 'Name is required.';
  //     formIsValid = false;
  //   }

  //   // Validate Email
  //   if (!contact.Email) {
  //     newErrors.Email = 'Email is required.';
  //     formIsValid = false;
  //   } else if (!validateEmail(contact.Email)) {
  //     newErrors.Email = 'Please enter a valid email address.';
  //     formIsValid = false;
  //   }

  //   // Validate Message
  //   if (!contact.Message) {
  //     newErrors.Message = 'Message is required.';
  //     formIsValid = false;
  //   }

  //   setErrors(newErrors);
  //   return formIsValid;
  // };

  // // Handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Validate form
  //   if (!validateForm()) {
  //     return; // Don't submit if form is invalid
  //   }

  //   // Send contact data to backend
  //   axios.post("http://localhost:9000/user/contact", contact)
  //     .then((res) => {
  //       alert(res.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       alert("There was an error submitting the form.");
  //     });
  // };

  // useEffect(() => {
  //   axios.get("http://localhost:9000/admin/viewreviews")
  //     .then((res) => {
  //       const reviewsData = res.data;
  //       setReviews(reviewsData);
  //       console.log(reviewsData);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

//     gsap.fromTo(".header-text", 
//       { opacity: 0, y: -100 }, 
//       { opacity: 1, y: 0, duration: 1.5, ease: "bounce.out" }
//     );

//     gsap.fromTo(".about-text", 
//       { opacity: 0, y: 30 }, 
//       { opacity: 1, y: 0, duration: 1.5, ease: "power2.out", stagger: 0.1 }
//     );

//     gsap.fromTo(".testimonial-box", 
//       { opacity: 0, y: 50 }, 
//       { opacity: 1, y: 0, duration: 1.5, stagger: 0.2, ease: "power2.out", delay: 1.5 }
//     );
//   }, []);

  // const posted = reviews.filter(review => review.reviewstatus === "posted");

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
//           <img src={logo} alt="Logo" style={{ width: "50px", height: "50px",borderRadius:"50%"}} />     
//           <Typography variant="h6"> Bike Buddies</Typography>
//           {isMobile ? (
//             <IconButton color="inherit" edge="end" onClick={handleDrawerToggle} sx={{ ml: 'auto' }}>
//               <MenuIcon />
//             </IconButton>
//           ) : (
//             <Box ml="auto">
//               <Button sx={buttonStyles} href="#about">About</Button>
//               <Button sx={buttonStyles} href="#testimonials">Testimonials</Button>
//               <Button sx={buttonStyles} href="#contact">Contact</Button>
//               <Button sx={buttonStyles} href="/login">Login</Button>
//             </Box>
//           )}
//         </Toolbar>
//       </AppBar>

//       <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
//         <List>
//           <ListItem button component="a" href="#about" onClick={handleDrawerToggle}>
//             <ListItemText primary="About" />
//           </ListItem>
//           <ListItem button component="a" href="#testimonials" onClick={handleDrawerToggle}>
//             <ListItemText primary="Testimonials" />
//           </ListItem>
//           <ListItem button component="a" href="#contact" onClick={handleDrawerToggle}>
//             <ListItemText primary="Contact" />
//           </ListItem>
//           <ListItem button component="a" href="/login" onClick={handleDrawerToggle}>
//             <ListItemText primary="Login" />
//           </ListItem>
//         </List>
//       </Drawer>

//       <motion.div className="header-text">
//         <Slider {...sliderSettings}>
//           <div>
//             <img src={slider1} alt="slider 1" style={{ width: '100%', height: '80vh', objectFit: 'cover' }} />
//           </div>
//           <div>
//             <img src="slider2.jpg" alt="slider 2" style={{ width: '100%', height: '80vh', objectFit: 'fill' }} />
//           </div>
//         </Slider>
//       </motion.div>

//       <Container id="about" sx={{ py: 8 }} className="about-text">
//         <Typography variant="h4" textAlign="center" mb={3}>About Us</Typography>
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={6}>
//             <Typography variant="h5" mb={2}>About Our Site</Typography>
//             <Typography variant="body1">We provide fast and reliable bike taxi services, making transportation more convenient and efficient for everyone.</Typography>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Typography variant="h5" mb={2}>Our Goals & Vision</Typography>
//             <Typography variant="body1">Our goal is to revolutionize urban mobility with eco-friendly and affordable bike taxi solutions, ensuring convenience and efficiency for all users.</Typography>
//           </Grid>
//         </Grid>
//       </Container>

      // <motion.section id="testimonials">
      //   <Container>
      //     <Typography variant="h4" textAlign="center" mb={3}>What Our Customers Say</Typography>
      //     <Grid container spacing={2} justifyContent="center">
      //       {posted.length > 0 ? (
      //         posted.map((review, index) => (
      //           <Grid item xs={12} sm={6} md={4} key={index}>
      //             <Box className="testimonial-box">
      //               <Avatar src={review.profilePic || defaultAvatar} alt={review.username} />
      //               <Box>
      //                 <Typography variant="h6">{review.username}</Typography>
      //                 <ReactStars 
      //                   count={5} 
      //                   value={review.rating} 
      //                   size={24} 
      //                   edit={false} 
      //                   color2={'#ff7043'}  
      //                 />
      //                  <Typography variant="body2">"{review.userId.fullname}"</Typography>
      //                 <Typography variant="body2">"{review.review}"</Typography>
      //               </Box>
      //             </Box>
      //           </Grid>
      //         ))
      //       ) : (
      //         <Typography variant="body1" textAlign="center">No testimonials available.</Typography>
      //       )}
      //     </Grid>
      //   </Container>
      // </motion.section>

      // <Container id="contact" sx={{ py: 8 }}>
      //   <Typography variant="h4" textAlign="center" mb={3}>Contact Us</Typography>
      //   <Grid container justifyContent="center">
      //     <Grid item xs={12} sm={8} md={6}>
      //       {/* Contact Form */}
            // <form onSubmit={handleSubmit}>
            //   <TextField 
            //     fullWidth 
            //     label="Name" 
            //     margin="normal" 
            //     name="Name"
            //     value={contact.Name}
            //     onChange={handleChange}
            //     error={Boolean(errors.Name)}  
            //     helperText={errors.Name}
            //   />
            //   <TextField 
            //     fullWidth 
            //     label="Email" 
            //     margin="normal" 
            //     name="Email"
            //     value={contact.Email}
            //     onChange={handleChange}
            //     error={Boolean(errors.Email)}  
            //     helperText={errors.Email}
            //   />
            //   <TextField 
            //     fullWidth 
            //     label="Message" 
            //     margin="normal" 
            //     name="Message"
            //     value={contact.Message}
            //     onChange={handleChange}
            //     multiline
            //     rows={4}
            //     error={Boolean(errors.Message)}  
            //     helperText={errors.Message}
            //   />
            //   <Button 
            //     type="submit" 
            //     fullWidth 
            //     sx={buttonStyles1} 
            //     style={{ marginTop: '10px' }}
            //   >
            //     Send Enquiry
            //   </Button>
            // </form>
      //     </Grid>
      //   </Grid>
      // </Container>

      // <Box sx={{ backgroundColor: '#333', padding: '1rem' }}>
      //   <Typography variant="body2" color="white" textAlign="center">© 2025 All Rights Reserved.</Typography>
      // </Box>
//     </div>
//   );
// };

// export default HomePage;
import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Container, Box, Typography, Grid, Avatar, TextField, IconButton, Modal } from '@mui/material';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';
import model from '../assets/model.glb';
import logo from '../assets/bikebuddieslogo1.png';
import aboutImage from '../assets/hero-london.webp';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu'
import { toast, ToastContainer } from 'react-toastify';
import socket from './socket';
const navbarStyles = {
  backgroundColor: 'transparent',
  boxShadow: 'none',
  backdropFilter: 'blur(10px)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margintop: '10px',
  padding: '0 20px',
};

const buttonStyles = {
  margin: '0 10px',
  color: 'white',
  '&:hover': {
    color: '#ff7043',
  },
};
const homepageStyles = {
  minHeight: '100vh',
  // background: 'linear-gradient(135deg, #1e1e1e 30%, #ff7043 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  textAlign: 'center',
};

const defaultAvatar = "https://www.w3schools.com/howto/img_avatar.png";

const HomePage = () => {
  const [reviews, setReviews] = useState([]);
  const [contact, setContact] = useState({ Name: '', Email: '', Message: '' });
  const [errors, setErrors] = useState({ Name: '', Email: '', Message: '' });
  const [openLogin, setOpenLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [emailError, setEmailError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState(null);
  const [mobileOpen,setMobileOpen]=useState(null)
  const url = import.meta.env.VITE_BASE_URL;
  console.log(url);

  useEffect(() => {
    const handleReviewPosted = (data) => {
      console.log("Received real-time update:", data);
      axios.get(`${url}/admin/viewreviews`)
        .then((res) => setReviews(res.data))
        .catch((err) => console.log(err));
    };
  
    socket.on("reviewPosted", handleReviewPosted);
  
    // Cleanup function
    return () => {
      socket.off("reviewPosted", handleReviewPosted);
    };
  }, []);
  

  useEffect(() => {
    gsap.fromTo(".hero-image", { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" });
  }, []);

  const navigate = useNavigate();

  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const isMobile = useMediaQuery('(max-width:600px)');

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { Name: '', Email: '', Message: '' };

    if (!contact.Name) newErrors.Name = 'Name is required.', formIsValid = false;
    if (!contact.Email) newErrors.Email = 'Email is required.', formIsValid = false;
    else if (!validateEmail(contact.Email)) newErrors.Email = 'Enter a valid email.', formIsValid = false;
    if (!contact.Message) newErrors.Message = 'Message is required.', formIsValid = false;

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    axios.post(`${url}/user/contact`, contact)
      .then((res) => toast.success(res.data))
      .catch(() => toast.error("Error submitting form."));
  };

  const handleLogin = async () => {
    setEmailError('');
    setOtpError('');
    setError(null);

    if (!isOtpSent) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        setEmailError('Please enter a valid email address.');
        return;
      }

      try {
        await axios.post(`${url}/user/login`, { email });
        setIsOtpSent(true);
        toast.info('OTP sent to your email.');
      } catch (error) {
        setError('Failed to send OTP. Please try again later.');
      }
    } else {
      if (!otp) {
        setOtpError('OTP cannot be empty.');
        return;
      }
      
      try {
        const res = await axios.post(`${url}/user/verify-otplogin`, { email, otp });
        localStorage.setItem("id", res.data.user._id);
        toast.success("Login successful!");
        navigate(res.data.user.role === "rider" ? "/rider" : res.data.user.role === "user" ? "/user/bookride" : "/admin");
      } catch (error) {
        setError('Invalid OTP. Please try again.');
      }
    }
  };
  
  const postedReviews = reviews.filter(review => review.reviewstatus === "posted");
  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div style={{background:'linear-gradient(135deg, #1e1e1e 30%, #ff7043 100%)'}}>
      <ToastContainer/>
      <AppBar position="fixed" sx={navbarStyles}>
      <Toolbar>
          <img src={logo} alt="Logo" style={{ width: "50px", height: "50px",borderRadius:"50%"}} />     
           {isMobile ? (
            <IconButton color="inherit" edge="end" onClick={handleDrawerToggle} sx={{ ml: 'auto' }}>
              {/* <MenuIcon /> */}
            </IconButton>
          ) : (
            <Box ml="auto">
              <Button sx={buttonStyles} href="#about">About</Button>
              <Button sx={buttonStyles} href="#testimonials">Testimonials</Button>
              <Button sx={buttonStyles} href="#contact">Contact</Button>
              <Button sx={{ margin: '0 10px', color: 'white' }} onClick={() => setOpenLogin(true)}>Login</Button></Box>
          )}
        </Toolbar>
      </AppBar>
      <Modal open={openLogin} onClose={() => setOpenLogin(false)}>
        <Box sx={{ width: 300, padding: 4, backgroundColor: 'white', margin: 'auto', mt: 10, borderRadius: 2 }}>
          <Typography variant="h6" textAlign="center">Login</Typography>
          <TextField fullWidth margin="normal" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} error={!!emailError} helperText={emailError} />
          {isOtpSent && <TextField fullWidth margin="normal" label="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} error={!!otpError} helperText={otpError} />}
          {error && <Typography color="error" variant="body2" textAlign="center" mt={2}>{error}</Typography>}
          <Button fullWidth sx={{ mt: 2, backgroundColor: '#ff7043', color: 'white', '&:hover': { backgroundColor: '#f4511e' } }} onClick={handleLogin}>
            {isOtpSent ? 'Verify OTP' : 'Send OTP'}
          </Button>
          <Typography variant="body2" textAlign="center" mt={2}>
            Don't have an account? <Button onClick={() => navigate('/register')} sx={{ color: '#ff7043' }}>Register</Button>
          </Typography>
        </Box>
      </Modal>
      <Box sx={homepageStyles}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <motion.div className="hero-image" whileHover={{ scale: 1.05 }}>
            <model-viewer 
  src={model} 
  alt="3D Model"
  auto-rotate 
  camera-controls 
  ar
  style={{ width: '100%', height: '500px', maxWidth: '800px' }} 
/>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" fontWeight="bold">Welcome to Bike Buddies</Typography>
            <Typography variant="body1" mt={2}>Your fastest and most reliable bike taxi service.</Typography>
            <Button sx={{ mt: 3, backgroundColor: '#ff7043', color: 'white', '&:hover': { backgroundColor: '#f4511e' } }} onClick={() => setOpenLogin(true)}>Get Started</Button>
          </Grid>
        </Grid>
      </Box>

      {/* About Section */}
      <Container id="about" sx={{ py: 8 }} style={{color:"white"}}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold">About Bike Buddies</Typography>
            <Typography variant="body1" mt={2}>
              Bike Buddies is dedicated to providing fast, safe, and affordable bike taxi services.
              Our mission is to make daily commutes hassle-free and convenient for everyone.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <img src={aboutImage} alt="About Us" style={{ width: '100%', borderRadius: '10px' }} />
          </Grid>
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Container id="testimonials" sx={{ py: 8 }} >
        <Typography variant="h4" textAlign="center" mb={3} style={{color:"white"}}>What Our Customers Say</Typography>
        <Grid container spacing={3} justifyContent="center" >
          {postedReviews.length > 0 ? postedReviews.map((review, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} >
              <Box className="testimonial-box" p={3} border={1} borderRadius={2} style={{backgroundColor:"white"}}>
                <Avatar src={review.profilePic || defaultAvatar} alt={review.fullname} />
                <Typography variant="h6">{review.fullname}</Typography>
                <ReactStars count={5} value={review.rating} size={24} edit={false} color2={'#ff7043'} />
                <Typography variant="body2">{review.review}</Typography>
              </Box>
            </Grid>
          )) : <Typography textAlign="center">No testimonials available.</Typography>}
        </Grid>
      </Container>

      {/* Contact Section */}
      <Container id="contact" sx={{ py: 8 }} style={{backgroundColor:"white",borderRadius:"10px",marginBottom:"15px"}} >
        <Typography variant="h4" textAlign="center" mb={3} >Contact Us</Typography>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
          <form onSubmit={handleSubmit}>
              <TextField 
                fullWidth 
                label="Name" 
                margin="normal" 
                name="Name"
                value={contact.Name}
                onChange={handleChange}
                error={Boolean(errors.Name)}  
                helperText={errors.Name}
              />
              <TextField 
                fullWidth 
                label="Email" 
                margin="normal" 
                name="Email"
                value={contact.Email}
                onChange={handleChange}
                error={Boolean(errors.Email)}  
                helperText={errors.Email}
              />
              <TextField 
                fullWidth 
                label="Message" 
                margin="normal" 
                name="Message"
                value={contact.Message}
                onChange={handleChange}
                multiline
                rows={4}
                error={Boolean(errors.Message)}  
                helperText={errors.Message}
              />
              <Button 
                type="submit" 
                fullWidth 
                sx={buttonStyles} 
                style={{ marginTop: '10px',backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#f4511e' } }}

              >
                Send Enquiry
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ backgroundColor: '#333', padding: '1rem' }} style={{color:"white"}}>
        <Typography variant="body2" color="white" textAlign="center">© 2025 All Rights Reserved.</Typography>
      </Box>
    </div>
  );
};

export default HomePage;
