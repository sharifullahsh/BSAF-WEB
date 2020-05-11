using AutoMapper;
using BSAF.Models;
using BSAFWebApi.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BSAFWebApi.Helpers
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Beneficiary, BeneficiaryDto>();
            CreateMap<BeneficiaryDto, Beneficiary>();
            CreateMap<BeneficiaryFormDto, Beneficiary>();
            CreateMap<Beneficiary, BeneficiaryFormDto>();
            CreateMap<IndividualDto, Individual>();
            CreateMap<Individual, IndividualDto>();
            CreateMap<LookupValue,LookupDto>()
                .ForMember(dest=>dest.LookupName,opt=> {
                    opt.MapFrom(src => src.EnName.FirstOrDefault());
                });
        }
    }
}
