import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/auth");
      return;
    }

    const loadBookings = async () => {
      try {
        const userId = user.id || user.userId || user.Id;

        if (!userId) {
          alert("User ID not found. Please login again.");
          localStorage.removeItem("user");
          navigate("/auth");
          return;
        }

        const response = await api.get(`/Bookings/user/${userId}`);
        setBookings(response.data);
      } catch (error) {
        console.log("BOOKINGS ERROR:", error.response?.data);
        alert(error.response?.data || "Could not load your bookings.");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [navigate]);

  const formatDate = (dateValue) => {
    if (!dateValue) return "Date unavailable";

    return new Date(dateValue).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateValue) => {
    if (!dateValue) return "--:--";

    return new Date(dateValue).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const gateCloseTime = (departureTime) => {
    if (!departureTime) return null;

    const gateClose = new Date(departureTime);
    gateClose.setMinutes(gateClose.getMinutes() - 40);
    return gateClose;
  };

  const openTicket = (booking) => {
    navigate("/profile", {
      state: {
        booking,
        flight: booking.flight,
        selectedSeat: booking.seat,
        selectedLuggage: booking.luggagePackage,
        totalPrice: booking.totalPrice,
        passengerName: booking.passengerName || "FlyEasy Passenger",
        payment: {
          paymentMethod: booking.paymentMethod || "Paid",
        },
      },
    });
  };

  return (
    <div className="my-bookings-page">
      <Navbar />

      <div className="my-bookings-container">
        <button className="back-btn" onClick={() => navigate("/home")}>
          ← Back to Home
        </button>

        <div className="my-bookings-header">
          <p>FLYEASY ACCOUNT</p>
          <h1>My Bookings</h1>
          
        </div>

        {loading ? (
          <div className="my-bookings-empty">
            <div className="empty-icon">✈</div>
            <h2>Loading bookings...</h2>
            <p>Please wait while we load your reservations.</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="my-bookings-empty">
            <div className="empty-icon">✈</div>
            <h2>No bookings yet</h2>
            <p>Your booked flights will appear here after payment.</p>
            <button onClick={() => navigate("/home")}>Book a flight →</button>
          </div>
        ) : (
          <div className="my-bookings-list">
            {bookings.map((booking) => {
              const flight = booking.flight;
              const seat = booking.seat;
              const luggage = booking.luggagePackage;
              const gateClose = gateCloseTime(flight?.departureTime);
              const passenger = booking.passenger;

              return (
                <div className="my-real-ticket" key={booking.id}>
                  <div className="my-ticket-main">
                    <div className="my-ticket-top">
                      <div>
                        <p>BOARDING PASS</p>
                        <h2>FlyEasy Travel</h2>
                      </div>

                      <span
                        className={
                          booking.status === "Paid"
                            ? "my-status-badge paid"
                            : "my-status-badge"
                        }
                      >
                        {booking.status || "Confirmed"}
                      </span>
                    </div>

                    <div className="my-ticket-barcode"></div>

                    <div className="my-ticket-route">
                      <div>
                        <span>FROM</span>
                        <strong>{flight?.fromCode}</strong>
                        <p>{flight?.fromCity}</p>
                      </div>

                      <div className="my-ticket-plane">✈</div>

                      <div>
                        <span>TO</span>
                        <strong>{flight?.toCode}</strong>
                        <p>{flight?.toCity}</p>
                      </div>
                    </div>

                    <div className="my-ticket-passenger">
  <div>
    <span>Passenger</span>
    <strong>
      {passenger
        ? `${passenger.firstName} ${passenger.lastName}`
        : "Passenger"}
    </strong>
  </div>

                      <div>
                        <span>Seat</span>
                        <strong>{seat?.seatNumber}</strong>
                      </div>

                      <div>
                        <span>Luggage</span>
                        <strong>{luggage?.name}</strong>
                      </div>
                    </div>

                    <div className="my-ticket-time-strip">
                      <div>
                        <span>Date</span>
                        <strong>{formatDate(flight?.departureTime)}</strong>
                      </div>

                      <div>
                        <span>Gate closes</span>
                        <strong>{formatTime(gateClose)}</strong>
                      </div>

                      <div>
                        <span>Departure</span>
                        <strong>{formatTime(flight?.departureTime)}</strong>
                      </div>

                      <div>
                        <span>Arrival</span>
                        <strong>{formatTime(flight?.arrivalTime)}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="my-ticket-side">
                    <div className="my-ticket-cut top"></div>
                    <div className="my-ticket-cut bottom"></div>

                    <p>Total paid</p>
                    <h2>{booking.totalPrice} MKD</h2>
                    <span>{booking.status || "Confirmed"}</span>

                    <button onClick={() => openTicket(booking)}>
                      View ticket →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;