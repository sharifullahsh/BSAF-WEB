using AutoMapper;
using BSAF.Models;
using BSAFWebApi.Dtos;
using BSAFWebApi.Models;
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
            CreateMap<ApplicationUser, UserForListDto>();
            CreateMap<Beneficiary, BeneficiaryDto>();
            CreateMap<BeneficiaryDto, Beneficiary>();
            CreateMap<BeneficiaryFormDto, Beneficiary>().ForSourceMember(s=>s.BeneficiaryID,opt=>opt.DoNotValidate());
            CreateMap<Beneficiary, BeneficiaryFormDto>();
            CreateMap<IndividualDto, Individual>();
            CreateMap<Individual, IndividualDto>();
            CreateMap<Beneficiary, BeneficiaryForViewDto>();
            CreateMap<LookupValue,LookupDto>()
                .ForMember(dest=>dest.LookupName,opt=> {
                    opt.MapFrom(src => src.EnName.FirstOrDefault());
                });
        }
    }
}
