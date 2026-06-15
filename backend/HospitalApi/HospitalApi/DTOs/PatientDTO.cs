namespace HospitalApi_.DTOs
{
    public class PatientDTO
    {
        public int Id { get; set; }

        public string FullName { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string? BloodType { get; set; }

        public string? ContactNumber { get; set; }
    }
}