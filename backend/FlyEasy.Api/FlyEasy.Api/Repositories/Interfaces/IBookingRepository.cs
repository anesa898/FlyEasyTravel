using FlyEasy.Api.Models;

namespace FlyEasy.Api.Repositories.Interfaces
{
    public interface IBookingRepository
    {
        Task AddAsync(Booking booking);

        Task<Booking?> GetByIdAsync(int id);
    }
}