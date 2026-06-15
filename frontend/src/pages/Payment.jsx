import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    booking,
    flight,
    selectedLuggage,
    selectedSeat,
    totalPrice,
    passengerName,
  } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("Visa / MasterCard");
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isPaying, setIsPaying] = useState(false);

  const paymentOptions = [
    {
      name: "Visa / MasterCard",
      icon: "💳",
    },
  ];

  const formatDate = (dateValue) => {
    return new Date(dateValue).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateValue) => {
    return new Date(dateValue).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!booking || !flight) {
    return (
      <div className="payment-page">
        <Navbar />
        <div className="payment-container">
          <h1>No booking found</h1>
          <button className="back-btn" onClick={() => navigate("/home")}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    if (paymentMethod === "Visa / MasterCard") {
      if (!cardholderName || !cardNumber || !expiryDate || !cvv) {
        alert("Please fill in all card details.");
        return;
      }
    }

    try {
      setIsPaying(true);

      const paymentResponse = await api.post("/Payments", {
        bookingId: booking.id,
        paymentMethod: paymentMethod,
      });

      navigate("/profile", {
        state: {
          booking,
          payment: paymentResponse.data,
          flight,
          selectedLuggage,
          selectedSeat,
          totalPrice,
          passengerName,
        },
      });
    } catch (error) {
      alert(error.response?.data || "Payment failed.");
      console.log(error);
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="payment-page">
      <Navbar />

      <div className="payment-container">
        <button className="back-btn" onClick={() => navigate("/booking")}>
          ← Back to booking
        </button>

        <div className="payment-title">
          <p>FLYEASY PAYMENT</p>
          <h1>Complete your payment</h1>
        </div>

        <div className="payment-layout">
          <div className="payment-card">
            <h2>Choose payment method</h2>

            <div className="payment-method-grid">
              {paymentOptions.map((method) => (
                <button
                  key={method.name}
                  type="button"
                  className={
                    paymentMethod === method.name
                      ? "payment-option selected"
                      : "payment-option"
                  }
                  onClick={() => setPaymentMethod(method.name)}
                >
                  <span className="payment-icon">{method.icon}</span>
                  <strong>{method.name}</strong>

                  <span className="payment-check">
                    {paymentMethod === method.name ? "✓" : ""}
                  </span>
                </button>
              ))}
            </div>

            <div className="card-form">
              {paymentMethod === "Visa / MasterCard" && (
                <>
                  <input
                    type="text"
                    placeholder="Cardholder name"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                  />

                  <input
                    type="text"
                    placeholder="Card number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />

                  <div className="card-row">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                    />

                    <input
                      type="text"
                      placeholder="CVV"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </div>
                </>
              )}

              {paymentMethod === "PayPal" && (
                <div className="payment-info">
                  You will be redirected to PayPal after clicking Pay.
                </div>
              )}

              {paymentMethod === "Apple Pay" && (
                <div className="payment-info">
                  Secure checkout using Apple Pay.
                </div>
              )}

              {paymentMethod === "Google Pay" && (
                <div className="payment-info">
                  Secure checkout using Google Pay.
                </div>
              )}
            </div>

            <button
              className="pay-now-btn"
              onClick={handlePayment}
              disabled={isPaying}
            >
              {isPaying ? "Processing..." : `Pay ${totalPrice} MKD →`}
            </button>
          </div>

          <div className="payment-summary">
            <h3>Booking Summary</h3>

            <div className="summary-route">
              <strong>
                {flight.fromCity} → {flight.toCity}
              </strong>
              <span>{flight.flightNumber}</span>
            </div>

            <div className="summary-row">
              <span>Passenger</span>
              <strong>{passengerName}</strong>
            </div>

            <div className="summary-row">
              <span>Date</span>
              <strong>{formatDate(flight.departureTime)}</strong>
            </div>

            <div className="summary-row">
              <span>Departure</span>
              <strong>{formatTime(flight.departureTime)}</strong>
            </div>

            <div className="summary-row">
              <span>Arrival</span>
              <strong>{formatTime(flight.arrivalTime)}</strong>
            </div>

            <div className="summary-row">
              <span>Luggage</span>
              <strong>{selectedLuggage?.name}</strong>
            </div>

            <div className="summary-row">
              <span>Seat</span>
              <strong>{selectedSeat?.seatNumber}</strong>
            </div>

            <div className="summary-row">
              <span>Payment</span>
              <strong>{paymentMethod}</strong>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <strong>{totalPrice} MKD</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;