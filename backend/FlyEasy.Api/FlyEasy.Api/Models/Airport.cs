namespace FlyEasy.Api.Models
{
    public class Airport
    {
        public int Id { get; set; }

        public string Code { get; set; } = string.Empty;   // SKP, PRS

        public string City { get; set; } = string.Empty;   // Skopje, Paris

        public string Country { get; set; } = string.Empty;

        public string Name { get; set; } = string.Empty;
    }
}