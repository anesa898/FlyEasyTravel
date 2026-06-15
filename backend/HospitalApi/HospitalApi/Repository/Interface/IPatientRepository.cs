using HospitalApi_.Models;

namespace HospitalApi_.Repository.Interface
{
    public interface IPatientRepository
    {
        Task<List<Patient>> GetAllPatientAsync();
        Task<Patient?> GetPatientById(int id);

        Task<Patient> AddPatient(Patient patient);

        Task<Patient> UpdatePatientAsync(int id, Patient patient);

        Task<bool> DeletePatientAsync(int id);

        Task<List<Object>> GetPatientGroupedByBloodTypeAsync();



    }
}
