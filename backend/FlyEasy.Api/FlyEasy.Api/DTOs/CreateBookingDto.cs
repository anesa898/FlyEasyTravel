namespace FlyEasy.Api.DTOs
{
    public class CreateBookingDto
    {
        public int UserId { get; set; }

        public int FlightId { get; set; }

        public int LuggagePackageId { get; set; }

        public int SeatId { get; set; }
    }
}