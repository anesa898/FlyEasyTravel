namespace FlyEasy.Api.Models
{
    public class Flight
    {
        public int Id { get; set; }

        public string FlightNumber { get; set; } = string.Empty;

        public string FromCode { get; set; } = string.Empty;

        public string ToCode { get; set; } = string.Empty;

        public string FromCity { get; set; } = string.Empty;

        public string ToCity { get; set; } = string.Empty;

        public DateTime DepartureTime { get; set; }

        public DateTime ArrivalTime { get; set; }

        public decimal BasePrice { get; set; }

        public int AvailableSeats { get; set; }
    }
}