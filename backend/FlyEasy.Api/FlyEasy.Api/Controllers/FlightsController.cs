using FlyEasy.Api.Data;
using FlyEasy.Api.DTOs;
using FlyEasy.Api.Models;
using FlyEasy.Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlyEasy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private readonly IFlightService _flightService;
        private readonly ApplicationDbContext _context;

        public FlightsController(IFlightService flightService, ApplicationDbContext context)
        {
            _flightService = flightService;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetFlights()
        {
            var flights = await _flightService.GetAllFlightsAsync();
            return Ok(flights);
        }

        [HttpPost("search")]
        public async Task<IActionResult> SearchFlights([FromBody] FlightSearchDto dto)
        {
            var flights = await _flightService.SearchFlightsAsync(
                dto.FromCity,
                dto.ToCity,
                DateTime.SpecifyKind(dto.DepartureDate, DateTimeKind.Utc),
                dto.Passengers
            );

            return Ok(flights);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> AddFlight([FromBody] Flight flight)
        {
            if (flight == null)
            {
                return BadRequest("Flight data is required.");
            }

            flight.DepartureTime = DateTime.SpecifyKind(
                flight.DepartureTime,
                DateTimeKind.Utc
            );

            flight.ArrivalTime = DateTime.SpecifyKind(
                flight.ArrivalTime,
                DateTimeKind.Utc
            );

            _context.Flights.Add(flight);
            await _context.SaveChangesAsync();

            var seats = new List<Seats>();

            string[] seatLetters = { "A", "B", "C", "D", "E", "F" };

            for (int row = 1; row <= 6; row++)
            {
                foreach (var letter in seatLetters)
                {
                    seats.Add(new Seats
                    {
                        FlightId = flight.Id,
                        SeatNumber = $"{row}{letter}",
                        Class = row <= 2 ? "Premium" : "Economy",
                        IsBooked = false
                    });
                }
            }

            _context.Seats.AddRange(seats);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Flight added successfully",
                FlightId = flight.Id,
                SeatsCreated = seats.Count
            });
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFlight(int id)
        {
            var flight = await _context.Flights.FindAsync(id);

            if (flight == null)
            {
                return NotFound("Flight not found.");
            }

            var hasBookings = await _context.Bookings.AnyAsync(b => b.FlightId == id);

            if (hasBookings)
            {
                return BadRequest("This flight cannot be deleted because it already has bookings.");
            }

            var seats = await _context.Seats
                .Where(s => s.FlightId == id)
                .ToListAsync();

            _context.Seats.RemoveRange(seats);
            _context.Flights.Remove(flight);

            await _context.SaveChangesAsync();

            return Ok("Flight deleted successfully.");
        }
    }
}