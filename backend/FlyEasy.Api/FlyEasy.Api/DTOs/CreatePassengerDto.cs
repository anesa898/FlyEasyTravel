namespace FlyEasy.Api.DTOs
{
    public class CreatePassengerDto
    {
        public int BookingId { get; set; }

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Gender { get; set; } = string.Empty;

        public bool NeedsAssistance { get; set; }
    }
}