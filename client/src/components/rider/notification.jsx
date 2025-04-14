import React, { useEffect, useState } from 'react';
import socket from '../socket';  // Assuming your socket instance is managed here

const BookingNotification = ({ userId }) => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Emit userId to the server so it knows which socket to notify
    socket.emit('riderConnected', userId);
    console.log('userId',userId)
    // Listen for the 'Booked' event
    const handleBookingEvent = (data) => {
      console.log(data)
      if (data.userId === userId) {
        // If this booking is for the current user, show the notification
        setNotification(`Booking Successful: ${data.status}`);
        alert(data.status)
      }
    };

    socket.on('Booked', handleBookingEvent);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('Booked', handleBookingEvent);  // Remove event listener
    };
  }, [userId]);

  return (
    <div>
      {notification && <div className="alert alert-success">{notification}</div>}
    </div>
  );
};

export default BookingNotification;
