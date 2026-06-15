import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const flight = location.state?.flight;
  const passengers = 1;

  const [luggagePackages, setLuggagePackages] = useState([]);
  const [seats, setSeats] = useState([]);
  const [selectedLuggage, setSelectedLuggage] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const [passenger, setPassenger] = useState({
  firstName: "",
  lastName: "",
  gender: "Female",
  needsAssistance: false,
});

  useEffect(() => {
    if (!flight) return;

    const loadData = async () => {
      try {
        const luggageResponse = await api.get("/LuggagePackages");
        const seatsResponse = await api.get(`/Seats/flight/${flight.id}`);

        setLuggagePackages(luggageResponse.data);
        setSeats(seatsResponse.data);

        if (luggageResponse.data.length > 0) {
          setSelectedLuggage(luggageResponse.data[0]);
        }
      } catch (error) {
        console.log(error);
        alert("Failed to load booking data.");
      }
    };

    loadData();
  }, [flight]);

  if (!flight) {
    return (
      <div className="booking-page">
        <Navbar />
        <div className="booking-container">
          <h1>No flight selected</h1>
          <button className="back-btn" onClick={() => navigate("/home")}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const flightTotal = flight.basePrice * passengers;
  const luggageTotal = selectedLuggage ? selectedLuggage.price * passengers : 0;
  const totalPrice = flightTotal + luggageTotal;

  const groupedSeats = [...new Set(seats.map((s) => s.seatNumber.slice(0, -1)))]
    .sort((a, b) => Number(a) - Number(b));

  const continueToPayment = async () => {
    if (!passenger.firstName.trim() || !passenger.lastName.trim()) {
  alert("Please enter passenger first name and last name.");
  return;
}

    if (!selectedLuggage) {
      alert("Please select luggage package.");
      return;
    }

    if (!selectedSeat) {
      alert("Please select a seat.");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  alert("Please login before booking.");
  navigate("/auth");
  return;
}
 

if (!user) {
  alert("Please login before booking.");
  navigate("/auth");
  return;
}

const userId = user.id || user.userId || user.Id;

console.log("LOGGED USER:", user);
console.log("USER ID:", userId);

const bookingResponse = await api.post("/Bookings", {
  userId: userId,
  flightId: flight.id,
  luggagePackageId: selectedLuggage.id,
  seatId: selectedSeat.id,
});

      const passengerResponse = await api.post("/Passengers", {
  bookingId: bookingResponse.data.id,
  firstName: passenger.firstName,
  lastName: passenger.lastName,
  gender: passenger.gender,
  needsAssistance: passenger.needsAssistance,
});

      navigate("/payment", {
        state: {
          booking: bookingResponse.data,
          flight,
          passengers,
          selectedLuggage,
          selectedSeat,
          totalPrice: bookingResponse.data.totalPrice,
          passenger: passengerResponse.data,

              passengerName: `${passenger.firstName} ${passenger.lastName}`
        },
      });
    } catch (error) {
      alert(error.response?.data || "Booking failed.");
      console.log(error);

      
  console.log("FULL ERROR:", error);
  console.log("BACKEND ERROR:", error.response?.data);
  alert(error.response?.data || "Booking failed.");

    }
  };

  return (
    <div className="booking-page">
      <Navbar />

      <div className="booking-container">
        <button className="back-btn" onClick={() => navigate("/flights")}>
          ← Back to flights
        </button>

        <div className="booking-title">
          <p>FLYEASY BOOKING</p>
          <h1>Customize your trip</h1>
        </div>

        <div className="booking-layout">
          <div className="booking-left">
            <div className="booking-hero-card">
              <div className="route-box">
                <div>
                  <span className="small-label">FROM</span>
                  <strong>{flight.fromCode}</strong>
                  <p>{flight.fromCity}</p>
                </div>

                <div className="route-line">✈</div>

                <div>
                  <span className="small-label">TO</span>
                  <strong>{flight.toCode}</strong>
                  <p>{flight.toCity}</p>
                </div>
              </div>

              <div className="flight-mini-info">
                <div>
                  <span>Flight</span>
                  <strong>{flight.flightNumber}</strong>
                </div>

                <strong>
  {passenger?.firstName} {passenger?.lastName}
</strong>

                <div>
                  <span>Base price</span>
                  <strong>{flight.basePrice} MKD</strong>
                </div>
              </div>
            </div>

            <div className="booking-section-card">
  <h2>Passenger details</h2>

  <div className="passenger-form-grid">
    <label>
      First name
      <input
        type="text"
        value={passenger.firstName}
        onChange={(e) =>
          setPassenger({ ...passenger, firstName: e.target.value })
        }
        placeholder="Enter first name"
      />
    </label>

    <label>
      Last name
      <input
        type="text"
        value={passenger.lastName}
        onChange={(e) =>
          setPassenger({ ...passenger, lastName: e.target.value })
        }
        placeholder="Enter last name"
      />
    </label>

    <label>
      Gender
      <select
        value={passenger.gender}
        onChange={(e) =>
          setPassenger({ ...passenger, gender: e.target.value })
        }
      >
        <option value="Female">Female</option>
        <option value="Male">Male</option>
        <option value="Other">Other</option>
      </select>
    </label>

    <label className="assistance-check">
      <input
        type="checkbox"
        checked={passenger.needsAssistance}
        onChange={(e) =>
          setPassenger({ ...passenger, needsAssistance: e.target.checked })
        }
      />
      Needs assistance
    </label>
  </div>
</div>

            <div className="booking-section-card">
              <h2>Select luggage package</h2>

              <div className="luggage-grid">
                {luggagePackages.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={
                      selectedLuggage?.id === option.id
                        ? "luggage-box active"
                        : "luggage-box"
                    }
                    onClick={() => setSelectedLuggage(option)}
                  >
                    <div className="luggage-top">
                      <span className="luggage-icon">🧳</span>
                      <span className="luggage-radio">
                        {selectedLuggage?.id === option.id ? "✓" : ""}
                      </span>
                    </div>

                    <h4>{option.name}</h4>
                    <p>{option.description}</p>
                    <strong>
                      {option.price === 0 ? "Free" : `+${option.price} MKD`}
                    </strong>
                  </button>
                ))}
              </div>
            </div>

            <div className="booking-section-card">
              <div className="seat-header">
                <div>
                  <h2>Choose your seat</h2>
                  <p>Booked seats come directly from database.</p>
                </div>

                <div className="seat-legend">
                  <span>
                    <i className="available-dot"></i> Available
                  </span>
                  <span>
                    <i className="selected-dot"></i> Selected
                  </span>
                  <span>
                    <i className="booked-dot"></i> Booked
                  </span>
                </div>
              </div>

              <div className="aircraft-card">
                <div className="aircraft-nose">✈</div>

                <div className="seat-map-airplane">
                  {groupedSeats.map((row) => {
                    const rowSeats = ["A", "B", "C", "D", "E", "F"].map(
                      (letter) =>
                        seats.find((s) => s.seatNumber === `${row}${letter}`)
                    );

                    return (
                      <div className="seat-row-airplane" key={row}>
                        {rowSeats.map((seat, index) => {
                          if (index === 3) {
                            return (
                              <div
                                className="seat-with-aisle"
                                key={`aisle-${row}-${index}`}
                              >
                                <div className="aisle-gap"></div>

                                {seat ? (
                                  <button
                                    type="button"
                                    disabled={seat.isBooked}
                                    className={
                                      seat.isBooked
                                        ? "seat-clean booked"
                                        : selectedSeat?.id === seat.id
                                        ? "seat-clean selected"
                                        : "seat-clean"
                                    }
                                    onClick={() => setSelectedSeat(seat)}
                                  >
                                    {seat.seatNumber}
                                  </button>
                                ) : (
                                  <div className="seat-placeholder"></div>
                                )}
                              </div>
                            );
                          }

                          if (!seat) {
                            return (
                              <div
                                className="seat-placeholder"
                                key={`${row}-${index}`}
                              ></div>
                            );
                          }

                          return (
                            <button
                              key={seat.id}
                              type="button"
                              disabled={seat.isBooked}
                              className={
                                seat.isBooked
                                  ? "seat-clean booked"
                                  : selectedSeat?.id === seat.id
                                  ? "seat-clean selected"
                                  : "seat-clean"
                              }
                              onClick={() => setSelectedSeat(seat)}
                            >
                              {seat.seatNumber}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="selected-seat-box">
                {selectedSeat ? (
                  <>
                    <strong>Selected seat:</strong>
                    <span>
                      {selectedSeat.seatNumber} · {selectedSeat.class}
                    </span>
                  </>
                ) : (
                  <>
                    <strong>No seat selected</strong>
                    <span>Please choose a seat to continue.</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="booking-summary premium-summary">
            <h3>Trip Summary</h3>

            <div className="summary-route">
              <strong>
                {flight.fromCity} → {flight.toCity}
              </strong>
              <span>{flight.flightNumber}</span>
            </div>

            <div className="summary-row">
              <span>Flight price</span>
              <strong>{flightTotal} MKD</strong>
            </div>

            <div className="summary-row">
              <span>{selectedLuggage?.name || "Luggage"}</span>
              <strong>{luggageTotal} MKD</strong>
            </div>

            <div className="summary-row">
              <span>
                Seat {selectedSeat ? selectedSeat.seatNumber : "not selected"}
              </span>
              <strong>0 MKD</strong>
            </div>

           

            <div className="summary-row total">
              <span>Total</span>
              <strong>{totalPrice} MKD</strong>
            </div>

            <button onClick={continueToPayment}>
              Continue to payment →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;