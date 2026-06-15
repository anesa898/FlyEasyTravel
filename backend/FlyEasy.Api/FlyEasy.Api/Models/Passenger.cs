namespace FlyEasy.Api.Models
{
    public class Passenger
    {
        public int Id { get; set; }

        public int BookingId { get; set; }

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Gender { get; set; } = string.Empty;

        public bool NeedsAssistance { get; set; }
    }
}