using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BSAFWebApi.Dtos
{
    public class InitialLookupDto
    {
        public List<LookupDto> borderCrossingPoints { get; set; }
        public List<LookupDto> provinces { get; set; }
        public List<LookupDto> gender { get; set; }
        public List<LookupDto> maritalStatus { get; set; }
        public List<LookupDto> idTypes { get; set; }
        public List<LookupDto> relationships { get; set; }
        public List<LookupDto> psns { get; set; }
        public List<LookupDto> leavingReasons { get; set; }
        public List<LookupDto> returnReasons { get; set; }
        public List<LookupDto> whereWillLive { get; set; }
        public List<LookupDto> organizations { get; set; }
        public List<LookupDto> intendToDos { get; set; }
        public List<LookupDto> professions { get; set; }
        public List<LookupDto> educationLevels { get; set; }
        public List<LookupDto> determinations { get; set; }
        public List<LookupDto> moneySources { get; set; }
        public List<LookupDto> broughtItems { get; set; }
        public List<LookupDto> postArrivalNeeds { get; set; }
        public List<LookupDto> transportations { get; set; }
        public List<LookupDto> topNeeds { get; set; }
        public List<LookupDto> obtainLivelihoodHelps { get; set; }
        public List<LookupDto> tools { get; set; }
        public List<LookupDto> mainConcerns { get; set; }
        public List<LookupDto> hostCountrySchools { get; set; }


    }
}
