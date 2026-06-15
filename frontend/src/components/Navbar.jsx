import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="main-navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">✈</span>
        <div>
          <strong>FlyEasy</strong>
          <small>TRAVEL</small>
        </div>
      </Link>

      <div className="main-nav-links">
        <Link to="/home">Home</Link>
        <Link to="/flights">Flights</Link>
       <Link to="/my-bookings">My Bookings</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar;