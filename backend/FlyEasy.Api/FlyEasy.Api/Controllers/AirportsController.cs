using FlyEasy.Api.Data;
using Microsoft.AspNetCore.Mvc;

namespace FlyEasy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirportsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AirportsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAirports()
        {
            return Ok(_context.Airports.ToList());
        }
    }
}