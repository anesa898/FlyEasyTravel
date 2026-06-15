namespace FlyEasy.Api.Models
{
    public class Seats
    {
        public int Id { get; set; }

        public int FlightId { get; set; }

        public string SeatNumber { get; set; } = string.Empty;

        public string Class { get; set; } = "Economy";

        public bool IsBooked { get; set; } = false;
    }
}