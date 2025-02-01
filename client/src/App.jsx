import {  Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage'; // Import HomePage component
import RegisterPage from './components/registeruser'; // Import RegisterPage component
import LoginPage from './components/Loginpage'; // Import LoginPage component
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import BookRide from './components/Bookride';
import Riderhome from './components/rider/Riderhome';
import Viewvehicles from './components/rider/viewvehicles';
import Addvehicle from './components/rider/addvehicle';

function App() {
  return (
    
      <Routes>
        {/* Define the route for the Home Page */}
        <Route path="/" element={<HomePage />} />
        
        {/* Define the route for the Register Page */}
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Define the route for the Login Page */}
        <Route path="/login" element={<LoginPage />} />

        <Route path="/bookride" element={<BookRide />} />

       {/* Rider routings */}
        <Route path="/rider" element={<Riderhome/>} />
        <Route path="/rider/viewvehicle" element={<Viewvehicles/>} />
        <Route path="/rider/addvehicle" element={<Addvehicle/>} />
      </Routes>
  
  );
}

export default App;
