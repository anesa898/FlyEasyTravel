using FlyEasy.Api.DTOs;
using FlyEasy.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FlyEasy.Api.Data;

namespace FlyEasy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly IBookingService _bookingService;
        private readonly ApplicationDbContext _context;

        public BookingsController(
     IBookingService bookingService,
     ApplicationDbContext context)
        {
            _bookingService = bookingService;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] CreateBookingDto dto)
        {
            try
            {
                var booking = await _bookingService.CreateBookingAsync(dto);

                return Ok(booking);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetBookingsByUser(int userId)
        {
            var bookings = await _context.Bookings
                .Where(b => b.UserId == userId)
                .Include(b => b.Flight)
                .Include(b => b.Seat)
                .Include(b => b.LuggagePackage)
                .Select(b => new
                {
                    b.Id,
                    b.UserId,
                    b.BookingDate,
                    b.Status,
                    b.TotalPrice,

                    Flight = new
                    {
                        b.Flight.Id,
                        b.Flight.FlightNumber,
                        b.Flight.FromCode,
                        b.Flight.ToCode,
                        b.Flight.FromCity,
                        b.Flight.ToCity,
                        b.Flight.DepartureTime,
                        b.Flight.ArrivalTime,
                        b.Flight.BasePrice
                    },

                    Seat = new
                    {
                        b.Seat.Id,
                        b.Seat.SeatNumber,
                        b.Seat.Class
                    },

                    LuggagePackage = new
                    {
                        b.LuggagePackage.Id,
                        b.LuggagePackage.Name,
                        b.LuggagePackage.Description,
                        b.LuggagePackage.Price
                    },

                    Passenger = _context.Passengers
    .Where(p => p.BookingId == b.Id)
    .Select(p => new
    {
        p.Id,
        p.FirstName,
        p.LastName,
        p.Gender,
        p.NeedsAssistance
    })
    .FirstOrDefault(),
                })

                .OrderByDescending(b => b.BookingDate)
                .ToListAsync();

            return Ok(bookings);
        }

        [HttpGet("{id}")]
        public IActionResult GetBooking(int id)
        {
            var booking = _context.Bookings
                .FirstOrDefault(b => b.Id == id);

            if (booking == null)
                return NotFound();

            return Ok(booking);
        }

        [HttpPut("cancel/{id}")]
        public IActionResult CancelBooking(int id)
        {
            var booking = _context.Bookings
                .FirstOrDefault(b => b.Id == id);

            if (booking == null)
                return NotFound();

            booking.Status = "Cancelled";

            _context.SaveChanges();

            return Ok("Booking cancelled");
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBookings()
        {
            var bookings = await _context.Bookings
                .Include(b => b.Flight)
                .Include(b => b.Seat)
                .Include(b => b.LuggagePackage)
                .OrderByDescending(b => b.BookingDate)
                .Select(b => new
                {
                    b.Id,
                    b.UserId,
                    b.FlightId,
                    b.SeatId,
                    b.LuggagePackageId,
                    b.BookingDate,
                    b.Status,
                    b.TotalPrice,

                    FlightNumber = b.Flight.FlightNumber,
                    FromCode = b.Flight.FromCode,
                    ToCode = b.Flight.ToCode,
                    FromCity = b.Flight.FromCity,
                    ToCity = b.Flight.ToCity,

                    SeatNumber = b.Seat.SeatNumber,
                    SeatClass = b.Seat.Class,

                    LuggageName = b.LuggagePackage.Name
                })
                .ToListAsync();

            return Ok(bookings);
        }
    }
}