using AutoMapper;
using HospitalApi_.DTOs;
using HospitalApi_.Models;

namespace HospitalApi_.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {

            CreateMap<Patient, PatientDTO>();
            CreateMap<PatientRequestDTO, Patient>();
        }
    }
}
