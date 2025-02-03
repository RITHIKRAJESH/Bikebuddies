// import React, { useEffect, useState, useRef } from "react";

// const BookRide = () => {
//   const [startAddress, setStartAddress] = useState("");
//   const [endAddress, setEndAddress] = useState("");
//   const [distance, setDistance] = useState("");
//   const mapRef = useRef(null);
//   const apiKey = ""; // Replace with your HERE Maps API key

//   useEffect(() => {
//     const loadScripts = async () => {
//       try {
//         await loadScript("https://js.api.here.com/v3/3.1/mapsjs-core.js");
//         await loadScript("https://js.api.here.com/v3/3.1/mapsjs-service.js");
//         await loadScript("https://js.api.here.com/v3/3.1/mapsjs-ui.js");
//         await loadScript("https://js.api.here.com/v3/3.1/mapsjs-mapevents.js");

//         if (window.H) {
//           initializeMap();
//         }
//       } catch (error) {
//         console.error("Error loading HERE Maps scripts:", error);
//       }
//     };

//     loadScripts();
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

//     const platform = new window.H.service.Platform({ apikey: apiKey });
//     const defaultLayers = platform.createDefaultLayers();

//     const map = new window.H.Map(
//       mapRef.current,
//       defaultLayers.vector.normal.map,
//       {
//         center: { lat: 10.1632, lng: 76.6413 }, // Default center: kerala, India
//         zoom: 9,
//       }
//     );

//     // const behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
//     new window.H.ui.UI.createDefault(map, defaultLayers);
    
//     window.addEventListener("resize", () => map.getViewPort().resize());
//   };
//   // const getDistance = async () => {
//   //   if (!startAddress || !endAddress) {
//   //     alert("Please enter both latitude and longitude for both locations.");
//   //     return;
//   //   }
  
//   //   // Sanitize input to ensure correct format (lat,lng) and remove unwanted symbols
//   //   const sanitizeInput = (input) => {
//   //     return input.replace(/[^\d.,-]/g, '').trim(); // Removes any non-numeric, non-comma, and non-dash characters
//   //   };
  
//   //   const formattedStart = sanitizeInput(startAddress);
//   //   const formattedEnd = sanitizeInput(endAddress);
  
//   //   const url = `https://router.hereapi.com/v8/routes?transportMode=car&origin=${formattedStart}&destination=${formattedEnd}&return=summary&apiKey=${apiKey}`;
  
//   //   try {
//   //     const response = await fetch(url);
//   //     if (!response.ok) {
//   //       throw new Error(`HTTP error! Status: ${response.status}`);
//   //     }
  
//   //     const data = await response.json();
//   //     if (data.routes && data.routes.length > 0) {
//   //       const distanceInKm = (data.routes[0].sections[0].summary.length / 1000).toFixed(2);
//   //       setDistance(`${distanceInKm} km`);
//   //     } else {
//   //       setDistance("Distance not found.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching distance:", error);
//   //     setDistance("Error retrieving distance.");
//   //   }
//   // };
    
//   const getDistance = async () => {
//     if (!startAddress || !endAddress) {
//       alert("Please enter both start and end locations.");
//       return;
//     }
  
//     // Geocode the start and end locations to get coordinates
//     const geocode = async (address) => {
//       const url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(address)}&apiKey=${apiKey}`;
//       const response = await fetch(url);
//       const data = await response.json();
//       if (data.items && data.items.length > 0) {
//         return data.items[0].position; // returns {lat, lng}
//       } else {
//         throw new Error("Address not found.");
//       }
//     };
  
//     try {
//       // Geocode the start and end addresses
//       const startCoords = await geocode(startAddress);
//       const endCoords = await geocode(endAddress);
  
//       // Use the geocoded coordinates to calculate the route
//       const routeUrl = `https://router.hereapi.com/v8/routes?transportMode=car&origin=${startCoords.lat},${startCoords.lng}&destination=${endCoords.lat},${endCoords.lng}&return=summary&apiKey=${apiKey}`;
//       const routeResponse = await fetch(routeUrl);
//       const routeData = await routeResponse.json();
  
//       if (routeData.routes && routeData.routes.length > 0) {
//         const distanceInKm = (routeData.routes[0].sections[0].summary.length / 1000).toFixed(2);
//         setDistance(`${distanceInKm} km`);
//       } else {
//         setDistance("Distance not found.");
//       }
//     } catch (error) {
//       console.error("Error fetching distance:", error);
//       setDistance("Error retrieving distance.");
//     }
//   };
  
//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Find Distance & View Map</h1>
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Enter Starting Coordinates (Latitude,Longitude)"
//           value={startAddress}
//           onChange={(e) => setStartAddress(e.target.value)}
//           className="border p-2 rounded w-full mb-2"
//         />
//         <input
//           type="text"
//           placeholder="Enter Destination Coordinates (Latitude,Longitude)"
//           value={endAddress}
//           onChange={(e) => setEndAddress(e.target.value)}
//           className="border p-2 rounded w-full mb-2"
//         />
//         <button
//           onClick={getDistance}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Get Distance
//         </button>
//       </div>
//       {distance && <p className="text-lg font-semibold">Distance: {distance}</p>}

//       {/* Map container */}
//       <div
//         ref={mapRef}
//         style={{ width: "100%", height: "400px", borderRadius: "8px", marginTop: "20px", backgroundRepeat:"no-repeat", backgroundSize: "cover" }}
//       ></div>
//     </div>
//   );
// };

// export default BookRide;




import { useEffect, useState, useRef } from "react";
import "./BookRide.css";
const BookRide = () => {
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [distance, setDistance] = useState("");
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const platformRef = useRef(null);
  const apiKey = ""; 
  
  useEffect(() => {
    const loadScripts = async () => {
      try {
        await loadScript("https://js.api.here.com/v3/3.1/mapsjs-core.js");
        await loadScript("https://js.api.here.com/v3/3.1/mapsjs-service.js");
        await loadScript("https://js.api.here.com/v3/3.1/mapsjs-ui.js");
        await loadScript("https://js.api.here.com/v3/3.1/mapsjs-mapevents.js");

        if (window.H && !mapInstance.current) {
          initializeMap();
        }
      } catch (error) {
        console.error("Error loading HERE Maps scripts:", error);
      }
    };

    loadScripts();
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

  const initializeMap = () => {
    if (!window.H) {
      console.error("HERE Maps SDK not loaded.");
      return;
    }

    platformRef.current = new window.H.service.Platform({ apikey: apiKey });
    const defaultLayers = platformRef.current.createDefaultLayers();

    const map = new window.H.Map(
      mapRef.current,
      defaultLayers.vector.normal.map,
      {
        center: { lat: 10.1632, lng: 76.6413 }, // Default center: Kerala, India
        zoom: 9,
      }
    );

    new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
    window.H.ui.UI.createDefault(map, defaultLayers);

    window.addEventListener("resize", () => map.getViewPort().resize());
    mapInstance.current = map; // Store map instance
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
        return data.items[0].position; // Returns {lat, lng}
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

  const displayRoute = (encodedPolyline) => {
    if (!mapInstance.current || !platformRef.current) return;

    const lineString = window.H.geo.LineString.fromFlexiblePolyline(encodedPolyline);
    const routePolyline = new window.H.map.Polyline(lineString, {
      style: { strokeColor: "blue", lineWidth: 5 },
    });

    mapInstance.current.addObject(routePolyline);
    mapInstance.current.getViewModel().setLookAtData({ bounds: routePolyline.getBoundingBox() });
  };

  const totalprice= distance*15
  return (
    <div className="body">
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Find Distance & View Map</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Starting Location"
          value={startAddress}
          onChange={(e) => setStartAddress(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Enter Destination Location"
          value={endAddress}
          onChange={(e) => setEndAddress(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={getDistanceAndRoute}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Get Distance & Route
        </button>
        
      </div>
      {distance && <p className="text-lg font-semibold">Distance: {distance}</p>}
      <p className="text-lg font-semibold">Total Price: {totalprice}</p>
      {/* Map container */}
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "400px",
          borderRadius: "8px",
          marginTop: "20px",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
    </div>
  );
};

export default BookRide;
