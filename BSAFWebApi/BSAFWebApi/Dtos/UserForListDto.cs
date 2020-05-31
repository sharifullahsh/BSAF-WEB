using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BSAFWebApi.Dtos
{
    public class UserForListDto
    {
        public string id { get; set; }
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string StationCode { get; set; }
        public DateTime Created { get; set; }
        public List<string> Roles { get; set; }
    }
}
