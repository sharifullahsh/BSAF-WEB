using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BSAFWebApi.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string StationCode { get; set; }
        public DateTime Created { get; set; }
        public bool IsDeleted { get; set; }
    }
}
