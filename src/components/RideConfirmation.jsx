import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/RideConfirmation.css";

function RideConfirmation() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const generateOtpForRide = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    setGeneratedOtp(otp);
    alert(`Your OTP is: ${otp}`);
  };

  const handleConfirmRide = async () => {
    if (otp === String(generatedOtp)) {
      setMessage("✅ OTP Verified. Ride confirmed!");
      // Proceed with ride booking logic
      const userId = localStorage.getItem("userId");
      const rideData = {
        user: { id: parseInt(userId) },
        startLocation: pickupLocation,
        endLocation: dropLocation,
        rideDate: new Date().toISOString(),
        rideStatus: "PENDING",
      };

      try {
        const response = await fetch("http://localhost:9001/api/ride-booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(rideData),
        });

        if (response.ok) {
          setMessage("✅ Ride booked successfully!");
          setTimeout(() => navigate("/ride-history"), 1500);
        } else {
          const errorText = await response.text();
          setMessage("❌ Failed to book ride. " + errorText);
        }
      } catch (error) {
        setMessage("❌ Server error occurred!");
      }
    } else {
      setMessage("❌ Incorrect OTP. Please try again.");
    }
  };

  return (
    <div className="ride-confirmation">
      <div className="ride-card">
        <h2>Book a Ride</h2>
        <input
          type="text"
          placeholder="Pickup Location"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Drop Location"
          value={dropLocation}
          onChange={(e) => setDropLocation(e.target.value)}
        />
        <button onClick={generateOtpForRide}>Generate OTP</button>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button onClick={handleConfirmRide}>Confirm Ride</button>
        <p className="ride-message">{message}</p>
      </div>
    </div>
  );
}

export default RideConfirmation;
