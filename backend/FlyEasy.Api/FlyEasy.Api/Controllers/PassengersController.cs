using FlyEasy.Api.Data;
using FlyEasy.Api.DTOs;
using FlyEasy.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlyEasy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PassengersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PassengersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePassenger(
            CreatePassengerDto dto)
        {
            var booking =
                await _context.Bookings.FindAsync(dto.BookingId);

            if (booking == null)
            {
                return BadRequest("Booking not found.");
            }

            var passenger = new Passenger
            {
                BookingId = dto.BookingId,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Gender = dto.Gender,
                NeedsAssistance = dto.NeedsAssistance
            };

            _context.Passengers.Add(passenger);

            await _context.SaveChangesAsync();

            return Ok(passenger);
        }

        [HttpGet]
        public async Task<IActionResult> GetPassengers()
        {
            var passengers = await _context.Passengers.ToListAsync();

            return Ok(passengers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPassenger(int id)
        {
            var passenger = await _context.Passengers.FindAsync(id);

            if (passenger == null)
            {
                return NotFound("Passenger not found.");
            }

            return Ok(passenger);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePassenger(int id, CreatePassengerDto dto)
        {
            var passenger = await _context.Passengers.FindAsync(id);

            if (passenger == null)
                return NotFound("Passenger not found.");

            passenger.BookingId = dto.BookingId;
            passenger.FirstName = dto.FirstName;
            passenger.LastName = dto.LastName;
            passenger.Gender = dto.Gender;
            passenger.NeedsAssistance = dto.NeedsAssistance;

            await _context.SaveChangesAsync();

            return Ok(passenger);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePassenger(int id)
        {
            var passenger = await _context.Passengers.FindAsync(id);

            if (passenger == null)
                return NotFound("Passenger not found.");

            _context.Passengers.Remove(passenger);
            await _context.SaveChangesAsync();

            return Ok("Passenger deleted.");
        }
    }
}