
    namespace FlyEasy.Api.Models
    {
        public class Booking
        {
            public int Id { get; set; }

            public int UserId { get; set; }
            public int FlightId { get; set; }
            public int LuggagePackageId { get; set; }
            public int SeatId { get; set; }

            public DateTime BookingDate { get; set; }
            public string Status { get; set; } = "Confirmed";
            public decimal TotalPrice { get; set; }

            public User? User { get; set; }
            public Flight? Flight { get; set; }
            public LuggagePackage? LuggagePackage { get; set; }
            public Seats? Seat { get; set; }
        }
    }
