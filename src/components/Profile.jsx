import React, { useEffect, useState } from "react";
import "../css/Profile.css";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [balance, setBalance] = useState(1000); // Initial balance

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");

    if (storedName && storedEmail) {
      setUser({ name: storedName, email: storedEmail });
    }
  }, []);

  const handleAddFunds = () => {
    const amount = prompt("Enter amount to add:");
    if (!isNaN(amount) && amount > 0) {
      setBalance(prev => prev + parseFloat(amount));
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2>👤 User Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Account Balance:</strong> ₹{balance.toFixed(2)}</p>

        <button className="funds-btn" onClick={handleAddFunds}>➕ Add Funds</button>
      </div>
    </div>
  );
};

export default Profile;
