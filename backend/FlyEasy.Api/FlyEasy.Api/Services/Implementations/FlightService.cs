using FlyEasy.Api.Models;
using FlyEasy.Api.Repositories.Interfaces;
using FlyEasy.Api.Services.Interfaces;

namespace FlyEasy.Api.Services.Implementations
{
    public class FlightService : IFlightService
    {
        private readonly IFlightRepository _repository;

        public FlightService(IFlightRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Flight>> GetAllFlightsAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Flight?> GetFlightByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddFlightAsync(Flight flight)
        {
            await _repository.AddAsync(flight);
        }

        public async Task UpdateFlightAsync(Flight flight)
        {
            await _repository.UpdateAsync(flight);
        }

        public async Task DeleteFlightAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Flight>> SearchFlightsAsync(
    string fromCity,
    string toCity,
    DateTime departureDate,
    int passengers)
        {
            return await _repository.SearchFlightsAsync(
                fromCity,
                toCity,
                departureDate,
                passengers);
        }
    }
}