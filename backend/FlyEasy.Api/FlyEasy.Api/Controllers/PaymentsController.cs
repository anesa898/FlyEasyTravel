using FlyEasy.Api.Data;
using FlyEasy.Api.DTOs;
using FlyEasy.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace FlyEasy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PaymentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult CreatePayment(CreatePaymentDto dto)
        {
            var booking = _context.Bookings
                .FirstOrDefault(b => b.Id == dto.BookingId);

            if (booking == null)
                return BadRequest("Booking not found");

            var payment = new Payment
            {
                BookingId = dto.BookingId,
                Amount = booking.TotalPrice,
                PaymentMethod = dto.PaymentMethod,
                Status = "Paid"
            };

            _context.Payments.Add(payment);

            booking.Status = "Paid";

            _context.SaveChanges();

            return Ok(payment);
        }

        [HttpGet]
        public IActionResult GetPayments()
        {
            var payments = _context.Payments.ToList();

            return Ok(payments);
        }

        [HttpGet("{id}")]
        public IActionResult GetPayment(int id)
        {
            var payment = _context.Payments
                .FirstOrDefault(p => p.Id == id);

            if (payment == null)
            {
                return NotFound("Payment not found.");
            }

            return Ok(payment);
        }
    }
}