using AutoMapper;
using HospitalApi_.DTOs;
using HospitalApi_.Models;
using HospitalApi_.Repository.Implementation;
using HospitalApi_.Repository.Interface;
using HospitalApi_.Services.Interface;

namespace HospitalApi_.Services.Implementation
{
    public class PatientService : IPatientService
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IMapper _mapper;

        public PatientService(IPatientRepository patientRepository ,IMapper mapper)
        {
            _patientRepository = patientRepository;
            _mapper = mapper;
        }
        public async Task<PatientDTO> CreatePatientAsync(PatientDTO patientDTO)
        {
            if(patientDTO.DateOfBirth>DateTime.Now)
            {
                throw new Exception("Date of birth is in the future");
            }

            return _mapper.Map<PatientDTO>(CreatedPatient);
        }


        public async Task<bool> DeletePatientAsync(int id)
        {
            return await _mapper.Map<bool>.DeletePatientAsync(id);
        }

        public async Task<List<Patient>> GetAllPatientsAsync()
        {
            return await _patientRepository.GetAllPatientAsync();
        }

        public async Task<Patient?> GetPatientByIdAsync(int id)
        {
            return await _patientRepository.GetPatientById(id);

        }

        public async Task<List<Patient>> GetPatientsAboveAgeAsync(int age)
        {
            var patient = await _patientRepository.GetAllPatientAsync();

            return patient
                .Where(p => DateTime.Now.Year - p.DateOfBirth.Year > age)
                .ToList();



        }

        public async Task<List<Patient>> GetPatientsByBloodTypeAsync(string bloodType)
        {
            var patient = await _patientRepository.GetAllPatientAsync();

            return patient
                .Where(p => p.BloodType == bloodType)
                .ToList();
        }

        public async Task<Patient?> UpdatePatientAsync(int id, Patient patient)
        {
            return await _patientRepository.UpdatePatientAsync(id, patient);
        }
    }
}
