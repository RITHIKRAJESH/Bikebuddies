// import { useEffect, useState, useRef } from "react";
// import { FaBicycle } from 'react-icons/fa';
// import UserNav from "./usernav";
// import axios from "axios";

// const BookRide = () => {
//   const [startAddress, setStartAddress] = useState("");
//   const [endAddress, setEndAddress] = useState("");
//   const [distance, setDistance] = useState("");
//   const [riders, setRiders] = useState([]);
//   const [selectedRider, setSelectedRider] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState("paylater");  // New state to track payment method
//   const [bankDetails, setBankDetails] = useState({ accountNumber: "", bankName: "" });  // For online payment
//   const mapRef = useRef(null);
//   const mapInstance = useRef(null);
//   const platformRef = useRef(null);
//   const apiKey = "qPjHt0idSwMAJrNMUnHtOuHixS6eVLfSsSOuSRSIu4g"; // Add your HERE Maps API key

//   useEffect(() => {
//     const loadScripts = async () => {
//       try {
//         await loadScript("https://js.api.here.com/v3/3.1/mapsjs-core.js");
//         await loadScript("https://js.api.here.com/v3/3.1/mapsjs-service.js");
//         await loadScript("https://js.api.here.com/v3/3.1/mapsjs-ui.js");
//         await loadScript("https://js.api.here.com/v3/3.1/mapsjs-mapevents.js");

//         if (window.H && !mapInstance.current) {
//           initializeMap();
//         }
//       } catch (error) {
//         console.error("Error loading HERE Maps scripts:", error);
//       }
//     };

//     const fetchRiders = async () => {
//       try {
//         const response = await fetch("http://localhost:9000/user/viewbikes");
//         const data = await response.json();
//         const verifiedrider = data.filter(item => item.userId && item.userId.verifieddriver === true);
//         setRiders(verifiedrider);
//       } catch (error) {
//         console.error("Error fetching rider data:", error);
//       }
//     };

//     loadScripts();
//     fetchRiders();
//   }, []);

//   const loadScript = (url) => {
//     return new Promise((resolve, reject) => {
//       const script = document.createElement("script");
//       script.src = url;
//       script.async = true;
//       script.onload = resolve;
//       script.onerror = reject;
//       document.body.appendChild(script);
//     });
//   };

//   const initializeMap = () => {
//     if (!window.H) {
//       console.error("HERE Maps SDK not loaded.");
//       return;
//     }

//     platformRef.current = new window.H.service.Platform({ apikey: apiKey });
//     const defaultLayers = platformRef.current.createDefaultLayers();

//     const map = new window.H.Map(
//       mapRef.current,
//       defaultLayers.vector.normal.map,
//       {
//         center: { lat: 10.1632, lng: 76.6413 }, // Default center: Kerala, India
//         zoom: 9,
//       }
//     );

//     new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
//     window.H.ui.UI.createDefault(map, defaultLayers);

//     window.addEventListener("resize", () => map.getViewPort().resize());
//     mapInstance.current = map; // Store map instance
//   };

//   const getDistanceAndRoute = async () => {
//     if (!startAddress || !endAddress) {
//       alert("Please enter both start and end locations.");
//       return;
//     }

//     const geocode = async (address) => {
//       const url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(address)}&apiKey=${apiKey}`;
//       const response = await fetch(url);
//       const data = await response.json();
//       if (data.items && data.items.length > 0) {
//         return data.items[0].position; // Returns {lat, lng}
//       } else {
//         throw new Error("Address not found.");
//       }
//     };

//     try {
//       const startCoords = await geocode(startAddress);
//       const endCoords = await geocode(endAddress);

//       const routeUrl = `https://router.hereapi.com/v8/routes?transportMode=car&origin=${startCoords.lat},${startCoords.lng}&destination=${endCoords.lat},${endCoords.lng}&return=summary,polyline&apiKey=${apiKey}`;
//       const routeResponse = await fetch(routeUrl);
//       const routeData = await routeResponse.json();

//       if (routeData.routes && routeData.routes.length > 0) {
//         const distanceInKm = (routeData.routes[0].sections[0].summary.length / 1000).toFixed(2);
//         setDistance(`${distanceInKm} km`);

//         const polyline = routeData.routes[0].sections[0].polyline;
//         displayRoute(polyline);
//       } else {
//         setDistance("Distance not found.");
//       }
//     } catch (error) {
//       console.error("Error fetching distance and route:", error);
//       setDistance("Error retrieving distance.");
//     }
//   };

//   const displayRoute = (encodedPolyline) => {
//     if (!mapInstance.current || !platformRef.current) return;

//     const lineString = window.H.geo.LineString.fromFlexiblePolyline(encodedPolyline);
//     const routePolyline = new window.H.map.Polyline(lineString, {
//       style: { strokeColor: "blue", lineWidth: 5 },
//     });

//     mapInstance.current.addObject(routePolyline);
//     mapInstance.current.getViewModel().setLookAtData({ bounds: routePolyline.getBoundingBox() });
//   };

//   const totalPrice = parseFloat(distance) * 8 || 0;

//   const handleRiderSelection = (event) => {
//     const rider = riders.find(r => r.vehicleName === event.target.value);
//     setSelectedRider(rider);
//   };

//   const handleBooking = () => {
//     if (!selectedRider) {
//       alert("Please select a rider before booking.");
//       return;
//     }

//     const bookingDetails = {
//       vehicleId: selectedRider._id,
//       userId: localStorage.getItem("id"),
//       startAddress,
//       endAddress,
//       totalCost: totalPrice.toFixed(2),
//       distance,
//       paymentStatus: paymentMethod === "paylater" ? "paylater" : "paid",
//       bankDetails: paymentMethod === "paid" ? bankDetails : undefined,
//     };

//     axios
//       .post("http://localhost:9000/user/bookride", bookingDetails)
//       .then((res) => alert(res.data))
//       .catch((err) => console.log(err));
//   };

//   return (
//     <>
//       <UserNav />
//       <div className="body">
//         <div className="p-8">
//           <h1 className="text-xl font-bold mb-4">Find Distance & View Map</h1>
//           <div className="mb-4">
//             <input
//               type="text"
//               placeholder="Enter Starting Location"
//               value={startAddress}
//               onChange={(e) => setStartAddress(e.target.value)}
//               className="border p-2 rounded w-full mb-2"
//             />
//             <input
//               type="text"
//               placeholder="Enter Destination Location"
//               value={endAddress}
//               onChange={(e) => setEndAddress(e.target.value)}
//               className="border p-2 rounded w-full mb-2"
//             />
//             <button
//               onClick={getDistanceAndRoute}
//               className="bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               Get Distance & Route
//             </button>
//           </div>
//           {distance && <p className="text-lg font-semibold mt-6">Distance: {distance}</p>}
//           <p className="text-lg font-semibold mt-6">Total Price: ₹{totalPrice.toFixed(2)}</p>

//           {/* Map container */}
//           <div
//             ref={mapRef}
//             style={{
//               width: "100%",
//               height: "400px",
//               borderRadius: "8px",
//               marginTop: "20px",
//               backgroundRepeat: "no-repeat",
//               backgroundSize: "cover",
//             }}
//           ></div>

//           {/* Riders List */}
//           <div className="p-10">
//             <h1 className="text-xl font-bold mb-4">Select Available Vehicles</h1>

//             {riders.length > 0 ? (
//               <div>
//                 {/* Dropdown for selecting a rider */}
//                 <select className="custom-select" onChange={handleRiderSelection} defaultValue="">
//                   <option value="" disabled>Select a rider</option>
//                   {riders.map((rider, index) => (
//                     <option key={index} value={rider.vehicleName}>
//                       {rider.vehicleName} ({rider.model})
//                     </option>
//                   ))}
//                 </select>

//                 {/* Show selected rider details */}
//                 {selectedRider && (
//                   <div className="mt-6 p-6 border rounded-lg shadow-md bg-white">
//                     <div className="flex items-center">
//                       <FaBicycle className="text-3xl text-blue-500 mr-3" />
//                       <div className="flex flex-col">
//                         <p className="font-semibold">{selectedRider.vehicleName}</p>
//                         <p className="text-sm text-gray-500">{selectedRider.model}</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <p>No riders available.</p>
//             )}

//             {/* Payment Method Options */}
//             <div className="mt-6">
//               <h2 className="font-semibold mb-2">Payment Method</h2>
//               <label>
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value="paylater"
//                   checked={paymentMethod === "paylater"}
//                   onChange={() => setPaymentMethod("paylater")}
//                 />
//                 Pay Later
//               </label>
//               <label className="ml-4">
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value="paid"
//                   checked={paymentMethod === "paid"}
//                   onChange={() => setPaymentMethod("paid")}
//                 />
//                 Online Payment
//               </label>

//               {paymentMethod === "paid" && (
//                 <div className="mt-4">
//                   <h3>Enter Bank Details</h3>
//                   <input
//                     type="text"
//                     placeholder="Account Number"
//                     value={bankDetails.accountNumber}
//                     onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
//                     className="border p-2 rounded w-full mb-2"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Bank Name"
//                     value={bankDetails.bankName}
//                     onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
//                     className="border p-2 rounded w-full"
//                   />
//                 </div>
//               )}
//             </div>

//             <button
//               onClick={handleBooking}
//               className="bg-green-500 text-white px-4 py-2 rounded mt-4"
//             >
//               Book Ride
//             </button>
//           </div>
//         </div>
//       </div>
//       <style jsx>{`
//     .body {
//   font-family: 'Arial', sans-serif;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 140vh;
//   margin:0;
// }

// .p-8 {
//   background-color: #1e1e1e;
//   padding: 20px;
//   border-radius: 10px;
//   box-shadow: 0 0 10px rgba(255, 102, 0, 0.5);
//   width: 90%;
//   max-width: 500px;
//   text-align: center;
  
// }

// h1 {
//   color: #ff6600;
//   font-size: 24px;
//   margin-bottom: 20px;
// }

// input {
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 10px;
//   border: 1px solid #ff6600;
//   border-radius: 5px;
//   background-color: #2a2a2a;
//   color: white;
//   outline: none;
// }

// input::placeholder {
//   color: #bbb;
// }

// button {
//   background-color: #ff6600;
//   color: white;
//   padding: 10px 20px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   font-size: 16px;
//   transition: background 0.3s ease;
// }

// button:hover {
//   background-color: #e65c00;
// }

// .map-container {
//   width: 100%;
//   height: 400px;
//   border-radius: 8px;
//   margin-top: 80px;
//   /* background-color: #333; */
//   border: 2px solid #ff6600;
// }
// .p-3{
//   background-color: white;
// }

// .mt-6{
//   color:#ff6600;
// }


// .navbar {
//   background-color: #ff6600;
//   padding: 16px;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//   position: fixed;  /* Keeps navbar fixed at the top */
//   top: 0;
//   left: 0;
//   width: 100%;
//   z-index: 1000; /* Ensures navbar stays on top of other elements */
// }

// .navbar ul {
//   display: flex;
//   justify-content: space-around;
//   list-style: none;
//   font-weight: 600;
//   color: white;
//   margin: 0;
//   padding: 0;
// }

// .navbar a {
//   text-decoration: none;
//   color: white;
//   transition: opacity 0.3s;
// }

// .navbar a:hover {
//   text-decoration: underline;
// }

// /* Ensure main content does not overlap navbar */
// .main-content {
//   margin-top: 70px; /* Adjust based on navbar height */
//   padding: 20px;
// }
// .custom-select {
//   width: 100%;
//   padding: 12px;
//   border: 2px solid #ccc;
//   border-radius: 8px;
//   background-color: #fff;
//   box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
//   font-size: 16px;
//   color: #333;
//   cursor: pointer;
//   transition: all 0.3s ease-in-out;
// }

// .custom-select:focus {
//   border-color: #007bff;
//   outline: none;
//   box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
// }

// .custom-select:hover {
//   border-color: #0056b3;
// }

// .custom-select option {
//   padding: 10px;
//   font-size: 14px;
// }
// `}
//     </style>

//     </>
//   );
// };

// export default BookRide;


import { useEffect, useState, useRef } from "react";
import { FaBicycle } from "react-icons/fa";
import UserNav from "./usernav";
import axios from "axios";
import './bookride.css'
import logo from '../../assets/bikebuddieslogo1.png'
import { useNavigate } from "react-router-dom";
const BookRide = () => {
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [distance, setDistance] = useState("");
  const [riders, setRiders] = useState([]);
  const [selectedRider, setSelectedRider] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("paylater");
  const [bankDetails, setBankDetails] = useState({ accountNumber: "", bankName: "" });
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const platformRef = useRef(null);
  const apiKey = "qPjHt0idSwMAJrNMUnHtOuHixS6eVLfSsSOuSRSIu4g";
  
  useEffect(() => {
     const url = import.meta.env.VITE_BASE_URL;
      console.log(url);
    const loadScripts = async () => {
      try {
        await loadScript("https://js.api.here.com/v3/3.1/mapsjs-core.js");
        await loadScript("https://js.api.here.com/v3/3.1/mapsjs-service.js");
        await loadScript("https://js.api.here.com/v3/3.1/mapsjs-ui.js");
        await loadScript("https://js.api.here.com/v3/3.1/mapsjs-mapevents.js");
        await loadScript("https://js.api.here.com/v3/3.1/mapsjs-ui.css")
        await loadRazorpayScript();
        
        if (window.H && !mapInstance.current) {
          initializeMap();
        }
      } catch (error) {
        console.error("Error loading HERE Maps or Razorpay scripts:", error);
      }
    };

    const fetchRiders = async () => {
      try {
        const response = await fetch(`${url}/user/viewbikes`);
        const data = await response.json();
        const verifiedrider = data.filter(item => item.userId && item.userId.verifieddriver === true);
        setRiders(verifiedrider);
      } catch (error) {
        console.error("Error fetching rider data:", error);
      }
    };

    loadScripts();
    fetchRiders();
  }, []);

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

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };



  const initializeMap = () => {
    if (!window.H) {
      console.error("HERE Maps SDK not loaded.");
      return;
    }
  
    platformRef.current = new window.H.service.Platform({ apikey: apiKey });
    const defaultLayers = platformRef.current.createDefaultLayers({
      lg: "en", // Language
      pois: true, // Enable Points of Interest
      tileSize: 512, // Higher resolution tiles
      ppi: 320, // Pixels per inch
    });
    const map = new window.H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 10.1632, lng: 76.6413 }, // Kerala, India
      zoom: 9,
    });
    map.addLayer(defaultLayers.vector.normal.traffic);
    if (defaultLayers.vector.normal.landmarks) {
      map.addLayer(defaultLayers.vector.normal.landmarks);
    }
    new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
    window.H.ui.UI.createDefault(map, defaultLayers);
    window.addEventListener("resize", () => map.getViewPort().resize());
    mapInstance.current = map;
  };
  

  const getDistanceAndRoute = async () => {
    if (!startAddress || !endAddress) {
      alert("Please enter both start and end locations.");
      return;
    }

    const geocode = async (address) => {
      const url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(address)}&apiKey=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        return data.items[0].position;
      } else {
        throw new Error("Address not found.");
      }
    };

    try {
      const startCoords = await geocode(startAddress);
      const endCoords = await geocode(endAddress);

      const routeUrl = `https://router.hereapi.com/v8/routes?transportMode=car&origin=${startCoords.lat},${startCoords.lng}&destination=${endCoords.lat},${endCoords.lng}&return=summary,polyline&apiKey=${apiKey}`;
      const routeResponse = await fetch(routeUrl);
      const routeData = await routeResponse.json();

      if (routeData.routes && routeData.routes.length > 0) {
        const distanceInKm = (routeData.routes[0].sections[0].summary.length / 1000).toFixed(2);
        setDistance(`${distanceInKm} km`);

        const polyline = routeData.routes[0].sections[0].polyline;
        displayRoute(polyline);
      } else {
        setDistance("Distance not found.");
      }
    } catch (error) {
      console.error("Error fetching distance and route:", error);
      setDistance("Error retrieving distance.");
    }
  };
  const navigate=useNavigate()
  const displayRoute = (encodedPolyline) => {
    if (!mapInstance.current || !platformRef.current) return;
  
    // Decode polyline
    const lineString = window.H.geo.LineString.fromFlexiblePolyline(encodedPolyline);
    const routePolyline = new window.H.map.Polyline(lineString, {
      style: { strokeColor: "blue", lineWidth: 5 },
    });
  
    // Extract start and end coordinates from the LineString
    const startCoord = lineString.extractPoint(0); // First point
    const endCoord = lineString.extractPoint(lineString.getPointCount() - 1); // Last point
  
    console.log("Start Coord:", startCoord);
    console.log("End Coord:", endCoord);
  
    const startMarker = new window.H.map.Marker(startCoord);
    const endMarker = new window.H.map.Marker(endCoord);
  
    // Add everything to a group to ensure bounding box includes all
    const group = new window.H.map.Group();
    group.addObjects([routePolyline, startMarker, endMarker]);
  
    // Add to map after slight delay (in case of async rendering issues)
    setTimeout(() => {
      mapInstance.current.addObject(group);
      mapInstance.current.getViewModel().setLookAtData({
        bounds: group.getBoundingBox(),
        zoom: 15, // Optional: set default zoom
      });
    }, 100); // Small delay to avoid race conditions
  };
  
  const totalPrice = parseFloat(distance) * 8 || 0;

  const handleRiderSelection = (event) => {
    const rider = riders.find(r => r.vehicleName === event.target.value);
    setSelectedRider(rider);
  };
   const url = import.meta.env.VITE_BASE_URL;
    console.log(url);
  const handleBooking = async () => {
    if (!selectedRider) {
      alert("Please select a rider before booking.");
      return;
    }

    const bookingDetails = {
      vehicleId: selectedRider._id,
      userId: localStorage.getItem("id"),
      startAddress,
      endAddress,
      totalCost: totalPrice.toFixed(2),
      distance,
      paymentStatus: paymentMethod === "paylater" ? "paylater" : "paid",
      bankDetails: paymentMethod === "paid" ? bankDetails : undefined,
    };

    // If user selects online payment
    if (paymentMethod === "paid") {
      try {
        const orderResponse = await axios.post(`${url}/user/create-order`, {
          amount: totalPrice,
        });

        const orderData = orderResponse.data;

        const options = {
          key: "rzp_test_AQz9oVZHhqMI1R", // Razorpay key_id
          amount: orderData.amount, // amount in paise
          currency: "INR",
          order_id: orderData.id,
          name: "Ride Booking",
          description: `Booking from ${startAddress} to ${endAddress}`,
          image:{logo}, 
          handler: function (response) {
            alert("Payment Successful");
            // Send payment details to backend to confirm the booking
            axios
              .post(`${url}/user/bookride`, bookingDetails)
              .then((res) => {alert(res.data)
                navigate("/user/history")
              })
              .catch((err) => console.log(err));
          },
          prefill: {
            name: localStorage.getItem("userName"), // Prefill user name if available
            email: localStorage.getItem("userEmail"), // Prefill user email if available
          },
          theme: {
            color: "#ff6600",
          },
        };

        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open(); // Open Razorpay payment modal
      } catch (error) {
        console.error("Error creating Razorpay order:", error);
        alert("Error creating payment order.");
      }
    } else {
      // If user selects 'Pay Later', proceed with booking
      axios
        .post(`${url}/user/bookride`, bookingDetails)
        .then((res) => {alert(res.data)
              navigate("/user/history")
        })
        .catch((err) => console.log(err));
    }
  };
  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
  
        const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&lang=en-US&apikey=${apiKey}`;
  
        try {
          const response = await fetch(url);
          const data = await response.json();
  
          if (data.items && data.items.length > 0) {
            const address = data.items[0].address.label;
            setStartAddress(address); // 📍 Update your input field or state
          } else {
            alert('No address found for your location.');
          }
        } catch (error) {
          console.error('HERE Reverse Geocoding error:', error);
          alert('Failed to retrieve address using HERE Maps.');
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Could not get your location.');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };
  
  return (
    <>
      <UserNav />
      <div className="body">
  <div className="container">
    <h1>Book Your Ride</h1>

    {/* Location Inputs */}
    <div className="mb-4">
      <input
        type="text"
        placeholder="Enter Starting Location"
        value={startAddress}
        onChange={(e) => setStartAddress(e.target.value)}
      />
      <button onClick={getCurrentLocation} className="mt-2">
        Use Current Location
      </button>

      <input
        type="text"
        placeholder="Enter Destination Location"
        value={endAddress}
        onChange={(e) => setEndAddress(e.target.value)}
      />
      <button onClick={getDistanceAndRoute} className="mt-2">
        Get Distance & Route
      </button>
    </div>

    {/* Distance and Price */}
    {distance && (
      <p className="distance-info">Distance: {distance}</p>
    )}
    <p className="price-info">Total Price: ₹{totalPrice.toFixed(2)}</p>

    {/* Map Display */}
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "12px",
        marginTop: "20px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    ></div>

    {/* Rider Selection */}
    <div className="mt-10">
      <h1>Select Available Vehicles</h1>

      {riders.length > 0 ? (
        <>
          <select onChange={handleRiderSelection} defaultValue="">
            <option value="" disabled>Select a rider</option>
            {riders.map((rider, index) => (
              <option key={index} value={rider.vehicleName}>
                {rider.vehicleName} ({rider.model})
              </option>
            ))}
          </select>

          {selectedRider && (
            <div className="rider-card mt-6">
              <div className="flex items-center">
                <FaBicycle className="text-3xl text-blue-500 mr-3" />
                <div>
                  <p className="font-semibold">{selectedRider.vehicleName}</p>
                  <p className="text-sm text-gray-500">{selectedRider.model}</p>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>No riders available.</p>
      )}
    </div>

    {/* Payment Method */}
    <div className="payment-method">
      <h2 className="payment-title">Payment Method</h2>
      <div className="radio-group">
        <label className="radio-option">
          <input
            type="radio"
            name="paymentMethod"
            value="paylater"
            checked={paymentMethod === "paylater"}
            onChange={() => setPaymentMethod("paylater")}
          />
          <span>Pay Later</span>
        </label>
        <label className="radio-option">
          <input
            type="radio"
            name="paymentMethod"
            value="paid"
            checked={paymentMethod === "paid"}
            onChange={() => setPaymentMethod("paid")}
          />
          <span>Online Payment</span>
        </label>
      </div>
    </div>

    {/* Booking Button */}
    <button onClick={handleBooking} className="book-btn mt-6">
      Book Ride
    </button>
  </div>
</div>

    </>
  );
};

export default BookRide;