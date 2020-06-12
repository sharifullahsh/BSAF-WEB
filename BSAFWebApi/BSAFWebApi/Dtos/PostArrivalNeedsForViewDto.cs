using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BSAFWebApi.Dtos
{
    public class PostArrivalNeedsForViewDto
    {
        public string Need { get; set; }

        public bool? IsProvided { get; set; }

        public DateTime ProvidedDate { get; set; }

        public string Comment { get; set; }
    }
}
