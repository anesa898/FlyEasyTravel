import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function SearchBox() {
  const navigate = useNavigate();

  const [allFlights, setAllFlights] = useState([]);
  const [fromCity, setFromCity] = useState("Skopje");
  const [toCity, setToCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showDestinations, setShowDestinations] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadFlights = async () => {
      try {
        const response = await api.get("/Flights");
        setAllFlights(response.data);
      } catch (error) {
        setMessage("Backend is not running or flights could not be loaded.");
        console.log(error);
      }
    };

    loadFlights();
  }, []);

  const destinations = useMemo(() => {
    return [...new Set(allFlights.map((flight) => flight.toCity))].sort();
  }, [allFlights]);

  const destinationFlights = useMemo(() => {
    if (!toCity) return [];

    return allFlights.filter(
      (flight) =>
        flight.fromCity.toLowerCase() === fromCity.toLowerCase() &&
        flight.toCity.toLowerCase() === toCity.toLowerCase()
    );
  }, [allFlights, fromCity, toCity]);

  const availableDates = useMemo(() => {
    return [
      ...new Set(
        destinationFlights.map((flight) =>
          new Date(flight.departureTime).toISOString().split("T")[0]
        )
      ),
    ].sort();
  }, [destinationFlights]);

  const flightsForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];

    return destinationFlights.filter((flight) => {
      const flightDate = new Date(flight.departureTime)
        .toISOString()
        .split("T")[0];

      return flightDate === selectedDate;
    });
  }, [destinationFlights, selectedDate]);

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

  const selectDestination = (city) => {
    setToCity(city);
    setSelectedDate("");
    setShowDestinations(false);
    setMessage("");
  };

  const selectFlightTime = (flight) => {
    navigate("/booking", {
      state: {
        flight,
      },
    });
  };

  return (
    <div className="modern-search-card">
      <div className="search-card-header">
        <span>✈</span>

        <div>
          <h2>Find your flight</h2>
          <p>Choose destination, date, and available time</p>
        </div>
      </div>

      <div className="search-grid">
        <label>
          Leaving from
          <input
            type="text"
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
          />
        </label>

        <label className="destination-picker">
          Going to
          <button
            type="button"
            className="destination-select-btn"
            onClick={() => setShowDestinations(!showDestinations)}
          >
            <span>{toCity || "Choose destination"}</span>
            <b>⌄</b>
          </button>
        </label>
      </div>

      {showDestinations && (
        <div className="step-box">
          <h3>Select destination</h3>

          <div className="destination-options-grid">
            {destinations.map((city) => (
              <button
                key={city}
                type="button"
                className={
                  toCity === city
                    ? "destination-option active"
                    : "destination-option"
                }
                onClick={() => selectDestination(city)}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}

      {toCity && (
        <div className="step-box">
          <h3>Available dates for {toCity}</h3>

          {availableDates.length === 0 ? (
            <p className="search-message">
              No flights available from {fromCity} to {toCity}.
            </p>
          ) : (
            <div className="date-options">
              {availableDates.map((date) => (
                <button
                  key={date}
                  type="button"
                  className={
                    selectedDate === date ? "date-option active" : "date-option"
                  }
                  onClick={() => setSelectedDate(date)}
                >
                  {formatDate(date)}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {selectedDate && (
        <div className="step-box">
          <h3>Available times</h3>

          <div className="available-flight-list">
            {flightsForSelectedDate.map((flight) => (
              <button
                key={flight.id}
                type="button"
                className="available-flight-option"
                onClick={() => selectFlightTime(flight)}
              >
                <div>
                  <strong>{formatTime(flight.departureTime)}</strong>
                  <span>{flight.flightNumber}</span>
                </div>

                <div>
                  <p>
                    {flight.fromCity} → {flight.toCity}
                  </p>
                  <small>
                    Arrives {formatTime(flight.arrivalTime)} ·{" "}
                    {flight.basePrice} MKD
                  </small>
                </div>

                <b>Select →</b>
              </button>
            ))}
          </div>
        </div>
      )}

      {message && <p className="search-message">{message}</p>}
    </div>
  );
}

export default SearchBox;