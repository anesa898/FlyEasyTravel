import { useNavigate } from "react-router-dom";

function Splash() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-overlay"></div>

      <div className="landing-plane landing-plane-one">✈</div>
      <div className="landing-plane landing-plane-two">✈</div>

      <div className="landing-card">
        <div className="landing-logo-circle">
          <span>✈</span>
        </div>

        <p className="landing-small-title">PREMIUM AIRLINE BOOKING</p>

        <h1>FlyEasy</h1>
        <h2>TRAVEL</h2>

        <div className="landing-divider">
          <span></span>
          <p>✈</p>
          <span></span>
        </div>

        <p className="landing-slogan">
          Fly smarter. Book faster. Travel happier.
        </p>

        <button className="enter-btn" onClick={() => navigate("/auth")}>
          Start your journey →
        </button>
      </div>
    </div>
  );
}

export default Splash;