using HospitalApi_.Models;

namespace HospitalApi_.Services.Interface
{
    public interface IPatientService
    {
        Task<List<PatientDTO>> GetAllPatientsAsync();

        Task<PatientDTO?> GetPatientByIdAsync(int id);

        Task<List<PatientDTO>> GetPatientsByBloodTypeAsync(string bloodType);

        Task<List<PatientDTO>> GetPatientsAboveAgeAsync(int age);

        Task<PatientDTO> CreatePatientAsync(PatientDTO patientDTO);

        Task<PatientDTO?> UpdatePatientAsync(int id, PatientDTO patientDTO);

        Task<bool> DeletePatientAsync(int id);
    }
}
