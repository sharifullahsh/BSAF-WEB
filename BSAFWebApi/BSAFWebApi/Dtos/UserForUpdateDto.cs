using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BSAFWebApi.Dtos
{
    public class UserForUpdateDto
    {
        public string id { get; set; }
        public string displayName { get; set; }
        public string[] Roles { get; set; }

    }
}
