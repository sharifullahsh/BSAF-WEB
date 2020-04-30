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

    }
}
