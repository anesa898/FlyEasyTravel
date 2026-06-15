import Navbar from "../components/Navbar";
import SearchBox from "../components/SearchBox";

function Home() {
  return (
    <div className="home-page">
      <Navbar />

      {/* HERO SECTION */}
      <section className="home-hero">
        
        <div className="home-hero-left">
          <p className="hero-label">FLYEASY PREMIUM TRAVEL</p>

          <h1>
            Explore Europe
            <br />
            One Flight Away
          </h1>

          <p className="hero-description">
            Search flights, select your seat, choose luggage,
            complete payment and receive your boarding pass instantly.
            Everything you need for your journey in one place.
          </p>

          <div className="hero-buttons">
            <button
              className="hero-primary-btn"
              onClick={() =>
                document
                  .querySelector(".search-box")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Search Flights →
            </button>

            <button
              className="hero-secondary-btn"
              onClick={() =>
                document
                  .querySelector(".destinations-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Destinations
            </button>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <strong>30+</strong>
              <span>Destinations</span>
            </div>

            <div className="hero-stat">
              <strong>10K+</strong>
              <span>Passengers</span>
            </div>

            <div className="hero-stat">
              <strong>24/7</strong>
              <span>Support</span>
            </div>

            <div className="hero-stat">
              <strong>100%</strong>
              <span>Secure</span>
            </div>
          </div>
        </div>

        <div className="home-hero-right">
          <SearchBox />
        </div>
      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="destinations-section">
        <div className="section-heading">
          <p>POPULAR DESTINATIONS</p>
          <h2>Where would you like to fly?</h2>
        </div>

        <div className="destination-grid">
          <div className="destination-card paris">
            <div className="destination-overlay">
              <span>Paris</span>
              <p>Skopje → Paris</p>
            </div>
          </div>

          <div className="destination-card london">
            <div className="destination-overlay">
              <span>London</span>
              <p>Skopje → London</p>
            </div>
          </div>

          <div className="destination-card rome">
            <div className="destination-overlay">
              <span>Rome</span>
              <p>Skopje → Rome</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="features-section">
        <div className="section-heading">
          <p>WHY FLYEASY</p>
          <h2>Travel smarter</h2>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✈️</div>
            <h3>Fast Booking</h3>
            <p>
              Book flights in minutes with a simple and intuitive experience.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💺</div>
            <h3>Seat Selection</h3>
            <p>
              Choose your preferred seat before departure.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🧳</div>
            <h3>Luggage Options</h3>
            <p>
              Flexible luggage packages for every traveler.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Payments</h3>
            <p>
              Safe and protected payment processing.
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="cta-card">
          <h2>Ready for your next adventure?</h2>

          <p>
            Discover new destinations and book your next flight today.
          </p>

          <button
            onClick={() =>
              document
                .querySelector(".search-box")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Start Booking →
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;