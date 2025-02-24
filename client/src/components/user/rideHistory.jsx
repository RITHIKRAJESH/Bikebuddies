import React, { useEffect, useState } from "react";
import Userhome from "./usernav";
import axios from "axios";

export default function RideHistory() {
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    const userid = localStorage.getItem("id");
    axios
      .get("http://localhost:9000/user/viewmybookings", { headers: { _id: userid } })
      .then((res) => {
        console.log(res.data);
        setBooking(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCancelBooking = (rideId, status) => {
    if (status === "Confirmed") {
      alert("Cancelling a confirmed booking may cause issues with your future bookings.");
      axios
      .put("http://localhost:9000/rider/updateStatus", { status: status,id: rideId })
      .then((res) => {
        console.log(res.data)})
      .catch((err)=>{
        console.log(err)
      })
    } else {
      alert("Booking cancelled successfully!");
      axios
      .put("http://localhost:9000/rider/updateStatus", { status: status,id: rideId })
      .then((res) => {
        console.log(res.data)})
      .catch((err)=>{
        console.log(err)
      })
    }
  };

  return (
    <>
      <Userhome />
      <div className="container mx-auto p-6 mt-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Ride History</h2>

        {booking.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {booking.map((ride, index) => (
              <div
                key={index}
                className="relative bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all"
              >
                {/* Booking Header */}
                <div className="absolute top-0 left-0 right-0 px-4 py-2 bg-blue-600 text-white rounded-t-lg text-center font-semibold">
                  Booking #{index + 1}
                </div>

                {/* Ride Details */}
                <div className="mt-10">
                  <div className="mb-3">
                    <p className="text-lg font-semibold text-gray-700">🚖 Vehicle Number: <span className="text-blue-500">{ride.vehicleId?.regNo || "N/A"}</span></p>
                  </div>

                  <div className="mb-3">
                    <p className="text-md font-semibold text-gray-600">📍 Start: <span className="text-gray-800">{ride.startAddress}</span></p>
                    <p className="text-md font-semibold text-gray-600">📍 End: <span className="text-gray-800">{ride.endAddress}</span></p>
                  </div>

                  <div className="mb-3">
                     <p className="text-md font-semibold text-gray-600">🚗 Distance: <span className="text-gray-800">{ride.totalDistance}</span></p>
                     <p className="text-md font-semibold text-gray-600">💵 Amount: <span className="text-gray-800">{ride.fare}</span></p>
                   </div>


                  <div className="mb-3">
                    <p className="text-sm text-gray-500">📅 Date: <span className="font-medium text-gray-800">{new Date(ride.createdAt).toLocaleDateString()}</span></p>
                  </div>

                  {/* Status Indicator */}
                  <div className="text-sm font-semibold">
                    🚦 Status:{" "}
                    <span className={`px-3 py-1  text-black ${ride.status === "Confirmed" ? "bg-green-500" : ride.status === "Pending" ? "bg-yellow-500" : "bg-white-500"}`}>
                      {ride.status}
                    </span>
                  </div>

                  {/* Cancel Button */}
                  {ride.status === "Booked" || ride.status === "Confirmed" ? (
                    <button
                      onClick={() => handleCancelBooking(ride._id, "Cancelled")}
                     className="btn45"     >
                      Cancel Booking
                    </button>
                  ) : (
                    <button
                      disabled
                      // className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-md cursor-not-allowed"
                    >
                      Cancelled
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">No bookings found.</p>
        )}
      </div>

      <style jsx>{`

        .btn45{
        width:50%;
        border:none;
        border-radius:10px;
        padding:5px;
        background-color:#e82828;
        margin-top:5px;
        }

        .container {
          width: 90%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .relative {
          position: relative;
        }

        .bg-white {
          background-color: white;
        }

        .p-6 {
          padding: 1.5rem;
        }

        .rounded-lg {
          border-radius: 0.75rem;
        }

        .shadow-md {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .border {
          border: 1px solid #e5e7eb;
        }

        .hover\:shadow-lg:hover {
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        }

        .bg-blue-600 {
          background-color: #2563eb;
        }

        .text-white {
          color: white;
        }

        .rounded-t-lg {
          border-radius: 0.75rem 0.75rem 0 0;
        }

        .text-center {
          text-align: center;
        }

        .font-semibold {
          font-weight: 600;
        }

        .font-bold {
          font-weight: 700;
        }

        .text-gray-800 {
          color: #1f2937;
        }

        .text-gray-600 {
          color: #4b5563;
        }

        .text-gray-500 {
          color: #6b7280;
        }

        .text-blue-500 {
          color: #3b82f6;
        }

        .text-md {
          font-size: 1.125rem;
        }

        .text-sm {
          font-size: 0.875rem;
        }

        .px-4 {
          padding-left: 1rem;
          padding-right: 1rem;
        }

        .py-2 {
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }

        .mb-3 {
          margin-bottom: 0.75rem;
        }

        .mb-8 {
          margin-bottom: 2rem;
        }

        .font-medium {
          font-weight: 500;
        }

        .bg-green-500 {
          background-color: #10b981;
        }

        .bg-yellow-500 {
          background-color: #fbbf24;
        }

        .bg-red-500 {
          background-color: #ef4444;
        }

        .rounded-full {
          border-radius: 9999px;
        }

        .transition-all {
          transition: all 0.3s ease-in-out;
        }

        .text-lg {
          font-size: 1.125rem;
        }

        .text-lg {
          font-size: 1.125rem;
        }

        .text-center {
          text-align: center;
        }
      `}</style>
    </>
  );
}
