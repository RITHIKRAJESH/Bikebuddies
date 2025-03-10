// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import Navbar from './navbar';

// export default function RiderViewBookings() {
//   const [booking, setBooking] = useState([]);

//   useEffect(() => {
//     const userid = localStorage.getItem("id");
//     axios
//       .get("http://localhost:9000/rider/viewrides", { headers: { _id: userid } })
//       .then((res) => {
//         console.log(res.data);
//         setBooking(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   const bookings = booking.filter((ride) => ride.status !== "Completed");

 
//   // Handle status update
  // const handleAction = (id, action) => {
  //   console.log(`Booking ID: ${id}, Status: ${action}`);
  //   axios
  //     .put("http://localhost:9000/rider/updateStatus", { status: action, id: id })
  //     .then((res) => {
  //       console.log(res.data);
  //       // Update the status in the UI immediately
  //       setBooking((prev) =>
  //         prev.map((ride) => (ride._id === id ? { ...ride, status: action } : ride))
  //       );
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

//   return (
//     <>
//       <Navbar />
//       <div className="container">
//         <h2 className="heading">My Ride Bookings</h2>

//         {bookings.length > 0 ? (
//           <div className="card-container">
//             {bookings.map((ride, index) => (
//               <div key={index} className="card">
//                 {/* Booking Header */}
//                 <div className="card-header">Booking #{index + 1}</div>

//                 {/* Ride Details */}
//                 <div className="ride-details">
//                   <p className="details">🆔 Booking ID: <span className="id">{ride._id}</span></p>
//                   <p className="details">📍 Start: <span className="highlight">{ride.startAddress}</span></p>
//                   <p className="details">🚩 End: <span className="highlight">{ride.endAddress}</span></p>
//                   <p className="details">🚗 Distance: <span className="highlight">{ride.totalDistance} km</span></p>
//                   <p className="details">💵 Amount: <span className="highlight">₹{ride.fare}</span></p>

//                   {/* Status Indicator */}
//                   <div className="status-indicator">
//                     🚦 Status:{" "}
//                     <span className={`status ${ride.status.toLowerCase()}`}>{ride.status}</span>
//                   </div>

//                   {/* Dynamic Action Buttons */}
//                   <div className="button-container">
                    // {ride.status === "Accepted" ? (
                    //   <>
                    //     <button onClick={() => handleAction(ride._id, 'Started')} className="button start">Journey Start</button>
                    //     <button onClick={() => handleAction(ride._id, 'Cancelled')} className="button cancel">Cancel</button>
                    //   </>
                    // ) : ride.status === "Started" ? (
                    //   <button onClick={() => handleAction(ride._id, 'Completed')} className="button complete">Completed</button>
                    // ) : (
                    //   <>
                    //     <button onClick={() => handleAction(ride._id, 'Accepted')} className="button accept">Accept</button>
                    //     <button onClick={() => handleAction(ride._id, 'Cancelled')} className="button cancel">Cancel</button>
                    //   </>
                    // )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="no-bookings">No bookings found</p>
//         )}
//       </div>

//       {/* Custom Styles */}
//       <style jsx>{`
        // .container {
        //   max-width: 1200px;
        //   margin: 0 auto;
        //   padding: 2rem;
        // }

        // .heading {
        //   font-size: 2rem;
        //   font-weight: bold;
        //   text-align: center;
        //   color: #333;
        //   margin-bottom: 2rem;
        // }

        // .card-container {
        //   display: grid;
        //   grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        //   gap: 1.5rem;
        // }

        // .card {
        //   background-color: white;
        //   padding: 1.5rem;
        //   border-radius: 12px;
        //   box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        //   border: 1px solid #d1d5db;
        //   transition: transform 0.2s, box-shadow 0.2s;
        // }

        // .card:hover {
        //   box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        //   transform: scale(1.05);
        // }

        // .card-header {
        //   background-color: #3b82f6;
        //   color: white;
        //   padding: 12px;
        //   border-radius: 12px 12px 0 0;
        //   text-align: center;
        //   font-weight: bold;
        //   margin-bottom: 1rem;
        // }

        // .ride-details {
        //   padding: 1rem;
        // }

        // .details {
        //   font-size: 1.125rem;
        //   font-weight: 600;
        //   color: #4b5563;
        // }

        // .highlight {
        //   color: #3b82f6;
        // }

        // .id {
        //   font-weight: normal;
        //   color: #333;
        // }

        // .status-indicator {
        //   margin-top: 1rem;
        //   text-align: center;
        // }

        // .status {
        //   padding: 6px 12px;
        //   border-radius: 9999px;
        //   color: white;
        // }

        // .status.accepted {
        //   background-color: #10b981;
        // }

        // .status.started {
        //   background-color: #f59e0b;
        // }

        // .status.completed {
        //   background-color: #10b981;
        // }

        // .status.pending {
        //   background-color: #facc15;
        // }

        // .status.cancelled {
        //   background-color: #ef4444;
        // }

        // .button-container {
        //   display: flex;
        //   justify-content: space-between;
        //   margin-top: 1.5rem;
        // }

        // .button {
        //   padding: 8px 16px;
        //   border-radius: 8px;
        //   color: white;
        //   text-align: center;
        //   cursor: pointer;
        //   transition: background-color 0.2s;
        // }

        // .accept {
        //   background-color: #10b981;
        // }

        // .start {
        //   background-color: #f59e0b;
        // }

        // .complete {
        //   background-color: #22c55e;
        // }

        // .cancel {
        //   background-color: #ef4444;
        // }

        // .button:hover {
        //   opacity: 0.9;
        // }

        // .accept:hover {
        //   background-color: #059669;
        // }

        // .start:hover {
        //   background-color: #d97706;
        // }

        // .complete:hover {
        //   background-color: #16a34a;
        // }

        // .cancel:hover {
        //   background-color: #dc2626;
        // }

        // .no-bookings {
        //   text-align: center;
        //   font-size: 1.125rem;
        //   color: #4b5563;
//         }
//       `}</style>
//     </>
//   );
// }
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Navbar from "./navbar";

const apiKey = "eSOtS524rC0uHYXXQVgjxQzdrVaXyK-Zf9tAZqQTnkc"; // Replace with your API Key

export default function RiderViewBookings() {
  const [booking, setBooking] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const mapRef = useRef(null);
  const platformRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    const userid = localStorage.getItem("id");
    axios
      .get("http://localhost:9000/rider/viewrides", { headers: { _id: userid } })
      .then((res) => {
        setBooking(res.data);
      })
      .catch((err) => console.log(err));

    loadScripts();
  }, []);

  // Load HERE Maps SDK dynamically
  const loadScripts = async () => {
    try {
      await loadScript("https://js.api.here.com/v3/3.1/mapsjs-core.js");
      await loadScript("https://js.api.here.com/v3/3.1/mapsjs-service.js");
      await loadScript("https://js.api.here.com/v3/3.1/mapsjs-ui.js");
      await loadScript("https://js.api.here.com/v3/3.1/mapsjs-mapevents.js");

      if (window.H && !mapInstance.current) {
        platformRef.current = new window.H.service.Platform({ apikey: apiKey });
      }
    } catch (error) {
      console.error("Error loading HERE Maps scripts:", error);
    }
  };

  // Load external script dynamically
  const loadScript = (url) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  // Show the map popup when a ride starts
  const handleJourneyStart = async (ride) => {
    setSelectedRide(ride);
    setShowMap(true);
    setTimeout(() => initializeMap(ride.startAddress, ride.endAddress), 300);
  };

  // Initialize HERE Map and display the route
  const initializeMap = async (startAddress, endAddress) => {
    if (!window.H || !platformRef.current) return;

    const defaultLayers = platformRef.current.createDefaultLayers();
    const map = new window.H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 10.1632, lng: 76.6413 }, // Default location
      zoom: 9,
    });

    new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
    window.H.ui.UI.createDefault(map, defaultLayers);

    window.addEventListener("resize", () => map.getViewPort().resize());
    mapInstance.current = map;

    try {
      await getRoute(startAddress, endAddress);
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  // Fetch route from HERE API and display on map
  const getRoute = async (start, end) => {
    const geocode = async (address) => {
      const url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(address)}&apiKey=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.items.length > 0) return data.items[0].position;
      throw new Error("Address not found");
    };

    try {
      const startCoords = await geocode(start);
      const endCoords = await geocode(end);

      const routeUrl = `https://router.hereapi.com/v8/routes?transportMode=car&origin=${startCoords.lat},${startCoords.lng}&destination=${endCoords.lat},${endCoords.lng}&return=summary,polyline&apiKey=${apiKey}`;
      const routeResponse = await fetch(routeUrl);
      const routeData = await routeResponse.json();

      if (routeData.routes.length > 0) {
        const polyline = routeData.routes[0].sections[0].polyline;
        displayRoute(polyline);
      }
    } catch (error) {
      console.error("Error getting route:", error);
    }
  };

  // Draw route on the map
  const displayRoute = (encodedPolyline) => {
    if (!mapInstance.current) return;

    const lineString = window.H.geo.LineString.fromFlexiblePolyline(encodedPolyline);
    const routePolyline = new window.H.map.Polyline(lineString, {
      style: { strokeColor: "blue", lineWidth: 5 },
    });

    mapInstance.current.addObject(routePolyline);
    mapInstance.current.getViewModel().setLookAtData({ bounds: routePolyline.getBoundingBox() });
  };

  const handleAction = (id, action) => {
    console.log(`Booking ID: ${id}, Status: ${action}`);
    axios
      .put("http://localhost:9000/rider/updateStatus", { status: action, id: id })
      .then((res) => {
        console.log(res.data);
        // Update the status in the UI immediately
        setBooking((prev) =>
          prev.map((ride) => (ride._id === id ? { ...ride, status: action } : ride))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const bookings = booking.filter((ride) => ride.status != "Completed" && ride.status !="Cancelled");
  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="heading">My Ride Bookings</h2>

        {bookings.length > 0 ? (
          <div className="card-container">
            {bookings.map((ride, index) => (
              <div key={index} className="card">
                <div className="card-header">Booking #{index + 1}</div>

                <div className="ride-details">
                  <p className="details">🆔 Booking ID: <span className="id">{ride._id}</span></p>
                  <p className="details">📍 Start: <span className="highlight">{ride.startAddress}</span></p>
                  <p className="details">🚩 End: <span className="highlight">{ride.endAddress}</span></p>
                  <p className="details">🚗 Distance: <span className="highlight">{ride.totalDistance}</span></p>
                  <p className="details">💵 Amount: <span className="highlight">₹{ride.fare}</span></p>

                  {/* Status Indicator */}
                  <div className="status-indicator">
                    🚦 Status:
                    <span className={`status ${ride.status.toLowerCase()}`}>{ride.status}</span>
                  </div>


                  <div className="button-container">
                    {/* {ride.status === "Accepted" && (
                      <button onClick={() => handleJourneyStart(ride)} className="button start">
                        Start Journey & View Map
                      </button>
                    )} */}
                    {ride.status === "Accepted" ? (
                      <>
                        <button onClick={() =>{ handleAction(ride._id, 'Started')
                           handleJourneyStart(ride)
                        }} className="button start">Journey Start</button>
                        <button onClick={() => handleAction(ride._id, 'Cancelled')} className="button cancel">Cancel</button>
                      </>
                    ) : ride.status === "Started" ? (
                      <button onClick={() => handleAction(ride._id, 'Completed')} className="button complete">Completed</button>
                    ) : (
                      <>
                        <button onClick={() => handleAction(ride._id, 'Accepted')} className="button accept">Accept</button>
                        <button onClick={() => handleAction(ride._id, 'Cancelled')} className="button cancel">Cancel</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-bookings">No bookings found</p>
        )}
      </div>

      {/* Map Modal */}
      {showMap && selectedRide && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Route from {selectedRide.startAddress} to {selectedRide.endAddress}</h3>
            <div ref={mapRef} className="map-container"></div>
            <button onClick={() => setShowMap(false)} className="button close">Close</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .map-container {
          width: 100%;
          height: 400px;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 10px;
          width: 80%;
          max-width: 600px;
        }

        .close {
          margin-top: 10px;
          background: red;
        }

                .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .heading {
          font-size: 2rem;
          font-weight: bold;
          text-align: center;
          color: #333;
          margin-bottom: 2rem;
        }

        .card-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .card {
          background-color: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          border: 1px solid #d1d5db;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .card:hover {
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
          transform: scale(1.05);
        }

        .card-header {
          background-color: #3b82f6;
          color: white;
          padding: 12px;
          border-radius: 12px 12px 0 0;
          text-align: center;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .ride-details {
          padding: 1rem;
        }

        .details {
          font-size: 1.125rem;
          font-weight: 600;
          color: #4b5563;
        }

        .highlight {
          color: #3b82f6;
        }

        .id {
          font-weight: normal;
          color: #333;
        }

        .status-indicator {
          margin-top: 1rem;
          text-align: center;
        }

        .status {
          padding: 6px 12px;
          border-radius: 9999px;
          color: white;
        }

        .status.accepted {
          background-color: #10b981;
        }

        .status.started {
          background-color: #f59e0b;
        }

        .status.completed {
          background-color: #10b981;
        }

        .status.pending {
          background-color: #facc15;
        }

        .status.cancelled {
          background-color: #ef4444;
        }

        .button-container {
          display: flex;
          justify-content: space-between;
          margin-top: 1.5rem;
        }

        .button {
          padding: 8px 16px;
          border-radius: 8px;
          color: white;
          text-align: center;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .accept {
          background-color: #10b981;
        }

        .start {
          background-color: #f59e0b;
        }

        .complete {
          background-color: #22c55e;
        }

        .cancel {
          background-color: #ef4444;
        }

        .button:hover {
          opacity: 0.9;
        }

        .accept:hover {
          background-color: #059669;
        }

        .start:hover {
          background-color: #d97706;
        }

        .complete:hover {
          background-color: #16a34a;
        }

        .cancel:hover {
          background-color: #dc2626;
        }

        .no-bookings {
          text-align: center;
          font-size: 1.125rem;
          color: #4b5563;
      `}</style>
    </>
  );
}
