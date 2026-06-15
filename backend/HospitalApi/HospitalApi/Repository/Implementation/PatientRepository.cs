using HospitalApi_.Models;
using HospitalApi_.Repository.Interface;
using HospitalApi_.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;


namespace HospitalApi_.Repository.Implementation
{
    public class PatientRepository : IPatientRepository
    {
        private readonly HospitalDbContext _context;

        public PatientRepository(HospitalDbContext context)
        {
            _context = context;
        }

        public async Task<Patient> AddPatient(Patient patient)
        {
            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();
            return patient;
        }

        public async Task<bool> DeletePatientAsync(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if(patient==null)
            {
                return false;
            }

            _context.Patients.Remove(patient);
            return true;
        }

        public async Task<List<Patient>> GetAllPatientAsync()
        {
            return await _context.Patients.ToListAsync();

        }

        public async Task<Patient?> GetPatientById(int id)
        {
            return await _context.Patients.FindAsync(id);
        }

        public async Task<List<object>> GetPatientGroupedByBloodTypeAsync()
        {
            return await _context.Patients
                .GroupBy(p => p.BloodType)
                .Select(group => new
                {
                    BloodType = group.Key,
                    Count = group.Count()

                })
            .ToListAsync<object>();
        }
                

        public async Task<Patient> UpdatePatientAsync(int id, Patient patient)
        {
            var existingPatient = await _context.Patients.FindAsync(id);
            if (existingPatient == null)
            {
                return null;

            }
            existingPatient.FullName = patient.FullName;
            existingPatient.DateOfBirth = patient.DateOfBirth;
            existingPatient.PhoneNumber = patient.PhoneNumber;

            await _context.SaveChangesAsync();
            return existingPatient;
        }
    }
}
