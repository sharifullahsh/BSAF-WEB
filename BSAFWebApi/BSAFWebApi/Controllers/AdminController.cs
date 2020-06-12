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
        
        [Authorize]
        [HttpGet("userWithRoles/{id}")]
        public async Task<IActionResult> GetUserWithRoles(string id)
        {
            var userList = await (from user in _cotext.Users
                                  orderby user.Created descending
                                  where user.IsDeleted == false && user.Id == id
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

                                  }).FirstOrDefaultAsync();
            return Ok(userList);

        }

        [Authorize(Roles = "Admin")]
        [HttpGet("allUserWithRoles")]
        public async Task<IActionResult> GetAllUserWithRoles()
        {
            var userList = await (from user in _cotext.Users
                                  orderby user.Created descending
                                  where user.IsDeleted == false && user.UserName != "admin"
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

        [Authorize]
        [HttpGet("availableRoles")]
        public async Task<IActionResult> GetAvailableRoles()
        {
            var roles = _roleManager.Roles.Select(r=>r.Name).ToList();
            return Ok(roles);
        }


        [Authorize(Roles = "Admin")]
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

        [Authorize(Roles = "Admin")]
        [HttpPost("editUser/{userName}")]
        public async Task<IActionResult> EditUser(string userName,[FromBody] UserForUpdateDto model)
        {
            var user = await _userManager.FindByNameAsync(userName);

            var userRoles = await _userManager.GetRolesAsync(user);

            var selectedRoles = model.Roles;
            selectedRoles = selectedRoles ?? new string[] { };

            var result = _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles)).Result;
            if (!result.Succeeded)
            {
                return BadRequest("Failed to add to roles");
            }
          
            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));
            var test = await _userManager.GetRolesAsync(user);
            if (!result.Succeeded)
            {
              
                return BadRequest("Failed to remove the roles");
            }
            return Ok();
        }
        
        [HttpGet("isUserNameAvailable/{userName}")]
        [Authorize]
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

        [Authorize(Roles = "Admin")]
        [HttpDelete("deleteUser/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            user.IsDeleted = true;

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest(result.Errors.ToString());
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("adminChangeUserPassword/{id}")]
        public async Task<IActionResult> AdminChangeUserPassword(string id,[FromBody]AdminChangeUserPasswordDto model)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
           
            var result = await _userManager.ResetPasswordAsync(user, token, model.Password);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest(result.Errors.ToString());
        }
        [Authorize]
        [HttpPost("userChangePassword")]
        public async Task<IActionResult> UserChangePassword(UserPasswordChangeDto userPassChangeDto)
        {
            var currentUser = HttpContext.User;
            var user = await _userManager.FindByIdAsync(userPassChangeDto.Id.ToString());
            if (currentUser.Identity.Name != user.UserName)
            {
                return BadRequest("User is not the logged in user");
            }

            var result = await _userManager.ChangePasswordAsync(user, userPassChangeDto.CurrentPassword, userPassChangeDto.NewPassword);

            if (result.Succeeded)
            {
                return Ok();
            }
            return BadRequest(result.Errors.ToString());
        }
    }
}