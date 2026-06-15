namespace FlyEasy.Api.Models
{
    public class LuggagePackage
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty; // FlyGo, FlySmart, FlyPlus

        public string Description { get; set; } = string.Empty;

        public decimal Price { get; set; }
    }
}