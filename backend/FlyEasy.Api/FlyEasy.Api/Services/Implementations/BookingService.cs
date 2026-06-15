using FlyEasy.Api.Data;
using FlyEasy.Api.DTOs;
using FlyEasy.Api.Models;
using FlyEasy.Api.Repositories.Interfaces;
using FlyEasy.Api.Services.Interfaces;

namespace FlyEasy.Api.Services.Implementations
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly ApplicationDbContext _context;

        public BookingService(
            IBookingRepository bookingRepository,
            ApplicationDbContext context)
        {
            _bookingRepository = bookingRepository;
            _context = context;
        }

        public async Task<Booking> CreateBookingAsync(CreateBookingDto dto)
        {
            var flight = await _context.Flights.FindAsync(dto.FlightId);

            if (flight == null)
            {
                throw new Exception("Flight not found.");
            }

            if (flight.AvailableSeats <= 0)
            {
                throw new Exception("No available seats.");
            }

            var seat = await _context.Seats.FindAsync(dto.SeatId);

            if (seat == null)
            {
                throw new Exception("Seat not found.");
            }

            if (seat.FlightId != dto.FlightId)
            {
                throw new Exception("This seat does not belong to the selected flight.");
            }

            if (seat.IsBooked)
            {
                throw new Exception("Seat is already booked.");
            }

            seat.IsBooked = true;
            flight.AvailableSeats--;

            var booking = new Booking
            {
                UserId = dto.UserId,
                FlightId = dto.FlightId,
                LuggagePackageId = dto.LuggagePackageId,
                SeatId = dto.SeatId,
                TotalPrice = flight.BasePrice,
                Status = "Confirmed"
            };

            await _bookingRepository.AddAsync(booking);

            await _context.SaveChangesAsync();

            return booking;
        }
    }
}