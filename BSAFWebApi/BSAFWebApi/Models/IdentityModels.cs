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
        public string StationCode { get; set; }
        public bool IsDeleted { get; set; }
        //public ICollection<UserRole> UserRole { get; set; }
    }
    public class Role: IdentityRole
    {
        public ICollection<UserRole> UserRoles { get; set; }
    }
    public class UserRole : IdentityUserRole<string>
    {
        public ApplicationUser ApplicationUser { get; set; }
        public Role Role { get; set; }
    }
}
