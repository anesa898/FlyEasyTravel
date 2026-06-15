using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HospitalApi_.Data;
using HospitalApi_.Models;
using Microsoft.EntityFrameworkCore;

using HospitalApi_.Services.Interface;

namespace HospitalApi_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly IPatientService _patientService;
        public PatientController(IPatientService patientService)
        {
            _patientService = patientService; ;
        }

        [HttpGet]
        public async Task<ActionResult<List<Patient>>>GetPatient()
        {
            return await _patientService.GetAllPatientsAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Patient>> AddPatient(Patient patient)
        {
            await _patientService.CreatePatientAsync(patient);

            return Ok(patient);

        }




    }
}
