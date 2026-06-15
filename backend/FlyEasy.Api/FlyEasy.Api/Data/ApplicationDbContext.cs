using Microsoft.EntityFrameworkCore;
using FlyEasy.Api.Models;

namespace FlyEasy.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Airport> Airports { get; set; }

        public DbSet<Flight> Flights { get; set; }

        public DbSet<LuggagePackage> LuggagePackages { get; set; }

        public DbSet<Seats> Seats { get; set; }

        public DbSet<Booking> Bookings { get; set; }

        public DbSet<Passenger> Passengers { get; set; }

        public DbSet<Payment> Payments { get; set; }

        
    }
}