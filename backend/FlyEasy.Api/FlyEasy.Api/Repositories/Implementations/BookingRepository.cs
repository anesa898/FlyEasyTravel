using FlyEasy.Api.Data;
using FlyEasy.Api.Models;
using FlyEasy.Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FlyEasy.Api.Repositories.Implementations
{
    public class BookingRepository : IBookingRepository
    {
        private readonly ApplicationDbContext _context;

        public BookingRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Booking booking)
        {
            _context.Bookings.Add(booking);

            await _context.SaveChangesAsync();
        }

        public async Task<Booking?> GetByIdAsync(int id)
        {
            return await _context.Bookings
                .FirstOrDefaultAsync(b => b.Id == id);
        }
    }
}