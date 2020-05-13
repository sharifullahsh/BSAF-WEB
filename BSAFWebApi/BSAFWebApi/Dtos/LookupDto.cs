using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BSAFWebApi.Dtos
{
    public class LookupDto
    {
        public string LookupCode { get; set; }

        public string LookupName { get; set; }
    }
    public class HostCountryProvinceDto
    {
        public int ID { get; set; }

        public string Name { get; set; }
    }
    public class HostCountryDistrictDto
    {
        public int ID { get; set; }

        public string Name { get; set; }
    }

    public class SelectOptionDto
    {
        public int ID { get; set; }

        public string LookupCode { get; set; }

        public string Other { get; set; }
    }
    public class DeterminationDto
    {
        public int ID { get; set; }

        public string LookupCode { get; set; }

        public string AnswerCode { get; set; }

        public string Other { get; set; }
    }
    public class PostArrivalNeedsDto
    {
        public int ID { get; set; }

        public string LookupCode { get; set; }

        public bool? IsProvided { get; set; }

        public DateTime? ProvidedDate { get; set; }

        public string Comment { get; set; }
    }

}
