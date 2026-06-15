using FlyEasy.Api.DTOs;
using FlyEasy.Api.Models;

namespace FlyEasy.Api.Services.Interfaces
{
    public interface IBookingService
    {
        Task<Booking> CreateBookingAsync(CreateBookingDto dto);
    }
}