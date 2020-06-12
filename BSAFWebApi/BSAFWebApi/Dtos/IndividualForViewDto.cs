using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BSAFWebApi.Dtos
{
    public class IndividualForViewDto
    {
        public int IndividualID { get; set; }

        public string Name { get; set; }

        public string DrName { get; set; }

        public string FName { get; set; }

        public string DrFName { get; set; }

        public string Gender { get; set; }

        public string MaritalStatus { get; set; }

        public int? Age { get; set; }

        public string IDType { get; set; }

        public string IDNo { get; set; }

        public string Relationship { get; set; }

        public string ContactNumber { get; set; }
    }
}
