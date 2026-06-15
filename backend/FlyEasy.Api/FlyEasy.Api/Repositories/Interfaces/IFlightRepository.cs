using FlyEasy.Api.Models;

namespace FlyEasy.Api.Repositories.Interfaces
{
    public interface IFlightRepository
    {
        Task<IEnumerable<Flight>> GetAllAsync();

        Task<Flight?> GetByIdAsync(int id);

        Task AddAsync(Flight flight);

        Task UpdateAsync(Flight flight);

        Task DeleteAsync(int id);

    Task<IEnumerable<Flight>> SearchFlightsAsync(
    string fromCity,
    string toCity,
    DateTime departureDate,
    int passengers);
    }
}