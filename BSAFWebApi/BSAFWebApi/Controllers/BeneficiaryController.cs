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
                                    join ind in db.Individuals on b.BeneficiaryID equals ind.BeneficiaryID into familyMember
                                    where b.IsActive == true
                                    select new BeneficiaryForListDto
                                    {
                                        BeneficiaryID = b.BeneficiaryID,
                                        CardID = b.CardID,
                                        Name = familyMember.Where(f => f.RelationshipCode == "HH" || f.RelationshipCode == "HSelf").Select(i => i.Name).FirstOrDefault(),
                                        FName = familyMember.Where(f => f.RelationshipCode == "HH" || f.RelationshipCode == "HSelf").Select(i => i.FName).FirstOrDefault(),
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
                var individuals = await db.Individuals.Where(i => i.BeneficiaryID == beneficiary.BeneficiaryID)
                    .Select(i =>
                    new IndividualDto
                    {
                        IndividualID = i.IndividualID,
                        BeneficiaryID = i.BeneficiaryID,
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
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
