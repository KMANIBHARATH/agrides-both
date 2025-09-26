import React, { useState, useEffect } from "react";
import "../css/PaymentPage.css"; // ✅ Import CSS

function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [rideFare, setRideFare] = useState(0);
  const serviceFee = 20;
  const tax = 0.18; // 18% GST

  useEffect(() => {
    // Generate a random ride fare between ₹100 and ₹500
    setRideFare(Math.floor(Math.random() * (500 - 100 + 1) + 100));
  }, []);

  const totalBill = (rideFare + serviceFee + rideFare * tax).toFixed(2);

  const handlePayment = () => {
    alert(`✅ Payment of ₹${totalBill} successful via ${paymentMethod}!`);
  };

  return (
    <div className="page-container">
      <div className="content-box">
        <h2>Payment</h2>
        <p>Select your preferred payment method:</p>

        <div className="payment-options">
          <label>
            <input
              type="radio"
              name="payment"
              value="Cash"
              checked={paymentMethod === "Cash"}
              onChange={() => setPaymentMethod("Cash")}
            />
            💵 Cash
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="UPI"
              onChange={() => setPaymentMethod("UPI")}
            />
            📲 UPI
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="Card"
              onChange={() => setPaymentMethod("Card")}
            />
            💳 Credit/Debit Card
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="Wallet"
              onChange={() => setPaymentMethod("Wallet")}
            />
            🔄 Wallet
          </label>
        </div>

        {/* Bill Breakdown */}
        <div className="bill-details">
          <h3>Ride Fare: ₹{rideFare}</h3>
          <p>Service Fee: ₹{serviceFee}</p>
          <p>Tax (18% GST): ₹{(rideFare * tax).toFixed(2)}</p>
          <h2>Total: ₹{totalBill}</h2>
        </div>

        <button className="pay-now-btn" onClick={handlePayment  } 
        >
          
          Pay Now
        </button>
        
      </div>
    </div>
  );
}

export default PaymentPage;
