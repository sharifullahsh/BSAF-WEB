using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BSAF.Models;
using BSAFWebApi.Models;
using BSAFWebApi.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BSAFWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   // [AllowAnonymous]
    public class BeneficiaryController : ControllerBase
    {
        BWDbContext db = null;
        public BeneficiaryController(BWDbContext context)
        {
            db = context;
        }
        // GET: api/Beneficiary
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Beneficiary/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Beneficiary
        [HttpPost]
        public bool Post([FromBody] BeneficiaryVM model)
        {
            if(model != null)
            {
                using (var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        var currentUser = HttpContext.User;
                        var beneficiary = new Beneficiary
                        {
                            GUID = model.GUID,
                            ScreeningDate = model.ScreeningDate,
                            ProvinceBCP = model.ProvinceBCP,
                            BorderPoint = model.BorderPoint,
                            BeneficiaryType = model.BeneficiaryType,
                            ReturnStatus = model.ReturnStatus,
                            OriginProvince = model.OriginProvince,
                            OriginDistrict = model.OriginDistrict,
                            OriginVillage = model.OriginVillage,
                            ReturnProvince = model.ReturnProvince,
                            ReturnDistrict = model.ReturnDistrict,
                            ReturnVillage = model.ReturnVillage,
                            LeavingReason1 = model.LeavingReason1,
                            LeavingReason1Other = model.LeavingReason1Other,
                            LeavingReason2 = model.LeavingReason2,
                            LeavingReason2Other = model.LeavingReason2Other,
                            LeavingReason3 = model.LeavingReason3,
                            LeavingReason3Other = model.LeavingReason3Other,
                            OwnHouse = model.OwnHouse,
                            WhereWillLive = model.WhereWillLive,
                            RentPayForAccom = model.RentPayForAccom,
                            RentPayCurrency = model.RentPayCurrency,
                            AllowForJob = model.AllowForJob,
                            CountryOfExile = model.CountryOfExile,
                            CountryOfExilOther = model.CountryOfExilOther,
                            BeforReturnProvince = model.BeforReturnProvince,
                            BeforReturnDistrictID = model.BeforReturnDistrictID,
                            BeforReturnRemarks = model.BeforReturnRemarks,
                            FamilyMemStayedBehind = model.FamilyMemStayedBehind,
                            FamilyMemStayedBehindNo = model.FamilyMemStayedBehindNo,
                            LengthOfStayYears = model.LengthOfStayYears,
                            LengthOfStayMonths = model.LengthOfStayMonths,
                            LengthOfStayDays = model.LengthOfStayDays,
                            WouldYouReturn = model.WouldYouReturn,
                            HaveFamilyBenefited = model.HaveFamilyBenefited,
                            TransportationDate = model.TransportationDate,
                            TransportationInfo = model.TransportationInfo,
                            TransportAccompaniedBy = model.TransportAccompaniedBy,
                            TransportAccomByNo = model.TransportAccomByNo,
                            TopNeed1 = model.TopNeed1,
                            TopNeed1Other = model.TopNeed1Other,
                            TopNeed2 = model.TopNeed2,
                            TopNeed2Other = model.TopNeed2Other,
                            TopNeed3 = model.TopNeed3,
                            TopNeed3Other = model.TopNeed3Other,
                            IntendToDo = model.IntendToDo,
                            IntendToReturnToHostReason = model.IntendToReturnToHostReason,
                            ProfessionInHostCountry = model.ProfessionInHostCountry,
                            ProfessionInHostCountryOther = model.ProfessionInHostCountryOther,
                            HoHCanReadWrite = model.HoHCanReadWrite,
                            HoHEducationLevel = model.HoHEducationLevel,
                            HoHEducationLevelOther = model.HoHEducationLevelOther,
                            NumHHHaveTaskira = model.NumHHHaveTaskira,
                            NumHHHavePassport = model.NumHHHavePassport,
                            NumHHHaveDocOther = model.NumHHHaveDocOther,
                            DoHaveSecureLivelihood = model.DoHaveSecureLivelihood,
                            DidChildrenGoToSchoole = model.DidChildrenGoToSchoole,
                            NumChildrenAttendedSchoole = model.NumChildrenAttendedSchoole,
                            InsertedBy = currentUser.Identity.Name,
                            InsertedDate = model.InsertedDate,
                            IsSubmitted = true,
                            IsCardIssued = model.IsCardIssued,
                            IsActive = model.IsActive,
                            Photo=model.Photo
                            
                        };
                        db.Beneficiaries.Add(beneficiary);
                        db.SaveChanges();

                        foreach (var ind in model.Individuals)
                        {
                            var member = new Individual
                            {
                                BeneficiaryID = beneficiary.BeneficiaryID,
                                Name = ind.Name,
                                DrName = ind.DrName,
                                FName = ind.FName,
                                DrFName = ind.DrFName,
                                GenderCode = ind.GenderCode,
                                MaritalStatusCode = ind.MaritalStatusCode,
                                Age = ind.Age,
                                IDTypeCode = ind.IDTypeCode,
                                IDNo = ind.IDNo,
                                RelationshipCode = ind.RelationshipCode,
                                ContactNumber = ind.ContactNumber
                            };
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
