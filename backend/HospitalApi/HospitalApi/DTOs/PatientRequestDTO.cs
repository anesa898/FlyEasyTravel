using System.ComponentModel.DataAnnotations;

namespace HospitalApi_.DTOs
{
    public class PatientRequestDTO
    {
        [Required]
        [MaxLength(100)]
        public string FullName { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [MaxLength(20)]
        public string? BloodType { get; set; }

        [Phone]
        public string? ContactNumber { get; set; }
    }
}