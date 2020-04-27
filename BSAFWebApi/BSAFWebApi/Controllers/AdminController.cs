using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BSAFWebApi.Dtos;
using BSAFWebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BSAFWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly BWDbContext _cotext;
        private UserManager<ApplicationUser> _userManager = null;
        private SignInManager<ApplicationUser> _signInManager = null;

        public AdminController(BWDbContext cotext, UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _cotext = cotext;
        }
        [AllowAnonymous]
        [HttpGet("usersWithRoles")]
        public async Task<IActionResult> GetUsersWithRoles()
        {
            var userList = await (from user in _cotext.Users
                                  orderby user.UserName
                                  select new
                                  {
                                       user.Id,
                                       user.UserName,
                                       user.StationCode,
                                       Roles = (from userRole in _cotext.UserRoles
                                               join role in _cotext.Roles
                                               on userRole.RoleId
                                               equals role.Id
                                               where userRole.UserId == user.Id
                                               select role.Name).ToList()

                                  }).ToListAsync();
            return Ok(userList);

        }

        [AllowAnonymous]
        //[Authorize(Roles = "Admin")]
        [HttpPost("register")]
        public async Task<IActionResult> Createuser([FromBody] UserRegistrationDto model)
        {
            var result = await _userManager.CreateAsync(
            new ApplicationUser()
            {
                UserName = model.UserName
            }, model.Password
            );
            if (result.Succeeded)
            {
                return Ok();
            }
            return BadRequest(result.Errors.ToString());
        }
        [HttpGet("test")]
        [AllowAnonymous]
      
        public IActionResult test()
        {
            //var beneficiary = _cotext.Beneficiaries.Include(b => b.PSNs).ToList();
            return Ok("Hi");
        }
    }
}