using FlyEasy.Api.Models;

namespace FlyEasy.Api.Services.Interfaces
{
    public interface IFlightService
    {
        Task<IEnumerable<Flight>> GetAllFlightsAsync();

        Task<Flight?> GetFlightByIdAsync(int id);

        Task AddFlightAsync(Flight flight);

        Task UpdateFlightAsync(Flight flight);

        Task DeleteFlightAsync(int id);

    Task<IEnumerable<Flight>> SearchFlightsAsync(
    string fromCity,
    string toCity,
    DateTime departureDate,
    int passengers);
    }
}