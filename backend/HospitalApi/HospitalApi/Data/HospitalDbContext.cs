using HospitalApi_.Models;
using Microsoft.EntityFrameworkCore;

namespace HospitalApi_.Data
{
    public class HospitalDbContext : DbContext
    {
        public HospitalDbContext(DbContextOptions<HospitalDbContext> options)
             : base(options) { }

        public DbSet<Patient> Patients { get; set; }
    }
}
