using FlyEasy.Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlyEasy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SeatsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSeats()
        {
            var seats = await _context.Seats.ToListAsync();

            return Ok(seats);
        }

        [HttpGet("available/{flightId}")]
        public async Task<IActionResult> GetAvailableSeats(int flightId)
        {
            var seats = await _context.Seats
                .Where(s => s.FlightId == flightId && !s.IsBooked)
                .ToListAsync();

            return Ok(seats);
        }

        [HttpGet("flight/{flightId}")]
        public async Task<IActionResult> GetSeatsByFlight(int flightId)
        {
            var seats = await _context.Seats
                .Where(s => s.FlightId == flightId)
                .OrderBy(s => s.SeatNumber)
                .ToListAsync();

            return Ok(seats);
        }
    }
}