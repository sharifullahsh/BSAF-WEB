using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BSAFWebApi.Dtos
{
    public class UserPasswordChangeDto
    {
        public string Id { get; set; }

        [Required]
        public string CurrentPassword { get; set; }

        [Required]
        [MinLength(4,ErrorMessage = "Password should be minim 4 characters")]
        public string NewPassword { get; set; }
    }
}
