using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BSAFWebApi.Dtos;
using BSAFWebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BSAFWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LookupController : ControllerBase
    {
        private readonly BWDbContext db = null;
        public LookupController(BWDbContext context)
        {
            db = context;
        }
        [AllowAnonymous]
        [HttpGet("initialLookups")]
        public async Task<IActionResult> GetInitialLookups()
        {
            var lookups = new InitialLookupDto
            {
                borderCrossingPoints = db.BorderCrossingPoints.Select(b=>new LookupDto { LookupCode = b.BCPCode, LookupName = b.EnName}).ToList(),
                provinces = db.Provinces.Select(p=>new LookupDto { LookupCode = p.ProvinceCode, LookupName = p.EnName}).ToList(),
                gender = db.LookupValues.Where(l=>l.LookupCode == "GENDER").Select(l=>new LookupDto { LookupCode = l.ValueCode, LookupName = l.EnName}).ToList(),
                maritalStatus = db.LookupValues.Where(l=>l.LookupCode == "MARSTAT").Select(l=>new LookupDto { LookupCode = l.ValueCode, LookupName = l.EnName}).ToList(),
                idTypes = db.LookupValues.Where(l=>l.LookupCode == "IDTYPE").Select(l=>new LookupDto { LookupCode = l.ValueCode, LookupName = l.EnName}).ToList(),
                relationships = db.LookupValues.Where(l=>l.LookupCode == "RELATION").Select(l=>new LookupDto { LookupCode = l.ValueCode, LookupName = l.EnName}).ToList(),
                psns = db.LookupValues.Where(l=>l.LookupCode == "PSN").Select(l=>new LookupDto { LookupCode = l.ValueCode, LookupName = l.EnName}).ToList(),
                leavingReasons = db.LookupValues.Where(l=>l.LookupCode == "LREASON").Select(l=>new LookupDto { LookupCode = l.ValueCode, LookupName = l.EnName}).ToList(),
                returnReasons = db.LookupValues.Where(l=>l.LookupCode == "RREASON").Select(l=>new LookupDto { LookupCode = l.ValueCode, LookupName = l.EnName}).ToList(),
                whereWillLive = db.LookupValues.Where(l=>l.LookupCode == "WWYL").Select(l=>new LookupDto { LookupCode = l.ValueCode, LookupName = l.EnName}).ToList(),
                organizations = db.LookupValues.Where(l=>l.LookupCode == "ORGTYP").Select(l=>new LookupDto { LookupCode = l.ValueCode, LookupName = l.EnName}).ToList(),
                intendToDos = db.LookupValues.Where(l=>l.LookupCode == "WDYITD").Select(l=>new LookupDto { LookupCode = l.ValueCode, LookupName = l.EnName}).ToList(),
                professions = db.LookupValues.Where(l=>l.LookupCode == "PROFESSION").Select(l=>new LookupDto { LookupCode = l.ValueCode, LookupName = l.EnName}).ToList(),
                educationLevels = db.LookupValues.Where(l=>l.LookupCode == "EDUCATION").Select(l=>new LookupDto { LookupCode = l.ValueCode, LookupName = l.EnName}).ToList(),

            };
            return Ok(lookups);
        }
    }
}