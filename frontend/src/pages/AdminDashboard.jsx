import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [activePage, setActivePage] = useState("dashboard");
  const [flights, setFlights] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);

  const [newFlight, setNewFlight] = useState({
    flightNumber: "",
    fromCode: "SKP",
    toCode: "",
    fromCity: "Skopje",
    toCity: "",
    departureTime: "",
    arrivalTime: "",
    basePrice: "",
    availableSeats: 36,
  });

  const deleteFlight = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this flight?"
  );

  if (!confirmed) return;

  try {
    await api.delete(`/Flights/${id}`);

    setFlights(flights.filter((f) => (f.id || f.Id) !== id));

    alert("Flight deleted successfully.");
  } catch (error) {
    alert(error.response?.data || "Failed to delete flight.");
  }
};

  useEffect(() => {
    const role = user?.role || user?.Role;

    if (!user) {
      navigate("/auth");
      return;
    }

    if (role !== "Admin") {
      navigate("/home");
      return;
    }

    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const flightsRes = await api.get("/Flights");
      setFlights(flightsRes.data);

      try {
        const usersRes = await api.get("/Users");
        setUsers(usersRes.data);
      } catch {
        setUsers([]);
      }

      try {
        const bookingsRes = await api.get("/Bookings");
        setBookings(bookingsRes.data);
      } catch {
        setBookings([]);
      }

      try {
        const paymentsRes = await api.get("/Payments");
        setPayments(paymentsRes.data);
      } catch {
        setPayments([]);
      }
    } catch (error) {
      console.log("ADMIN ERROR:", error.response?.data || error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/auth");
  };

  const deleteUser = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      await api.delete(`/Users/${id}`);
      setUsers(users.filter((u) => (u.id || u.Id) !== id));
      alert("User deleted successfully.");
    } catch (error) {
      alert(error.response?.data || "Failed to delete user.");
    }
  };

  const handleAddFlight = async (e) => {
    e.preventDefault();

    try {
      await api.post("/Flights", {
        flightNumber: newFlight.flightNumber,
        fromCode: newFlight.fromCode,
        toCode: newFlight.toCode,
        fromCity: newFlight.fromCity,
        toCity: newFlight.toCity,
        departureTime: newFlight.departureTime,
        arrivalTime: newFlight.arrivalTime,
        basePrice: Number(newFlight.basePrice),
        availableSeats: Number(newFlight.availableSeats),
      });

      alert("Flight added successfully.");

      setNewFlight({
        flightNumber: "",
        fromCode: "SKP",
        toCode: "",
        fromCity: "Skopje",
        toCity: "",
        departureTime: "",
        arrivalTime: "",
        basePrice: "",
        availableSeats: 36,
      });

      loadAdminData();
    } catch (error) {
      alert(error.response?.data || "Could not add flight.");
    }
  };

  const totalRevenue = payments.reduce(
    (sum, p) => sum + Number(p.amount || p.Amount || 0),
    0
  );

  const formatDateTime = (value) => {
    if (!value) return "Not available";

    return new Date(value).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "⌂" },
    { id: "flights", label: "Flights", icon: "✈" },
    { id: "bookings", label: "Bookings", icon: "🎫" },
    { id: "users", label: "Users", icon: "👥" },
    { id: "payments", label: "Payments", icon: "💳" },
    { id: "reports", label: "Reports", icon: "📊" },
  ];

  return (
    <div className="admin-pro-page">
      <aside className="admin-pro-sidebar">
        <div className="admin-pro-brand">
          <div className="admin-pro-logo">✈</div>
          <div>
            <h2>FlyEasy</h2>
            <p>ADMIN CONTROL</p>
          </div>
        </div>

        <div className="admin-pro-user">
          <div className="admin-pro-user-avatar">AH</div>
          <div>
            <strong>{user?.fullName || user?.FullName || "Admin User"}</strong>
            <span>System Administrator</span>
          </div>
        </div>

        <nav className="admin-pro-menu">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={activePage === item.id ? "active" : ""}
              onClick={() => setActivePage(item.id)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <button className="admin-pro-logout" onClick={logout}>
          Logout →
        </button>
      </aside>

      <main className="admin-pro-main">
        <header className="admin-pro-topbar">
          <div>
            <p>FLYEASY MANAGEMENT SYSTEM</p>
            <h1>{menuItems.find((x) => x.id === activePage)?.label}</h1>
          </div>

          <button onClick={() => navigate("/home")}>Open Website →</button>
        </header>

        {activePage === "dashboard" && (
          <>
            <section className="admin-pro-hero">
              <div>
                <p>WELCOME BACK</p>
                <h2>Manage FlyEasy operations in real time</h2>
                <span>
                  Control flights, users, bookings, payments and reports from one professional dashboard.
                </span>
              </div>
            </section>

            <section className="admin-pro-stats">
              <div><span>✈</span><p>Total Flights</p><h3>{flights.length}</h3></div>
              <div><span>🎫</span><p>Total Bookings</p><h3>{bookings.length}</h3></div>
              <div><span>👥</span><p>Total Users</p><h3>{users.length}</h3></div>
              <div><span>💳</span><p>Revenue</p><h3>{totalRevenue} MKD</h3></div>
            </section>

            <section className="admin-pro-actions">
              <div onClick={() => setActivePage("flights")}>
                <span>✈</span>
                <h3>Manage Flights</h3>
                <p>Add and view real flights from database.</p>
              </div>

              <div onClick={() => setActivePage("bookings")}>
                <span>🎫</span>
                <h3>Manage Bookings</h3>
                <p>View real customer reservations.</p>
              </div>

              <div onClick={() => setActivePage("users")}>
                <span>👥</span>
                <h3>Manage Users</h3>
                <p>View and delete customer accounts.</p>
              </div>

              <div onClick={() => setActivePage("payments")}>
                <span>💳</span>
                <h3>Payments</h3>
                <p>Monitor payment transactions.</p>
              </div>
            </section>
          </>
        )}

        {activePage === "flights" && (
          <section className="admin-pro-card">
            <div className="admin-pro-section-head">
              <div>
                <p>FLIGHT MANAGEMENT</p>
                <h2>Add New Flight</h2>
              </div>
            </div>

            <form className="admin-pro-flight-form" onSubmit={handleAddFlight}>
              <input placeholder="Flight number" value={newFlight.flightNumber} onChange={(e) => setNewFlight({ ...newFlight, flightNumber: e.target.value })} required />
              <input placeholder="From code" value={newFlight.fromCode} onChange={(e) => setNewFlight({ ...newFlight, fromCode: e.target.value })} required />
              <input placeholder="To code" value={newFlight.toCode} onChange={(e) => setNewFlight({ ...newFlight, toCode: e.target.value })} required />
              <input placeholder="From city" value={newFlight.fromCity} onChange={(e) => setNewFlight({ ...newFlight, fromCity: e.target.value })} required />
              <input placeholder="To city" value={newFlight.toCity} onChange={(e) => setNewFlight({ ...newFlight, toCity: e.target.value })} required />
              <input type="datetime-local" value={newFlight.departureTime} onChange={(e) => setNewFlight({ ...newFlight, departureTime: e.target.value })} required />
              <input type="datetime-local" value={newFlight.arrivalTime} onChange={(e) => setNewFlight({ ...newFlight, arrivalTime: e.target.value })} required />
              <input type="number" placeholder="Price" value={newFlight.basePrice} onChange={(e) => setNewFlight({ ...newFlight, basePrice: e.target.value })} required />
              <input type="number" placeholder="Seats" value={newFlight.availableSeats} onChange={(e) => setNewFlight({ ...newFlight, availableSeats: e.target.value })} required />
              <button type="submit">Add Flight →</button>
            </form>

            <h2 className="admin-pro-table-title">Available Flights</h2>

            <table className="admin-pro-table">
              <thead>
                <tr>
                  <th>Flight</th>
    <th>Route</th>
    <th>Departure</th>
    <th>Arrival</th>
    <th>Seats</th>
    <th>Price</th>
    <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {flights.map((f) => (
                  <tr key={f.id || f.Id}>
                    <td>{f.flightNumber || f.FlightNumber}</td>
                    <td>{f.fromCode || f.FromCode} → {f.toCode || f.ToCode}</td>
                    <td>{formatDateTime(f.departureTime || f.DepartureTime)}</td>
                    <td>{formatDateTime(f.arrivalTime || f.ArrivalTime)}</td>
                    <td>{f.availableSeats || f.AvailableSeats}</td>
                    <td>{f.basePrice || f.BasePrice} MKD</td>
                    <td>
  <button
    className="admin-pro-delete"
    onClick={() => deleteFlight(f.id || f.Id)}
  >
    Delete
  </button>
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {activePage === "bookings" && (
          <section className="admin-pro-card">
            <div className="admin-pro-section-head">
              <div>
                <p>BOOKINGS MANAGEMENT</p>
                <h2>Bookings</h2>
              </div>
            </div>

            {bookings.length === 0 ? (
              <div className="admin-pro-empty">
                <h3>No bookings found</h3>
                <p>Customer reservations will appear here.</p>
              </div>
            ) : (
              <table className="admin-pro-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Flight</th>
                    <th>Route</th>
                    <th>Seat</th>
                    <th>Status</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id || b.Id}>
                      <td>#{b.id || b.Id}</td>
                      <td>{b.userId || b.UserId}</td>
                      <td>{b.flightNumber || b.FlightNumber || b.flightId}</td>
                      <td>{b.fromCode || b.FromCode} → {b.toCode || b.ToCode}</td>
                      <td>{b.seatNumber || b.SeatNumber || b.seatId}</td>
                      <td><span className="admin-pro-badge">{b.status || b.Status}</span></td>
                      <td>{b.totalPrice || b.TotalPrice} MKD</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}

        {activePage === "users" && (
          <section className="admin-pro-card">
            <div className="admin-pro-section-head">
              <div>
                <p>USER MANAGEMENT</p>
                <h2>Registered Users</h2>
              </div>
            </div>

            <table className="admin-pro-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => {
                  const id = u.id || u.Id;
                  const role = u.role || u.Role || "Customer";

                  return (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{u.firstName || u.FirstName} {u.lastName || u.LastName}</td>
                      <td>{u.email || u.Email}</td>
                      <td>
                        <span className={role === "Admin" ? "admin-pro-admin-badge" : "admin-pro-badge"}>
                          {role}
                        </span>
                      </td>
                      <td>
                        <button
                          className="admin-pro-delete"
                          onClick={() => deleteUser(id)}
                          disabled={role === "Admin"}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        )}

        {activePage === "payments" && (
          <section className="admin-pro-card">
            <div className="admin-pro-section-head">
              <div>
                <p>PAYMENT MANAGEMENT</p>
                <h2>Payment Transactions</h2>
              </div>
            </div>

            <table className="admin-pro-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Booking ID</th>
                  <th>Method</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((p) => (
                  <tr key={p.id || p.Id}>
                    <td>#{p.id || p.Id}</td>
                    <td>{p.bookingId || p.BookingId}</td>
                    <td>{p.paymentMethod || p.PaymentMethod}</td>
                    <td>{p.amount || p.Amount} MKD</td>
                    <td><span className="admin-pro-badge">{p.status || p.Status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {activePage === "reports" && (
          <section className="admin-pro-card">
            <div className="admin-pro-section-head">
              <div>
                <p>SYSTEM REPORTS</p>
                <h2>Overview</h2>
              </div>
            </div>

            <div className="admin-pro-report-grid">
              <div>
                <span>Total Flights</span>
                <strong>{flights.length}</strong>
              </div>
              <div>
                <span>Total Bookings</span>
                <strong>{bookings.length}</strong>
              </div>
              <div>
                <span>Total Users</span>
                <strong>{users.length}</strong>
              </div>
              <div>
                <span>Total Revenue</span>
                <strong>{totalRevenue} MKD</strong>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;