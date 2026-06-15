using FlyEasy.Api.Data;
using FlyEasy.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace FlyEasy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LuggagePackagesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LuggagePackagesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetLuggagePackages()
        {
            return Ok(_context.LuggagePackages.ToList());
        }
    }
}