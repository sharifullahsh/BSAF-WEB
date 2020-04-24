using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BSAFWebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BSAFWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly BWDbContext _cotext;

        public AdminController(BWDbContext cotext)
        {
            _cotext = cotext;
        }
        [AllowAnonymous]
        [HttpGet("userWithRoles")]
        public async Task<IActionResult> GetUserWithRoles()
        {
            var userList = await (from user in _cotext.Users
                                  orderby user.UserName
                                  select new
                                  {
                                       user.Id,
                                       user.UserName,
                                       Role = (from userRole in _cotext.UserRoles
                                               join role in _cotext.Roles
                                               on userRole.RoleId
                                               equals role.Id
                                               where userRole.UserId == user.Id
                                               select role.Name).ToList()

                                  }).ToListAsync();
            return Ok(userList);

        }

        [HttpGet("test")]
        [AllowAnonymous]
        public IActionResult test()
        {
            return Ok("Hi");
        }
    }
}