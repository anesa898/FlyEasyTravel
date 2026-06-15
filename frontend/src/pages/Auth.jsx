import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Auth() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        const names = fullName.trim().split(" ");
        const firstName = names[0] || "";
        const lastName = names.slice(1).join(" ") || "User";

        await api.post("/Auth/register", {
          firstName,
          lastName,
          email,
          password,
          dateOfBirth: "2003-01-01T00:00:00Z",
          gender: "Female",
          nationality: "Macedonian",
          phoneNumber: "070000000",
        });

        alert("Account created successfully. Please login.");
        setIsRegister(false);
        setPassword("");
        return;
      }

      const response = await api.post("/Auth/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data));

      const role = response.data.role || response.data.Role;

      if (role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.log("AUTH ERROR:", error.response?.data || error.message);
      alert(error.response?.data || "Something went wrong.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-circle">✈</div>
          <h1>FlyEasy</h1>
          <p>TRAVEL</p>
        </div>

        <h2>{isRegister ? "Create account" : "Welcome back"}</h2>

        <p className="auth-subtitle">
          {isRegister
            ? "Register and manage your bookings easily."
            : "Login to continue booking your flights."}
        </p>

        <form onSubmit={handleAuth}>
          {isRegister && (
            <label>
              Full Name
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </label>
          )}

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </label>

          <button type="submit">
            {isRegister ? "Create account →" : "Login →"}
          </button>
        </form>

        <div className="auth-switch">
          {isRegister ? "Already have an account?" : "Don't have an account?"}

          <button type="button" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Login" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;