using FlyEasy.Api.Data;
using FlyEasy.Api.Models;
using FlyEasy.Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace FlyEasy.Api.Repositories.Implementations
{
    public class FlightRepository : IFlightRepository
    {
        private readonly ApplicationDbContext _context;

        public FlightRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Flight>> GetAllAsync()
        {
            return await _context.Flights.ToListAsync();
        }

        public async Task<Flight?> GetByIdAsync(int id)
        {
            return await _context.Flights.FindAsync(id);
        }

        public async Task AddAsync(Flight flight)
        {
            _context.Flights.Add(flight);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Flight flight)
        {
            _context.Flights.Update(flight);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var flight = await _context.Flights.FindAsync(id);

            if (flight == null)
                return;

            _context.Flights.Remove(flight);

            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Flight>> SearchFlightsAsync(
    string fromCity,
    string toCity,
    DateTime departureDate,
    int passengers)
        {
            return await _context.Flights
                .Where(f =>
                    f.FromCity.ToLower() == fromCity.ToLower()
                    &&
                    f.ToCity.ToLower() == toCity.ToLower()
                    &&
                    f.DepartureTime.Date == departureDate.Date
                    &&
                    f.AvailableSeats >= passengers)
                .ToListAsync();
        }
    }
}