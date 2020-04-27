using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BSAFWebApi.Dtos
{
    public class InitialLookupDto
    {
        public List<LookupDto> BorderCrossingPoints { get; set; }
        public List<LookupDto> Provinces { get; set; }
        public List<LookupDto> Gender { get; set; }
        public List<LookupDto> MaritalStatus { get; set; }
        public List<LookupDto> IDTypes { get; set; }
        public List<LookupDto> Relationships { get; set; }
        public List<LookupDto> PSNs { get; set; }
        public List<LookupDto> LeavingReasons { get; set; }
        public List<LookupDto> ReturnReasons { get; set; }
        public List<LookupDto> WhereWillLive { get; set; }
        public List<LookupDto> Organizations { get; set; }
        public List<LookupDto> IntendToDos { get; set; }
        public List<LookupDto> Professions { get; set; }
        public List<LookupDto> EducationLevels { get; set; }

    }
}
