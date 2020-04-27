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
                BorderCrossingPoints = db.BorderCrossingPoints.Select(b=>new LookupDto { LookupCode = b.BCPCode, LookupName = b.EnName}).ToList(),
                Provinces = db.Provinces.Select(p=>new LookupDto { LookupCode = p.ProvinceCode, LookupName = p.EnName}).ToList(),
                Gender = db.LookupValues.Where(l=>l.LookupCode == "GENDER").Select(l=>new LookupDto { LookupCode = l.ValueCode, LookupName = l.EnName}).ToList(),
                MaritalStatus = db.LookupValues.Where(l=>l.LookupCode == "MARSTAT").Select(l=>new LookupDto { LookupCode = l.ValueCode, LookupName = l.EnName}).ToList(),
                IDTypes = db.LookupValues.Where(l=>l.LookupCode == "IDTYPE").Select(l=>new LookupDto { LookupCode = l.ValueCode, LookupName = l.EnName}).ToList(),
                Relationships = db.LookupValues.Where(l=>l.LookupCode == "RELATION").Select(l=>new LookupDto { LookupCode = l.ValueCode, LookupName = l.EnName}).ToList(),
                PSNs = db.LookupValues.Where(l=>l.LookupCode == "PSN").Select(l=>new LookupDto { LookupCode = l.ValueCode, LookupName = l.EnName}).ToList(),
                LeavingReasons = db.LookupValues.Where(l=>l.LookupCode == "LREASON").Select(l=>new LookupDto { LookupCode = l.ValueCode, LookupName = l.EnName}).ToList(),
                ReturnReasons = db.LookupValues.Where(l=>l.LookupCode == "RREASON").Select(l=>new LookupDto { LookupCode = l.ValueCode, LookupName = l.EnName}).ToList(),
                WhereWillLive = db.LookupValues.Where(l=>l.LookupCode == "WWYL").Select(l=>new LookupDto { LookupCode = l.ValueCode, LookupName = l.EnName}).ToList(),
                Organizations = db.LookupValues.Where(l=>l.LookupCode == "ORGTYP").Select(l=>new LookupDto { LookupCode = l.ValueCode, LookupName = l.EnName}).ToList(),
                IntendToDos = db.LookupValues.Where(l=>l.LookupCode == "WDYITD").Select(l=>new LookupDto { LookupCode = l.ValueCode, LookupName = l.EnName}).ToList(),
                Professions = db.LookupValues.Where(l=>l.LookupCode == "PROFESSION").Select(l=>new LookupDto { LookupCode = l.ValueCode, LookupName = l.EnName}).ToList(),
                EducationLevels = db.LookupValues.Where(l=>l.LookupCode == "EDUCATION").Select(l=>new LookupDto { LookupCode = l.ValueCode, LookupName = l.EnName}).ToList(),

            };
            return Ok(lookups);
        }
    }
}