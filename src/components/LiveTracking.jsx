import React, { useState, useEffect } from "react";
import "../css/LiveTracking.css";
import mapImage from "../assets/map-image.webp";

function LiveTracking() {
  const [status, setStatus] = useState("Searching for Driver...");
  const [eta, setEta] = useState("Calculating...");
  const [showDriver, setShowDriver] = useState(false); // new state

  useEffect(() => {
    setTimeout(() => setStatus("Driver Found 🚗"), 3000);
    setTimeout(() => setEta("5 min"), 5000);
    setTimeout(() => setStatus("Driver is on the way 🛣️"), 7000);
    setTimeout(() => setStatus("Arriving Soon ⏱️"), 12000);
    setTimeout(() => setStatus("Ride Started ✅"), 15000);
  }, []);

  const handleContactClick = () => {
    setShowDriver(!showDriver);
  };

  return (
    <div className="tracking-container">
      <div className="tracking-box">
        <h2 className="tracking-title">🚦 Live Ride Tracking</h2>
        <div className="status-section">
          <p className="status-text">{status}</p>
          <p className="eta-text">Estimated Arrival: <strong>{eta}</strong></p>
        </div>

        <div className="map-wrapper">
          <img src={mapImage} alt="Map Tracking" className="map-img" />
        </div>

        <button className="driver-contact-button" onClick={handleContactClick}>
          📞 Contact Driver
        </button>

        {showDriver && (
          <div className="driver-details">
            <h3>Driver Details</h3>
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Phone:</strong> +1-234-567-8901</p>
            <p><strong>Vehicle:</strong> Toyota Prius (ABC-1234)</p>
            <p><strong>Rating:</strong> ⭐ 4.8</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LiveTracking;
