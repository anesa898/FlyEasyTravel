namespace FlyEasy.Api.DTOs
{
    public class CreatePaymentDto
    {
        public int BookingId { get; set; }

        public string PaymentMethod { get; set; } = string.Empty;
    }
}