using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BSAFWebApi.Dtos
{
    public class UserForRegistrationDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string DisplayName { get; set; }

        [Required]
        public string Password { get; set; }

        public string[] Roles { get; set; }

    }
}
