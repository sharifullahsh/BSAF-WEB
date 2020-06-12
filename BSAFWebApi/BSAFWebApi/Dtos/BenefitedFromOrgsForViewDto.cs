using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BSAFWebApi.Dtos
{
    public class BenefitedFromOrgsForViewDto
    {

        public DateTime ProvidedDate { get; set; }

        public string Province { get; set; }

        public string District { get; set; }

        public string Village { get; set; }

        public string Organization { get; set; }

        public string AssistanceProvided { get; set; }
    }
}
