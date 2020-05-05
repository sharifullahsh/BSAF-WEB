using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BSAFWebApi.Dtos
{
    public class SearchLookupDto
    {
        public List<LookupDto> borderCrossingPoints { get; set; }
        public List<LookupDto> beneficiaryTypes { get; set; }
        public List<LookupDto> returnStatus { get; set; }
    }
}
