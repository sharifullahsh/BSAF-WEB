using BSAF.Models;
using BSAFWebApi.Models;
using BSAFWebApi.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BSAFWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _config;
        private UserManager<ApplicationUser> _userManager = null;
        private SignInManager<ApplicationUser> _signInManager = null;
        //private readonly RoleManager<IdentityRole> _roleManager;
        BWDbContext db = null;

        public LoginController(IConfiguration config, UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager, 
        //RoleManager<IdentityRole> rolMgr,
        BWDbContext context)
        {
            _config = config;
            _userManager = userManager;
            _signInManager = signInManager;
            //_roleManager = rolMgr;
            db = context;
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserModelDto model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user == null)
            {
                return BadRequest("Invalide user name.");
            }
            if (user.IsDeleted == true)
            {
                return Unauthorized();
            }
            var result = await _signInManager
                .CheckPasswordSignInAsync(user, model.Password, false);

            if (result.Succeeded)
            {
                var appUser = await _userManager.Users
                    .FirstOrDefaultAsync(u => u.NormalizedUserName == model.Username.ToUpper());
                return Ok(new
                {
                    token = GenerateJwtToken(appUser).Result,
                });
            }
            return Unauthorized();
        }
        [NonAction]
        private async Task<string> GenerateJwtToken(ApplicationUser user)
        {
            var claims = new List<Claim>
            {
                 new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName.ToString()),
            };
            if (!string.IsNullOrEmpty(user.StationCode)){
                claims.Add(new Claim(ClaimTypes.StateOrProvince, user.StationCode.ToString()));
            }
            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_config.GetSection("Jwt:Key").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        //private async Task<bool>  AuthenticateUser(ApplicationUser login, string password)
        //{
        //    var user = await _userManager.FindByNameAsync(login.UserName);


        //    var result = await _signInManager.CheckPasswordSignInAsync(user, password, false);
        //    if (result.Succeeded)
        //    {
        //        return true;
        //    }
        //    return false;
        //}
        [AllowAnonymous]
        //[Authorize(Roles = "Admin")]
        [HttpPost("register")]
        public  async Task<IActionResult>  Createuser([FromBody] UserRegistrationDto model)
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
     
    }
}