using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BSAF.Models;
using BSAFWebApi.Dtos;
using BSAFWebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BSAFWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   // [AllowAnonymous]
    public class BeneficiaryController : ControllerBase
    {
        BWDbContext db = null;
        private readonly IMapper _mapper;
        public BeneficiaryController(BWDbContext context,IMapper mapper)
        {
            db = context;
            _mapper = mapper;
        }
        // GET: api/Beneficiary
        [HttpPost("listPartial")]
        [AllowAnonymous]
        public async Task<IActionResult> listPartial([FromBody]SearchBeneficiaryDto model)
        {
            // var beneficiary = await db.Beneficiaries.Where(b => b.BeneficiaryID == id && b.IsActive == true).FirstOrDefaultAsync();
            var beneficiary = await (from b in db.Beneficiaries
                                    join ind in db.Individuals on b.BeneficiaryID equals ind.BeneficiaryID
                                    where b.IsActive == true && ind.IsActive == true
                                    && (ind.RelationshipCode == "HH" || ind.RelationshipCode == "HSelf")
                                     select new BeneficiaryForListDto
                                    {
                                        BeneficiaryID = b.BeneficiaryID,
                                        CardID = b.CardID,
                                        Name = ind.Name,
                                        FName = ind.FName,
                                        ScreeningDate = b.ScreeningDate,
                                        BorderPoint = b.BorderPoint,
                                        BeneficiaryType = b.BeneficiaryType,
                                        ReturnStatus = b.ReturnStatus,
                                        IsCardIssued = b.IsCardIssued
                                    }
                      ).ToListAsync();

            if (!string.IsNullOrEmpty(model.CardID))
            {
                beneficiary = beneficiary.Where(b => b.CardID == model.CardID).ToList();
            }
            if (!string.IsNullOrEmpty(model.BeneficiaryName))
            {
                beneficiary = beneficiary.Where(b => b.Name == model.BeneficiaryName).ToList();
            }
            if (!string.IsNullOrEmpty(model.BeneficiaryFName))
            {
                beneficiary = beneficiary.Where(b => b.FName == model.BeneficiaryFName).ToList();
            }
            if (!string.IsNullOrEmpty(model.BorderPoint))
            {
                beneficiary = beneficiary.Where(b => b.BorderPoint == model.BorderPoint).ToList();
            }
            if (!string.IsNullOrEmpty(model.BeneficiaryType))
            {
                beneficiary = beneficiary.Where(b => b.BeneficiaryType == model.BeneficiaryType).ToList();
            }
            if (!string.IsNullOrEmpty(model.ReturnStatus))
            {
                beneficiary = beneficiary.Where(b => b.ReturnStatus == model.ReturnStatus).ToList();
            }
            if (model.ScreeningDateFrom != null)
            {
                beneficiary = beneficiary.Where(b => b.ScreeningDate >= model.ScreeningDateFrom).ToList();
            }
            if (model.ScreeningDateTo != null)
            {
                beneficiary = beneficiary.Where(b => b.ScreeningDate <= model.ScreeningDateTo).ToList();
            }
            beneficiary = beneficiary.Select(b=>
            new BeneficiaryForListDto
            {
                BeneficiaryID = b.BeneficiaryID,
                CardID = b.CardID,
                Name = b.Name,
                FName = b.FName,
                ScreeningDate = b.ScreeningDate,
                BorderPoint = db.BorderCrossingPoints.Where(bcp => bcp.BCPCode == b.BorderPoint).Select(bcp => bcp.EnName).FirstOrDefault(),
                BeneficiaryType = b.BeneficiaryType,
                ReturnStatus = db.LookupValues.Where(l => l.ValueCode == b.ReturnStatus).Select(l => l.EnName).FirstOrDefault(),
                IsCardIssued = b.IsCardIssued
            }
            ).OrderByDescending(b=>b.ScreeningDate).ToList();
            var valueToReturn = new {
                total = beneficiary.Count,
                data = beneficiary.Skip(model.PageIndex * model.PageSize).Take(model.PageSize).ToList()
            };
            return Ok(valueToReturn);
            
        }

        // GET: api/Beneficiary/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var beneficiary = await db.Beneficiaries
                .Where(b => b.BeneficiaryID == id && b.IsActive == true)
                .FirstOrDefaultAsync();
            if (beneficiary != null)
            {
                var beneficiaryToReturn = _mapper.Map<BeneficiaryFormDto>(beneficiary);
                var individuals = await db.Individuals.Where(i => i.BeneficiaryID == beneficiary.BeneficiaryID && i.IsActive == true)
                    .Select(i =>
                    new IndividualDto
                    {
                        IndividualID = i.IndividualID,
                        Name = i.Name,
                        DrName = i.DrName,
                        FName = i.FName,
                        DrFName = i.DrFName,
                        GenderCode = i.GenderCode,
                        Gender = db.LookupValues.Where(l => l.ValueCode == i.GenderCode).Select(l => l.EnName).FirstOrDefault(),
                        MaritalStatusCode = i.MaritalStatusCode,
                        MaritalStatus = db.LookupValues.Where(l => l.ValueCode == i.MaritalStatusCode).Select(l => l.EnName).FirstOrDefault(),
                        Age = i.Age,
                        IDTypeCode = i.IDTypeCode,
                        IDType = db.LookupValues.Where(l => l.ValueCode == i.IDTypeCode).Select(l => l.EnName).FirstOrDefault(),
                        IDNo = i.IDNo,
                        RelationshipCode = i.RelationshipCode,
                        Relationship = db.LookupValues.Where(l => l.ValueCode == i.RelationshipCode).Select(l => l.EnName).FirstOrDefault(),
                        ContactNumber = i.ContactNumber
                    }
                    )
                .ToListAsync();
                beneficiaryToReturn.Individuals = individuals;
                beneficiaryToReturn.PSNs = db.PSNs.Where(p => p.BeneficiaryID == beneficiary.BeneficiaryID).Select(o => new SelectOptionDto { ID = o.ID, LookupCode = o.PSNCode, Other= o.PSNOther}).ToList();
                beneficiaryToReturn.ReturnReasons = db.ReturnReasons.Where(r => r.BeneficiaryID == beneficiary.BeneficiaryID).Select(o => new SelectOptionDto { ID = o.ID, LookupCode = o.ReasonCode, Other = o.Other }).ToList();
                beneficiaryToReturn.Determinations = db.Determinations.Where(r => r.BeneficiaryID == beneficiary.BeneficiaryID).Select(o => new DeterminationDto { ID = o.ID, LookupCode = o.DeterminationCode, Other = o.Other, AnswerCode = o.AnswerCode }).ToList();
                beneficiaryToReturn.MoneySources = db.MoneySources.Where(r => r.BeneficiaryID == beneficiary.BeneficiaryID).Select(o => new SelectOptionDto { ID = o.ID, LookupCode = o.MoneySourceCode, Other = o.MoneySourceOther }).ToList();
                beneficiaryToReturn.BroughtItems = db.BroughtItems.Where(r => r.BeneficiaryID == beneficiary.BeneficiaryID).Select(o => new SelectOptionDto { ID = o.ID, LookupCode = o.ItemCode, Other = o.ItemOther }).ToList();
                beneficiaryToReturn.PostArrivalNeeds = db.PostArrivalNeeds.Where(r => r.BeneficiaryID == beneficiary.BeneficiaryID).Select(n=> new PostArrivalNeedsDto { ID = n.ID, IsProvided = n.Provided, LookupCode=n.NeedCode,ProvidedDate=n.ProvidedDate,Comment=n.Comment}).ToList();
                beneficiaryToReturn.BenefitedFromOrgs = db.BenefitedFromOrgs.Where(r => r.BeneficiaryID == beneficiary.BeneficiaryID).ToList();
                beneficiaryToReturn.Transportations = db.Transportations.Where(r => r.BeneficiaryID == beneficiary.BeneficiaryID).Select(o => new SelectOptionDto { ID = o.ID, LookupCode = o.TypedCode, Other = o.Other }).ToList();
                beneficiaryToReturn.LivelihoodEmpNeeds = db.LivelihoodEmpNeeds.Where(r => r.BeneficiaryID == beneficiary.BeneficiaryID).Select(o => new SelectOptionDto { ID = o.ID, LookupCode = o.NeedCode}).ToList();
                beneficiaryToReturn.NeedTools = db.NeedTools.Where(r => r.BeneficiaryID == beneficiary.BeneficiaryID).Select(o => new SelectOptionDto { ID = o.ID, LookupCode = o.ToolCode, Other = o.Other }).ToList();
                beneficiaryToReturn.MainConcerns = db.MainConcerns.Where(r => r.BeneficiaryID == beneficiary.BeneficiaryID).Select(o => new SelectOptionDto { ID = o.ID, LookupCode = o.ConcernCode, Other = o.Other }).ToList();
                beneficiaryToReturn.HostCountrySchools = db.HostCountrySchools.Where(r => r.BeneficiaryID == beneficiary.BeneficiaryID).Select(o => new SelectOptionDto { ID = o.ID, LookupCode = o.SchoolTypeCode }).ToList();

                return Ok(beneficiaryToReturn);
            }
            return BadRequest();
        }

        [AllowAnonymous]
        [HttpGet("viewBeneficiary/{id}")]
        public async Task<IActionResult> ViewBeneficiary(int id)
        {
            var beneficiaryInDb = await db.Beneficiaries
                .Where(b => b.BeneficiaryID == id && b.IsActive == true)
                .FirstOrDefaultAsync();
            if (beneficiaryInDb != null)
            {
                var beneficiaryToReturn = _mapper.Map<BeneficiaryForViewDto>(beneficiaryInDb);

                beneficiaryToReturn.ProvinceBCP = db.Provinces.Where(p => p.ProvinceCode == beneficiaryInDb.ProvinceBCP).Select(p => p.EnName).FirstOrDefault();
                beneficiaryToReturn.BorderPoint = db.BorderCrossingPoints.Where(b => b.BCPCode == beneficiaryInDb.BorderPoint).Select(b => b.EnName).FirstOrDefault();
                beneficiaryToReturn.OriginProvince = db.Provinces.Where(b => b.ProvinceCode == beneficiaryInDb.OriginProvince).Select(b => b.EnName).FirstOrDefault();
                beneficiaryToReturn.OriginDistrict = db.Districts.Where(b => b.DistrictCode == beneficiaryInDb.OriginDistrict).Select(b => b.EnName).FirstOrDefault();
                beneficiaryToReturn.ReturnProvince = db.Provinces.Where(b => b.ProvinceCode == beneficiaryInDb.ReturnProvince).Select(b => b.EnName).FirstOrDefault();
                beneficiaryToReturn.ReturnDistrict = db.Districts.Where(b => b.DistrictCode == beneficiaryInDb.ReturnDistrict).Select(b => b.EnName).FirstOrDefault();
                if(beneficiaryInDb.LeavingReason1 == "LROther")
                {
                    beneficiaryToReturn.LeavingReason1 = beneficiaryInDb.LeavingReason1Other;
                }
                else
                {
                    beneficiaryToReturn.LeavingReason1 = db.LookupValues.Where(b => b.ValueCode == beneficiaryInDb.LeavingReason1).Select(b => b.EnName).FirstOrDefault();
                }

                if (!string.IsNullOrEmpty(beneficiaryInDb.LeavingReason2))
                {
                    if(beneficiaryInDb.LeavingReason2 == "LROther")
                    {
                        beneficiaryToReturn.LeavingReason2 = beneficiaryInDb.LeavingReason2Other;
                    }
                    else
                    {
                        beneficiaryToReturn.LeavingReason2 = db.LookupValues.Where(b => b.ValueCode == beneficiaryInDb.LeavingReason2).Select(b => b.EnName).FirstOrDefault();
                    }
                }
                if (!string.IsNullOrEmpty(beneficiaryInDb.LeavingReason3))
                {
                    if(beneficiaryInDb.LeavingReason3 == "LROther")
                    {
                        beneficiaryToReturn.LeavingReason3 = beneficiaryInDb.LeavingReason3Other;
                    }
                    else
                    {
                        beneficiaryToReturn.LeavingReason3 = db.LookupValues.Where(b => b.ValueCode == beneficiaryInDb.LeavingReason3).Select(b => b.EnName).FirstOrDefault();
                    }
                }
                beneficiaryToReturn.WhereWillLive = db.LookupValues.Where(b => b.ValueCode == beneficiaryInDb.WhereWillLive).Select(b => b.EnName).FirstOrDefault();
                if(beneficiaryInDb.CountryOfExile != "COther")
                {
                    beneficiaryToReturn.BeforReturnProvince = db.HostCountryProvinces.Where(p => p.ProvinceId == beneficiaryInDb.BeforReturnProvince).Select(p => p.EnName).FirstOrDefault();
                    beneficiaryToReturn.BeforReturnDistrict = db.HostCountryDistricts.Where(d => d.DistrictId == beneficiaryInDb.BeforReturnDistrictID).Select(p => p.EnName).FirstOrDefault();
                }
                if(beneficiaryInDb.TopNeed1 == "TNOther")
                {
                    beneficiaryToReturn.TopNeed1 = beneficiaryInDb.TopNeed1Other;
                }
                else
                {
                    beneficiaryToReturn.TopNeed1 = db.LookupValues.Where(l => l.ValueCode == beneficiaryInDb.TopNeed1).Select(l => l.EnName).FirstOrDefault();
                }

                if (!string.IsNullOrEmpty(beneficiaryInDb.TopNeed2))
                {
                    if(beneficiaryInDb.TopNeed2 == "TNOther")
                    {
                        beneficiaryToReturn.TopNeed2 = beneficiaryInDb.TopNeed2Other;
                    }
                    else
                    {
                        beneficiaryToReturn.TopNeed2 = db.LookupValues.Where(l => l.ValueCode == beneficiaryInDb.TopNeed2).Select(l => l.EnName).FirstOrDefault();
                    }
                }
                if (!string.IsNullOrEmpty(beneficiaryInDb.TopNeed3))
                {
                    if(beneficiaryInDb.TopNeed3 == "TNOther")
                    {
                        beneficiaryToReturn.TopNeed3 = beneficiaryInDb.TopNeed3Other;
                    }
                    else
                    {
                        beneficiaryToReturn.TopNeed3 = db.LookupValues.Where(l => l.ValueCode == beneficiaryInDb.TopNeed3).Select(l => l.EnName).FirstOrDefault();
                    }
                }
                beneficiaryToReturn.IntendToDo = db.LookupValues.Where(l => l.ValueCode == beneficiaryInDb.IntendToDo).Select(l => l.EnName).FirstOrDefault();
                beneficiaryToReturn.ProfessionInHostCountry = db.LookupValues.Where(l => l.ValueCode == beneficiaryInDb.ProfessionInHostCountry).Select(l => l.EnName).FirstOrDefault();
                beneficiaryToReturn.HoHEducationLevel = db.LookupValues.Where(l => l.ValueCode == beneficiaryInDb.HoHEducationLevel).Select(l => l.EnName).FirstOrDefault();

                if(beneficiaryInDb.ProfessionInHostCountry == "ProfOther")
                {
                    beneficiaryToReturn.ProfessionInHostCountry = beneficiaryInDb.ProfessionInHostCountryOther;
                }
                else
                {
                    beneficiaryToReturn.ProfessionInHostCountry = db.LookupValues.Where(l => l.ValueCode == beneficiaryInDb.ProfessionInHostCountry).Select(l => l.EnName).FirstOrDefault();
                }

                if (beneficiaryInDb.HoHEducationLevel == "EDUOther")
                {
                    beneficiaryToReturn.HoHEducationLevel = beneficiaryInDb.HoHEducationLevelOther;
                }
                else
                {
                    beneficiaryToReturn.HoHEducationLevel = db.LookupValues.Where(l => l.ValueCode == beneficiaryInDb.HoHEducationLevel).Select(l => l.EnName).FirstOrDefault();
                }
                var individuals = await db.Individuals.Where(i => i.BeneficiaryID == beneficiaryInDb.BeneficiaryID && i.IsActive == true)
                    .Select(i =>
                    new IndividualForViewDto
                    {
                        IndividualID = i.IndividualID,
                        Name = i.Name,
                        DrName = i.DrName,
                        FName = i.FName,
                        DrFName = i.DrFName,
                        Gender = db.LookupValues.Where(l => l.ValueCode == i.GenderCode).Select(l => l.EnName).FirstOrDefault(),
                        MaritalStatus = db.LookupValues.Where(l => l.ValueCode == i.MaritalStatusCode).Select(l => l.EnName).FirstOrDefault(),
                        Age = i.Age,
                        IDType = db.LookupValues.Where(l => l.ValueCode == i.IDTypeCode).Select(l => l.EnName).FirstOrDefault(),
                        IDNo = i.IDNo,
                        Relationship = db.LookupValues.Where(l => l.ValueCode == i.RelationshipCode).Select(l => l.EnName).FirstOrDefault(),
                        ContactNumber = i.ContactNumber
                    }).ToListAsync();
                beneficiaryToReturn.Individuals = individuals;
                var psns = db.PSNs.Where(b => b.BeneficiaryID == beneficiaryInDb.BeneficiaryID)
                    .Select(p => new { p.PSNCode,p.PSNOther}).ToList();
                foreach(var p in psns)
                {
                    if (p.PSNCode == "PSNOther")
                    {
                        beneficiaryToReturn.psns.Add(p.PSNOther);
                    }
                    else
                    {
                        var psn = db.LookupValues.Where(l => l.ValueCode == p.PSNCode).Select(l => l.EnName).FirstOrDefault();
                        beneficiaryToReturn.psns.Add(psn);
                    }
                }
                var returnReasons = db.ReturnReasons.Where(b => b.BeneficiaryID == beneficiaryInDb.BeneficiaryID)
                    .Select(p => new { p.ReasonCode, p.Other }).ToList();
                foreach (var r in returnReasons)
                {
                    if (r.ReasonCode == "RROther")
                    {
                        beneficiaryToReturn.ReturnReasons.Add(r.Other);
                    }
                    else
                    {
                        var reason = db.LookupValues.Where(l => l.ValueCode == r.ReasonCode).Select(l => l.EnName).FirstOrDefault();
                        beneficiaryToReturn.ReturnReasons.Add(reason);
                    }
                }
                var determinations = db.Determinations.Where(b => b.BeneficiaryID == beneficiaryInDb.BeneficiaryID)
                    .Select(p => new { p.AnswerCode,p.DeterminationCode,p.Other }).ToList();
                foreach (var d in determinations)
                {
                    if (d.DeterminationCode == "RankImpOther")
                    {
                        var determination = new DeterminationForViewDto {
                            DeterminationName = d.Other,
                            AnswerCode = d.AnswerCode
                        };
                        beneficiaryToReturn.Determinations.Add(determination);
                    }
                    else
                    {
                        var determination = new DeterminationForViewDto
                        {
                            AnswerCode = d.AnswerCode
                        };
                        determination.DeterminationName = db.LookupValues.Where(l => l.ValueCode == d.DeterminationCode).Select(l => l.EnName).FirstOrDefault();
                        beneficiaryToReturn.Determinations.Add(determination);
                    }
                }

                var moneySources = db.MoneySources.Where(b => b.BeneficiaryID == beneficiaryInDb.BeneficiaryID)
                    .Select(p => new { p.MoneySourceCode, p.MoneySourceOther }).ToList();
                foreach (var m in moneySources)
                {
                    if (m.MoneySourceCode == "MFRPOther")
                    {
                        beneficiaryToReturn.MoneySources.Add(m.MoneySourceOther);
                    }
                    else
                    {
                        var source = db.LookupValues.Where(l => l.ValueCode == m.MoneySourceCode).Select(l => l.EnName).FirstOrDefault();
                        beneficiaryToReturn.MoneySources.Add(source);
                    }
                }

                var broughtItems = db.BroughtItems.Where(b => b.BeneficiaryID == beneficiaryInDb.BeneficiaryID)
                    .Select(p => new { p.ItemCode, p.ItemOther }).ToList();
                foreach (var i in broughtItems)
                {
                    if (i.ItemCode == "ITEMSOther")
                    {
                        beneficiaryToReturn.BroughtItems.Add(i.ItemOther);
                    }
                    else
                    {
                        var item = db.LookupValues.Where(l => l.ValueCode == i.ItemCode).Select(l => l.EnName).FirstOrDefault();
                        beneficiaryToReturn.BroughtItems.Add(item);
                    }
                }

                var postArrivalNeeds = db.PostArrivalNeeds.Where(b => b.BeneficiaryID == beneficiaryInDb.BeneficiaryID)
                    .Select(p => new { p.NeedCode, p.ProvidedDate, p.Comment, p.Provided }).ToList();
                foreach (var p in postArrivalNeeds)
                {
                    var needName = db.LookupValues.Where(l => l.ValueCode == p.NeedCode).Select(l => l.EnName).FirstOrDefault();
                    var PostArrivalNeedObj = new PostArrivalNeedsForViewDto
                    {
                        Comment = p.Comment,
                        IsProvided = p.Provided,
                        Need = needName,
                        ProvidedDate = p.ProvidedDate
                    };
                    beneficiaryToReturn.PostArrivalNeeds.Add(PostArrivalNeedObj);
                    
                }

                var benefitedFromOrgs = db.BenefitedFromOrgs.Where(b => b.BeneficiaryID == beneficiaryInDb.BeneficiaryID)
                    .Select(p => new { p.Date, p.ProvinceCode, p.DistrictID, p.Village, p.OrgCode, p.AssistanceProvided }).ToList();
                foreach (var b in benefitedFromOrgs)
                {
                    var province = db.Provinces.Where(l => l.ProvinceCode == b.ProvinceCode).Select(l => l.EnName).FirstOrDefault();
                    var district = db.Districts.Where(l => l.DistrictCode == b.DistrictID).Select(l => l.EnName).FirstOrDefault();
                    var organization = db.LookupValues.Where(l => l.ValueCode == b.OrgCode).Select(l => l.EnName).FirstOrDefault();
                    var postArrivalNeedObj = new BenefitedFromOrgsForViewDto
                    {
                        ProvidedDate = b.Date,
                        Province = province,
                        District = district,
                        Village = b.Village,
                        Organization = organization,
                        AssistanceProvided = b.AssistanceProvided
                    };
                    beneficiaryToReturn.BenefitedFromOrgs.Add(postArrivalNeedObj);

                }

                var transportations = db.Transportations.Where(b => b.BeneficiaryID == beneficiaryInDb.BeneficiaryID)
                   .Select(t => new { t.TypedCode, t.Other }).ToList();
                foreach (var t in transportations)
                {
                    if (t.TypedCode == "TransportOther")
                    {
                        beneficiaryToReturn.Transportations.Add(t.Other);
                    }
                    else
                    {
                        var transportOptionName = db.LookupValues.Where(l => l.ValueCode == t.TypedCode).Select(l => l.EnName).FirstOrDefault();
                        beneficiaryToReturn.Transportations.Add(transportOptionName);
                    }
                }
                var livelihoodEmpNeeds = db.LivelihoodEmpNeeds.Where(b => b.BeneficiaryID == beneficiaryInDb.BeneficiaryID)
                   .Select(t => new { t.NeedCode }).ToList();
                foreach (var t in livelihoodEmpNeeds)
                {
                    var needName = db.LookupValues.Where(l => l.ValueCode == t.NeedCode).Select(l => l.EnName).FirstOrDefault();
                    beneficiaryToReturn.LivelihoodEmpNeeds.Add(needName);
                }

                var needTools = db.NeedTools.Where(b => b.BeneficiaryID == beneficiaryInDb.BeneficiaryID)
                   .Select(t => new { t.ToolCode, t.Other }).ToList();
                foreach (var t in needTools)
                {
                    if (t.ToolCode == "ToolsOther")
                    {
                        beneficiaryToReturn.NeedTools.Add(t.Other);
                    }
                    else
                    {
                        var toolName = db.LookupValues.Where(l => l.ValueCode == t.ToolCode).Select(l => l.EnName).FirstOrDefault();
                        beneficiaryToReturn.NeedTools.Add(toolName);
                    }
                }
                var mainConcerns = db.MainConcerns.Where(b => b.BeneficiaryID == beneficiaryInDb.BeneficiaryID)
                   .Select(t => new { t.ConcernCode, t.Other }).ToList();
                foreach (var c in mainConcerns)
                {
                    if (c.ConcernCode == "WAY3MCOther")
                    {
                        beneficiaryToReturn.MainConcerns.Add(c.Other);
                    }
                    else
                    {
                        var concernName = db.LookupValues.Where(l => l.ValueCode == c.ConcernCode).Select(l => l.EnName).FirstOrDefault();
                        beneficiaryToReturn.MainConcerns.Add(concernName);
                    }
                }
                var hostCountrySchools = db.HostCountrySchools.Where(b => b.BeneficiaryID == beneficiaryInDb.BeneficiaryID)
                   .Select(t => new { t.SchoolTypeCode }).ToList();
                foreach (var s in hostCountrySchools)
                {
                    var schoolTypeName = db.LookupValues.Where(l => l.ValueCode == s.SchoolTypeCode).Select(l => l.EnName).FirstOrDefault();
                    beneficiaryToReturn.HostCountrySchools.Add(schoolTypeName);
                }
                return Ok(beneficiaryToReturn);
            }
            return BadRequest("Beneficiary not found");
        }
        // POST: api/Beneficiary
        [HttpPost]
        public bool Post([FromBody] BeneficiaryDto model)
        {
            if(model != null)
            {
                using (var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        var currentUser = HttpContext.User;
                        var beneficiary = _mapper.Map<Beneficiary>(model);
                        beneficiary.IsSubmitted = true;
                        db.Beneficiaries.Add(beneficiary);
                        db.SaveChanges();

                        foreach (var ind in model.Individuals)
                        {
                            var member = _mapper.Map<Individual>(model.Individuals);
                            member.IsActive = true;
                            db.Individuals.Add(member);
                        }

                        foreach (var psn in model.PSNs)
                        {
                            var psnObj = new PSN
                            {
                                BeneficiaryID = beneficiary.BeneficiaryID,
                                PSNCode = psn.PSNCode,
                                PSNOther = psn.PSNOther
                            };
                            db.PSNs.Add(psnObj);
                        }

                        foreach (var rReason in model.ReturnReasons)
                        {
                            var rrObj = new ReturnReason
                            {
                                BeneficiaryID = beneficiary.BeneficiaryID,
                                ReasonCode = rReason.ReasonCode,
                                Other = rReason.Other
                            };
                            db.ReturnReasons.Add(rrObj);
                        }

                        foreach (var d in model.Determinations)
                        {
                            var dObj = new Determination
                            {
                                BeneficiaryID = beneficiary.BeneficiaryID,
                                DeterminationCode = d.DeterminationCode,
                                AnswerCode = d.AnswerCode,
                                Other = d.Other
                            };
                            db.Determinations.Add(dObj);
                        }

                        foreach (var m in model.MoneySources)
                        {
                            var moneySObj = new MoneySource
                            {
                                BeneficiaryID = beneficiary.BeneficiaryID,
                                MoneySourceCode = m.MoneySourceCode,
                                MoneySourceOther = m.MoneySourceOther
                            };
                            db.MoneySources.Add(moneySObj);
                        }

                        foreach (var bi in model.BroughtItems)
                        {
                            var biObj = new BroughtItem
                            {
                                BeneficiaryID = beneficiary.BeneficiaryID,
                                ItemCode = bi.ItemCode,
                                ItemOther = bi.ItemOther
                            };
                            db.BroughtItems.Add(biObj);
                        }

                        foreach (var p in model.PostArrivalNeeds)
                        {
                            var panObj = new PostArrivalNeed
                            {
                                BeneficiaryID = beneficiary.BeneficiaryID,
                                NeedCode = p.NeedCode,
                                Provided = p.Provided,
                                ProvidedDate = p.ProvidedDate,
                                Comment = p.Comment
                            };
                            db.PostArrivalNeeds.Add(panObj);
                        }

                        if (model.HaveFamilyBenefited == true)
                        {
                            foreach (var a in model.BenefitedFromOrgs)
                            {
                                var assisOrgInfo = new BenefitedFromOrg
                                {
                                    BeneficiaryID = beneficiary.BeneficiaryID,
                                    Date = a.Date,
                                    ProvinceCode = a.ProvinceCode,
                                    DistrictID = a.DistrictID,
                                    Village = a.Village,
                                    OrgCode = a.OrgCode,
                                    AssistanceProvided = a.AssistanceProvided
                                };
                                db.BenefitedFromOrgs.Add(assisOrgInfo);
                            }
                        }

                        foreach (var tran in model.Transportations)
                        {
                            var tranObj = new Transportation
                            {
                                BeneficiaryID = beneficiary.BeneficiaryID,
                                TypedCode = tran.TypedCode,
                                Other = tran.Other
                            };
                            db.Transportations.Add(tranObj);
                        }

                        foreach (var li in model.LivelihoodEmpNeeds)
                        {
                            var liObj = new LivelihoodEmpNeed
                            {
                                BeneficiaryID = beneficiary.BeneficiaryID,
                                NeedCode = li.NeedCode
                            };
                            db.LivelihoodEmpNeeds.Add(liObj);
                        }

                        foreach (var needTool in model.NeedTools)
                        {
                            var needToolObj = new NeedTool
                            {
                                BeneficiaryID = beneficiary.BeneficiaryID,
                                ToolCode = needTool.ToolCode,
                                Other = needTool.Other
                            };
                            db.NeedTools.Add(needToolObj);
                        }

                        foreach (var mConcern in model.MainConcerns)
                        {
                            var mcObj = new MainConcern
                            {
                                BeneficiaryID = beneficiary.BeneficiaryID,
                                ConcernCode = mConcern.ConcernCode,
                                Other = mConcern.Other
                            };
                            db.MainConcerns.Add(mcObj);
                        }

                        foreach (var hc in model.HostCountrySchools)
                        {
                            var hcObj = new HostCountrySchool
                            {
                                BeneficiaryID = beneficiary.BeneficiaryID,
                                SchoolTypeCode = hc.SchoolTypeCode
                            };
                            db.HostCountrySchools.Add(hcObj);
                        }

                        db.SaveChanges();

                        trans.Commit();
                        return true;
                    }
                    catch (Exception e)
                    {
                        trans.Rollback();
                        return false;
                    }
                }

            }
            return false;
        }

        // PUT: api/Beneficiary/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] BeneficiaryFormDto model)
        {
            var beneficiaryInDb = db.Beneficiaries.Where(b => b.IsActive == true && b.BeneficiaryID == id).FirstOrDefault();
            if(beneficiaryInDb == null)
            {
                return NotFound("Beneficiary not found.");
            }
            if(model != null)
            {
                using (var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        var currentUser = HttpContext.User;
                        _mapper.Map(model,beneficiaryInDb);
                        beneficiaryInDb.LastUpdatedBy = currentUser.Identity.Name;
                        beneficiaryInDb.LastUpdatedDate = DateTime.Now;
                        //beneficiaryInDb.upd
                        db.SaveChanges();
                        var _Individuals = db.Individuals.Where(x => x.BeneficiaryID == id).ToList();
                        _Individuals.ForEach(x => x.IsActive = false);
                        db.SaveChanges();
                        foreach (var row in model.Individuals)
                        {
                            if (row != null)
                            {
                                if (row.IndividualID == 0)
                                {
                                    var newIndividual = _mapper.Map<Individual>(row);
                                    newIndividual.BeneficiaryID = model.BeneficiaryID;
                                    newIndividual.IsActive = true;
                                    db.Individuals.Add(newIndividual);
                                    db.SaveChanges();
                                }
                                else
                                {
                                    var individualInDb = db.Individuals.Where(i => i.BeneficiaryID == model.BeneficiaryID &&
                                    i.IndividualID == row.IndividualID).FirstOrDefault();
                                    if(individualInDb != null)
                                    {
                                        _mapper.Map(row,individualInDb);
                                        individualInDb.BeneficiaryID = model.BeneficiaryID;
                                        individualInDb.IsActive = true;
                                        db.SaveChanges();
                                    }
                                }
                            }
                        }

                        db.PSNs.Where(x => x.BeneficiaryID == model.BeneficiaryID).ToList().ForEach(x => db.PSNs.Remove(x));

                        foreach (var psn in model.PSNs)
                        {
                            var psnObj = new PSN
                            {
                                BeneficiaryID = beneficiaryInDb.BeneficiaryID,
                                PSNCode = psn.LookupCode,
                                PSNOther = psn.Other
                            };
                            db.PSNs.Add(psnObj);
                        }
                        db.ReturnReasons.Where(x => x.BeneficiaryID == model.BeneficiaryID).ToList().ForEach(x => db.ReturnReasons.Remove(x));

                        foreach (var rReason in model.ReturnReasons)
                        {
                            var rrObj = new ReturnReason
                            {
                                BeneficiaryID = beneficiaryInDb.BeneficiaryID,
                                ReasonCode = rReason.LookupCode,
                                Other = rReason.Other
                            };
                            db.ReturnReasons.Add(rrObj);
                        }

                        db.Determinations.Where(x => x.BeneficiaryID == model.BeneficiaryID).ToList().ForEach(x => db.Determinations.Remove(x));

                        foreach (var d in model.Determinations)
                        {
                            var dObj = new Determination
                            {
                                BeneficiaryID = beneficiaryInDb.BeneficiaryID,
                                DeterminationCode = d.LookupCode,
                                AnswerCode = d.AnswerCode,
                                Other = d.Other
                            };
                            db.Determinations.Add(dObj);
                        }

                        db.MoneySources.Where(x => x.BeneficiaryID == model.BeneficiaryID).ToList().ForEach(x => db.MoneySources.Remove(x));

                        foreach (var m in model.MoneySources)
                        {
                            var moneySObj = new MoneySource
                            {
                                BeneficiaryID = beneficiaryInDb.BeneficiaryID,
                                MoneySourceCode = m.LookupCode,
                                MoneySourceOther = m.Other
                            };
                            db.MoneySources.Add(moneySObj);
                        }

                        db.BroughtItems.Where(x => x.BeneficiaryID == model.BeneficiaryID).ToList().ForEach(x => db.BroughtItems.Remove(x));

                        foreach (var bi in model.BroughtItems)
                        {
                            var biObj = new BroughtItem
                            {
                                BeneficiaryID = beneficiaryInDb.BeneficiaryID,
                                ItemCode = bi.LookupCode,
                                ItemOther = bi.Other
                            };
                            db.BroughtItems.Add(biObj);
                        }

                        db.PostArrivalNeeds.Where(x => x.BeneficiaryID == model.BeneficiaryID).ToList().ForEach(x => db.PostArrivalNeeds.Remove(x));

                        foreach (var p in model.PostArrivalNeeds)
                        {
                            var panObj = new PostArrivalNeed
                            {
                                BeneficiaryID = beneficiaryInDb.BeneficiaryID,
                                NeedCode = p.LookupCode,
                                Provided = p.IsProvided,
                                ProvidedDate = (DateTime)p.ProvidedDate,
                                Comment = p.Comment
                            };
                            db.PostArrivalNeeds.Add(panObj);
                        }
                        db.BenefitedFromOrgs.Where(x => x.BeneficiaryID == model.BeneficiaryID).ToList().ForEach(x => db.BenefitedFromOrgs.Remove(x));
                        if (model.HaveFamilyBenefited == true)
                        {
                            foreach (var a in model.BenefitedFromOrgs)
                            {
                                var assisOrgInfo = new BenefitedFromOrg
                                {
                                    BeneficiaryID = beneficiaryInDb.BeneficiaryID,
                                    Date = a.Date,
                                    ProvinceCode = a.ProvinceCode,
                                    DistrictID = a.DistrictID,
                                    Village = a.Village,
                                    OrgCode = a.OrgCode,
                                    AssistanceProvided = a.AssistanceProvided
                                };
                                db.BenefitedFromOrgs.Add(assisOrgInfo);
                            }
                        }
                        db.Transportations.Where(x => x.BeneficiaryID == model.BeneficiaryID).ToList().ForEach(x => db.Transportations.Remove(x));

                        foreach (var tran in model.Transportations)
                        {
                            var tranObj = new Transportation
                            {
                                BeneficiaryID = beneficiaryInDb.BeneficiaryID,
                                TypedCode = tran.LookupCode,
                                Other = tran.Other
                            };
                            db.Transportations.Add(tranObj);
                        }
                        db.LivelihoodEmpNeeds.Where(x => x.BeneficiaryID == model.BeneficiaryID).ToList().ForEach(x => db.LivelihoodEmpNeeds.Remove(x));

                        foreach (var li in model.LivelihoodEmpNeeds)
                        {
                            var liObj = new LivelihoodEmpNeed
                            {
                                BeneficiaryID = beneficiaryInDb.BeneficiaryID,
                                NeedCode = li.LookupCode
                            };
                            db.LivelihoodEmpNeeds.Add(liObj);
                        }

                        db.NeedTools.Where(x => x.BeneficiaryID == model.BeneficiaryID).ToList().ForEach(x => db.NeedTools.Remove(x));

                        foreach (var needTool in model.NeedTools)
                        {
                            var needToolObj = new NeedTool
                            {
                                BeneficiaryID = beneficiaryInDb.BeneficiaryID,
                                ToolCode = needTool.LookupCode,
                                Other = needTool.Other
                            };
                            db.NeedTools.Add(needToolObj);
                        }

                        db.MainConcerns.Where(x => x.BeneficiaryID == model.BeneficiaryID).ToList().ForEach(x => db.MainConcerns.Remove(x));

                        foreach (var mConcern in model.MainConcerns)
                        {
                            var mcObj = new MainConcern
                            {
                                BeneficiaryID = beneficiaryInDb.BeneficiaryID,
                                ConcernCode = mConcern.LookupCode,
                                Other = mConcern.Other
                            };
                            db.MainConcerns.Add(mcObj);
                        }

                        db.HostCountrySchools.Where(x => x.BeneficiaryID == model.BeneficiaryID).ToList().ForEach(x => db.HostCountrySchools.Remove(x));

                        foreach (var hc in model.HostCountrySchools)
                        {
                            var hcObj = new HostCountrySchool
                            {
                                BeneficiaryID = beneficiaryInDb.BeneficiaryID,
                                SchoolTypeCode = hc.LookupCode
                            };
                            db.HostCountrySchools.Add(hcObj);
                        }

                        db.SaveChanges();

                        trans.Commit();
                        return NoContent();
                    }
                    catch (Exception e)
                    {
                        trans.Rollback();
                        throw new Exception($"Updating failed on save");
                    }
                }

            }

            return NoContent();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var obj =  db.Beneficiaries.Find(id);
            if(obj != null)
            {
                obj.IsActive = false;
                db.SaveChanges();
                return Ok();
            }
            return BadRequest("Beneficiary not found.");
        }
    }
}
