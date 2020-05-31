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
        private readonly RoleManager<IdentityRole> _roleManager;
        public AdminController(BWDbContext cotext, UserManager<ApplicationUser> userManager,
        RoleManager<IdentityRole> rolMgr,
        SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = rolMgr;
            _cotext = cotext;
        }
        [AllowAnonymous]
        [HttpGet("usersWithRoles")]
        public async Task<IActionResult> GetUsersWithRoles()
        {
            var userList = await (from user in _cotext.Users
                                  orderby user.Created descending
                                  select new
                                  {
                                       user.Id,
                                       user.UserName,
                                       user.DisplayName,
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
        public async Task<IActionResult> Createuser([FromBody] UserForRegistrationDto model)
        {
            var result = await _userManager.CreateAsync(
            new ApplicationUser()
            {
                UserName = model.UserName,
                DisplayName = model.DisplayName,
                Created = DateTime.Now,
                IsDeleted = false
            }, model.Password
            );
            if (result.Succeeded)
            {
                var user = _userManager.FindByNameAsync(model.UserName).Result;
                var selectedRoles = model.Roles;
                selectedRoles = selectedRoles ?? new string[] { };
                result = _userManager.AddToRolesAsync(user, selectedRoles).Result;
                if (result.Succeeded)
                {
                    return Ok();
                }
                return BadRequest("Failed to add roles");
            }
            return BadRequest("Failed to register user");
        }
        [HttpPost("editUser/{userName}")]
        public async Task<IActionResult> EditUser(string userName,[FromBody] UserForUpdateDto model)
        {
            var user = await _userManager.FindByNameAsync(userName);

            var userRoles = await _userManager.GetRolesAsync(user);

            var selectedRoles = model.RoleNames;
            selectedRoles = selectedRoles ?? new string[] { };

            var result = _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles)).Result;
            if (!result.Succeeded)
            {
                return BadRequest("Failed to add to roles");
            }
            var test =new string[] { };
            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));
           
            if (!result.Succeeded)
            {
              
                return BadRequest("Failed to remove the roles");
            }
            return Ok(await _userManager.GetRolesAsync(user));
        }
        
        [HttpGet("isUserNameAvailable/{userName}")]
        [AllowAnonymous]
        public async Task<bool> IsUserNameAvailable(string userName) {
            var isTaken = false;
            var result = await _userManager.FindByNameAsync(userName);
            if(result != null)
            {
                isTaken = true;
                return isTaken; ;
            }
            return isTaken;
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