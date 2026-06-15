namespace FlyEasy.Api.DTOs
{
    public class FlightSearchDto
    {
        public string FromCity { get; set; } = string.Empty;

        public string ToCity { get; set; } = string.Empty;

        public DateTime DepartureDate { get; set; }

        public int Passengers { get; set; }
    }
}