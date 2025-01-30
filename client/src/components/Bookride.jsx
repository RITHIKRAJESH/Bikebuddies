import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { useLoadScript, GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api';
import Geocode from "react-geocode";

// Google Maps API key
const googleMapsAPIKey = '';

// Define the libraries outside the component to avoid unnecessary re-renders
const libraries = ['places', 'directions'];

// Bike Taxi Booking Component
const BookRide = () => {
  const [destination, setDestination] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const mapRef = useRef();

  // Load Google Maps API
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsAPIKey,
    libraries: libraries,  // Now using the constant 'libraries'
  });

  useEffect(() => {
    // Get the current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          alert("Unable to retrieve your location.");
        }
      );
    }
  }, []);

  // Geocode destination address to get coordinates
  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    if (e.target.value) {
      setLoading(true);
      try {
        // Get destination coordinates from the address
        const result = await Geocode.fromAddress(e.target.value);
        const { lat, lng } = result.results[0].geometry.location;
        calculateRoute(lat, lng);
      } catch (error) {
        console.error('Error fetching destination coordinates:', error);
      }
      setLoading(false);
    }
  };

  // Calculate the route from current location to destination
  const calculateRoute = (destinationLat, destinationLng) => {
    if (!currentLocation) return;

    const directionsService = new window.google.maps.DirectionsService();
    const request = {
      origin: currentLocation,
      destination: { lat: destinationLat, lng: destinationLng },
      travelMode: window.google.maps.TravelMode.BICYCLING,
    };

    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        setDirectionsResponse(result);
      } else {
        console.error('Error fetching directions:', status);
      }
    });
  };

  // Handle booking submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Handle booking logic here (e.g., save to database, show confirmation)
    alert(`Ride booked to ${destination}`);
    setIsSubmitting(false);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Container>
      <Box sx={{ marginBottom: '2rem' }}>
        <Typography variant="h4" textAlign="center" mb={3}>
          Book a Bike Taxi Ride
        </Typography>

        {/* Booking Form */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter Destination"
            variant="outlined"
            fullWidth
            value={destination}
            onChange={handleDestinationChange}
            required
          />
          <Box sx={{ marginTop: '1rem', textAlign: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting || !destination}
            >
              {isSubmitting ? 'Booking...' : 'Book Ride'}
            </Button>
          </Box>
        </form>

        {/* Loading Message */}
        {loading && <Typography textAlign="center" mt={2}>Fetching directions...</Typography>}

        {/* Map and Directions */}
        {directionsResponse && currentLocation && (
          <Box sx={{ marginTop: '2rem' }}>
            <GoogleMap
              mapContainerStyle={{
                height: '400px',
                width: '100%',
              }}
              center={currentLocation}
              zoom={12}
              onLoad={(map) => mapRef.current = map}
            >
              <Marker position={currentLocation} />
              <Marker position={{ lat: directionsResponse.routes[0].legs[0].end_location.lat(), lng: directionsResponse.routes[0].legs[0].end_location.lng() }} />
              <DirectionsRenderer directions={directionsResponse} />
            </GoogleMap>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default BookRide;
