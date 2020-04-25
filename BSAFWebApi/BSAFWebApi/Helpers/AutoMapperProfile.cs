using AutoMapper;
using BSAF.Models;
using BSAFWebApi.Models.ViewModels;
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
            CreateMap<IndividualDto, Individual>();
            CreateMap<Individual, IndividualDto>();
        }
    }
}
