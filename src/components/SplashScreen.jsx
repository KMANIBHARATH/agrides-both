import React, { useEffect, useState } from "react";
import "../css/SplashScreen.css"; // ✅ Import CSS
import logo from "../assets/logo.svg"; // ✅ Import Logo

function SplashScreen() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeOut(true), 5000);
  }, []);

  return (
    <div className={`splash-container ${fadeOut ? "fade-out" : ""}`}>
      <img src={logo} alt="RideApp Logo" className="splash-logo" />
      <h1 className="splash-title">RideApp</h1>
      <p className="splash-subtitle">Fast & Reliable Rides Anytime, Anywhere</p>
      <div className="loading-spinner"></div>
    </div>
  );
}

export default SplashScreen;
