import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Profile() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state || {};
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/auth");
    return null;
  }

  const firstName = user?.firstName || user?.FirstName || "";
  const lastName = user?.lastName || user?.LastName || "";
  const fullName =
    user?.fullName ||
    user?.FullName ||
    `${firstName} ${lastName}`.trim();

  const booking = state.booking;
  const payment = state.payment;
  const flight = state.flight;
  const selectedLuggage = state.selectedLuggage;
  const selectedSeat = state.selectedSeat;
  const totalPrice = state.totalPrice;
  const passengerName = state.passengerName;

  const bookingsCount = user?.bookingsCount || 0;

  const formatDate = (dateValue) => {
    if (!dateValue) return "Not available";

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

  const getInitials = () => {
    const name = fullName || "FlyEasy Passenger";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <div className="profile-page new-profile-page">
      <Navbar />

      <div className="new-profile-container">
        <div className="profile-hero-card">
          <div className="profile-avatar">{getInitials()}</div>

          <div className="profile-user-info">
            <p>WELCOME BACK</p>
            <h1>{fullName || "FlyEasy Passenger"}</h1>
            <span>{user.email}</span>
            <p className="profile-hub-text">Your personal travel hub</p>
          </div>

          <button className="profile-logout-btn" onClick={logout}>
            Logout
          </button>
        </div>

        <div className="profile-grid">
          <div className="profile-card passenger-info-card">
            <div className="passenger-info-header">
              <div className="passenger-info-icon">✈</div>
              <div>
                <p>ACCOUNT OVERVIEW</p>
                <h2>Travel Dashboard</h2>
              </div>
            </div>

            <div className="travel-dashboard-grid">
              <div className="profile-stat-card">
                <span>Account Status</span>
                <strong>Active</strong>
              </div>

              <div className="profile-stat-card">
                <span>Member Type</span>
                <strong>FlyEasy Standard</strong>
              </div>

              <div className="profile-stat-card wide">
                <span>Email Address</span>
                <strong>{user.email}</strong>
              </div>

              

              <div className="profile-stat-card">
                <span>Last Login</span>
                <strong>Today</strong>
              </div>

              <div className="profile-stat-card">
                <span>Account Role</span>
                <strong>{user.role || user.Role || "Customer"}</strong>
              </div>
            </div>
          </div>

          <div className="profile-card profile-actions-card">
            <h2>Quick Actions</h2>

            <button onClick={() => navigate("/home")}>Book new flight →</button>

            <button onClick={() => navigate("/my-bookings")}>
              View my bookings →
            </button>

            <button onClick={() => navigate("/flights")}>
              Browse flights →
            </button>
          </div>
        </div>

        {booking && flight ? (
          <div className="profile-ticket-section">
            <div className="profile-section-title">
              <p>LATEST BOARDING PASS</p>
              <h2>Your latest ticket</h2>
            </div>

            <div className="profile-ticket-card">
              <div className="profile-ticket-main">
                <div className="profile-ticket-top">
                  <div>
                    <p>BOARDING PASS</p>
                    <h2>FlyEasy Travel</h2>
                  </div>

                  <span>{booking.status || "Confirmed"}</span>
                </div>

                <div className="profile-ticket-route">
                  <div>
                    <span>FROM</span>
                    <strong>{flight.fromCode}</strong>
                    <p>{flight.fromCity}</p>
                  </div>

                  <div className="profile-ticket-plane">✈</div>

                  <div>
                    <span>TO</span>
                    <strong>{flight.toCode}</strong>
                    <p>{flight.toCity}</p>
                  </div>
                </div>

                <div className="profile-ticket-details">
                  <div>
                    <span>Passenger</span>
                    <strong>
                      {passengerName || fullName || "FlyEasy Passenger"}
                    </strong>
                  </div>

                  <div>
                    <span>Flight</span>
                    <strong>{flight.flightNumber}</strong>
                  </div>

                  <div>
                    <span>Date</span>
                    <strong>{formatDate(flight.departureTime)}</strong>
                  </div>

                  <div>
                    <span>Departure</span>
                    <strong>{formatTime(flight.departureTime)}</strong>
                  </div>

                  <div>
                    <span>Arrival</span>
                    <strong>{formatTime(flight.arrivalTime)}</strong>
                  </div>

                  <div>
                    <span>Seat</span>
                    <strong>{selectedSeat?.seatNumber || "N/A"}</strong>
                  </div>

                  <div>
                    <span>Luggage</span>
                    <strong>{selectedLuggage?.name || "N/A"}</strong>
                  </div>

                  <div>
                    <span>Payment</span>
                    <strong>{payment?.paymentMethod || "Paid"}</strong>
                  </div>

                  <div>
                    <span>Total paid</span>
                    <strong>{totalPrice || booking.totalPrice} MKD</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="profile-empty-bookings">
            <div>
              <p>NO ACTIVE TICKET SELECTED</p>
              <h2>Your profile is ready</h2>
              <span>
                Open My Bookings to view your boarding passes or book a new
                flight.
              </span>
            </div>

            <button onClick={() => navigate("/my-bookings")}>
              Go to My Bookings →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;