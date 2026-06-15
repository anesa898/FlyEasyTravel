import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Flights() {
  const location = useLocation();
  const navigate = useNavigate();

  const [flights, setFlights] = useState(location.state?.flights || []);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("time");

  const passengers = location.state?.passengers || 1;

  useEffect(() => {
    if (location.state?.flights) return;

    const loadAllFlights = async () => {
      try {
        setLoading(true);
        const response = await api.get("/Flights");
        setFlights(response.data);
      } catch (error) {
        console.log("FLIGHTS ERROR:", error.response?.data);
        alert("Could not load flights.");
      } finally {
        setLoading(false);
      }
    };

    loadAllFlights();
  }, [location.state]);

  const formatDate = (dateValue) =>
    new Date(dateValue).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formatTime = (dateValue) =>
    new Date(dateValue).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const getDuration = (departure, arrival) => {
    const minutes = Math.round(
      (new Date(arrival) - new Date(departure)) / 1000 / 60
    );

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return `${hours}h ${mins}m`;
  };

  const sortedFlights = useMemo(() => {
    const copy = [...flights];

    if (sortBy === "price") {
      return copy.sort((a, b) => a.basePrice - b.basePrice);
    }

    if (sortBy === "date") {
      return copy.sort(
        (a, b) => new Date(a.departureTime) - new Date(b.departureTime)
      );
    }

    return copy.sort(
      (a, b) => new Date(a.departureTime) - new Date(b.departureTime)
    );
  }, [flights, sortBy]);

  const getCityImage = (city) => {
  const images = {
    Paris: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    London: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
    Rome: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
    Barcelona: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=80",
    Munich: "https://images.unsplash.com/photo-1595867818082-083862f3d630?auto=format&fit=crop&w=1200&q=80",
    Athens: "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=1200&q=80",
    Vienna: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1200&q=80",
    Dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    Istanbul: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80",
    Amsterdam: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1200&q=80",
  };

  return (
    images[city] ||
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80"
  );
};

  return (
    <div className="flights-page">
      <Navbar />

      <div className="flights-container compact-flights-container">
        <button className="back-btn" onClick={() => navigate("/home")}>
          ← Back to search
        </button>

        <div className="flights-header compact-flights-header">
          <div>
            <p>FLYEASY AVAILABLE ROUTES</p>
            <h1>Choose your flight</h1>
            <span>{sortedFlights.length} available flights found</span>
          </div>

          <div className="flight-sort-box">
            <label>Sort by</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="time">Departure time</option>
              <option value="price">Lowest price</option>
              <option value="date">Date</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flights-empty-card">
            <h2>Loading flights...</h2>
            <p>Please wait while we search available flights.</p>
          </div>
        ) : sortedFlights.length === 0 ? (
          <div className="flights-empty-card">
            <h2>No flights found</h2>
            <p>Please choose another destination or date.</p>
            <button onClick={() => navigate("/home")}>Search again</button>
          </div>
        ) : (
          <div className="compact-flights-list">
            {sortedFlights.map((flight) => (
              <div
  className="compact-flight-card destination-bg-card"
  key={flight.id}
  style={{
    backgroundImage: `linear-gradient(
  rgba(255,255,255,0.70),
  rgba(255,255,255,0.55)
), url(${getCityImage(flight.toCity)})`
  }}
>
                <div className="compact-flight-left">
                  <div className="compact-flight-number">
                    <span>Flight</span>
                    <strong>{flight.flightNumber}</strong>
                  </div>

                  <div className="compact-route">
                    <div>
                      <strong>{flight.fromCode}</strong>
                      <span>{flight.fromCity}</span>
                    </div>

                    <div className="compact-route-line">
                      <span>{getDuration(flight.departureTime, flight.arrivalTime)}</span>
                      <i>✈</i>
                    </div>

                    <div>
                      <strong>{flight.toCode}</strong>
                      <span>{flight.toCity}</span>
                    </div>
                  </div>
                </div>

                <div className="compact-flight-details">
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
                    <span>Seats</span>
                    <strong>{flight.availableSeats}</strong>
                  </div>
                </div>

                <div className="compact-flight-action">
                  <span className="direct-badge">Direct</span>

                  <div className="compact-price">
                    {flight.basePrice}
                    <small>MKD</small>
                  </div>

                  <button
                    onClick={() =>
                      navigate("/booking", {
                        state: { flight, passengers },
                      })
                    }
                  >
                    Select →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Flights;