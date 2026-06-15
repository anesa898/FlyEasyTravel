using FlyEasy.Api.Data;
using FlyEasy.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace FlyEasy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeedController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SeedController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Seed()
        {
            _context.Payments.RemoveRange(_context.Payments);
            _context.Passengers.RemoveRange(_context.Passengers);
            _context.Bookings.RemoveRange(_context.Bookings);
            _context.Seats.RemoveRange(_context.Seats);
            _context.Flights.RemoveRange(_context.Flights);
            _context.SaveChanges();
            if (!_context.LuggagePackages.Any())
            {
                _context.LuggagePackages.AddRange(
                    new LuggagePackage
                    {
                        Name = "FlyGo",
                        Description = "Small personal bag",
                        Price = 0
                    },
                    new LuggagePackage
                    {
                        Name = "FlySmart",
                        Description = "Cabin baggage",
                        Price = 25
                    },
                    new LuggagePackage
                    {
                        Name = "FlyPlus",
                        Description = "20kg checked baggage",
                        Price = 45
                    }
                );

                _context.SaveChanges();
            }

            if (!_context.Flights.Any())
            {
                var destinations = new[]
                {
                    new { City = "Paris", Code = "PRS", Price = 4500 },
                    new { City = "London", Code = "LDN", Price = 6200 },
                    new { City = "Rome", Code = "ROM", Price = 5200 },
                    new { City = "Berlin", Code = "BER", Price = 4800 },
                    new { City = "Vienna", Code = "VIE", Price = 3500 },
                    new { City = "Istanbul", Code = "IST", Price = 4200 },
                    new { City = "Madrid", Code = "MAD", Price = 5600 },
                    new { City = "Barcelona", Code = "BCN", Price = 5400 },
                    new { City = "Amsterdam", Code = "AMS", Price = 5900 },
                    new { City = "Zurich", Code = "ZRH", Price = 6100 },
                    new { City = "Prague", Code = "PRG", Price = 3700 },
                    new { City = "Athens", Code = "ATH", Price = 3300 },
                    new { City = "Lisbon", Code = "LIS", Price = 6200 },
                    new { City = "Milan", Code = "MIL", Price = 4100 },
                    new { City = "Venice", Code = "VCE", Price = 4300 },
                    new { City = "Brussels", Code = "BRU", Price = 5700 },
                    new { City = "Munich", Code = "MUC", Price = 4600 },
                    new { City = "Frankfurt", Code = "FRA", Price = 5000 },
                    new { City = "Copenhagen", Code = "CPH", Price = 6500 },
                    new { City = "Stockholm", Code = "STO", Price = 6900 },
                    new { City = "Oslo", Code = "OSL", Price = 7200 },
                    new { City = "Warsaw", Code = "WAW", Price = 3900 },
                    new { City = "Budapest", Code = "BUD", Price = 3400 },
                    new { City = "Dublin", Code = "DUB", Price = 6800 },
                    new { City = "Nice", Code = "NCE", Price = 5300 },
                    new { City = "Malta", Code = "MLA", Price = 4700 },
                    new { City = "Dubai", Code = "DXB", Price = 12000 },
                    new { City = "Doha", Code = "DOH", Price = 11500 },
                    new { City = "Belgrade", Code = "BEG", Price = 2200 },
                    new { City = "Zagreb", Code = "ZAG", Price = 2800 }
                };

                var dates = new[]
                {
                    new DateTime(2025, 10, 19),
                    new DateTime(2025, 10, 20),
                    new DateTime(2025, 10, 21),
                    new DateTime(2025, 10, 22),
                    new DateTime(2025, 10, 23)
                };

                var times = new[]
                {
                    new TimeSpan(8, 30, 0),
                    new TimeSpan(14, 15, 0),
                    new TimeSpan(20, 45, 0)
                };

                var flights = new List<Flight>();
                int flightCounter = 101;

                foreach (var destination in destinations)
                {
                    foreach (var date in dates)
                    {
                        foreach (var time in times)
                        {
                            var departure = DateTime.SpecifyKind(date.Add(time), DateTimeKind.Utc);

                            flights.Add(new Flight
                            {
                                FlightNumber = $"FE{flightCounter}",
                                FromCode = "SKP",
                                ToCode = destination.Code,
                                FromCity = "Skopje",
                                ToCity = destination.City,
                                DepartureTime = departure,
                                ArrivalTime = departure.AddHours(2).AddMinutes(30),
                                BasePrice = destination.Price,
                                AvailableSeats = 36
                            });

                            flightCounter++;
                        }
                    }
                }

                _context.Flights.AddRange(flights);
                _context.SaveChanges();
            }

            if (!_context.Seats.Any())
            {
                var seats = new List<Seats>();

                var flights = _context.Flights.ToList();

                foreach (var flight in flights)
                {
                    for (int row = 1; row <= 6; row++)
                    {
                        foreach (var letter in new[] { "A", "B", "C", "D", "E", "F" })
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
                }

                _context.Seats.AddRange(seats);
                _context.SaveChanges();
            }

            return Ok("Seed completed");
        }
    }
}