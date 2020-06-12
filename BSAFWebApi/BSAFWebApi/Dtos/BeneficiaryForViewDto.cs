using BSAF.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BSAFWebApi.Dtos
{
    public class BeneficiaryForViewDto
    {
        public int BeneficiaryID { get; set; }

        public string CardID { get; set; }

        public DateTime ScreeningDate { get; set; }

        public string ProvinceBCP { get; set; }

        public string BorderPoint { get; set; }

        public string BeneficiaryType { get; set; }

        public string ReturnStatus { get; set; }

        public string OriginProvince { get; set; }

        public string OriginDistrict { get; set; }

        public string OriginVillage { get; set; }

        public string ReturnProvince { get; set; }

        public string ReturnDistrict { get; set; }

        public string ReturnVillage { get; set; }

        public string LeavingReason1 { get; set; }

        public string LeavingReason2 { get; set; }

        public string LeavingReason3 { get; set; }

        public bool? OwnHouse { get; set; }

        public string WhereWillLive { get; set; }

        public int? RentPayForAccom { get; set; }

        public string RentPayCurrency { get; set; }

        public bool? AllowForJob { get; set; }

        public string CountryOfExile { get; set; }

        public string CountryOfExilOther { get; set; }

        public string BeforReturnProvince { get; set; }

        public string BeforReturnDistrict { get; set; }

        public string BeforReturnRemarks { get; set; }

        public bool? FamilyMemStayedBehind { get; set; }

        public int? FamilyMemStayedBehindNo { get; set; }

        public int? LengthOfStayYears { get; set; }

        public int? LengthOfStayMonths { get; set; }

        public int? LengthOfStayDays { get; set; }

        public bool? WouldYouReturn { get; set; }

        public bool? HaveFamilyBenefited { get; set; }

        public DateTime TransportationDate { get; set; }

        public string TransportationInfo { get; set; }

        public string TransportAccompaniedBy { get; set; }

        public string TransportAccomByNo { get; set; }

        public string TopNeed1 { get; set; }

        public string TopNeed2 { get; set; }

        public string TopNeed3 { get; set; }

        public string IntendToDo { get; set; }

        public string IntendToReturnToHostReason { get; set; }

        public string ProfessionInHostCountry { get; set; }

        public string ProfessionInHostCountryOther { get; set; }

        public bool? HoHCanReadWrite { get; set; }

        public string HoHEducationLevel { get; set; }

        public int? NumHHHaveTaskira { get; set; }

        public int? NumHHHavePassport { get; set; }

        public int? NumHHHaveDocOther { get; set; }

        public bool? DoHaveSecureLivelihood { get; set; }

        public bool? DidChildrenGoToSchoole { get; set; }

        public int? NumChildrenAttendedSchoole { get; set; }

        public string InsertedBy { get; set; }

        public DateTime InsertedDate { get; set; }

        public string LastUpdatedBy { get; set; }

        public DateTime? LastUpdatedDate { get; set; }

        public bool IsCardIssued { get; set; }

        public byte[] Photo { get; set; }

        public List<IndividualForViewDto> Individuals { get; set; }

        public List<string> psns { get; set; }

        public List<string> ReturnReasons { get; set; }

        public List<DeterminationForViewDto> Determinations { get; set; }

        public List<string> MoneySources { get; set; }

        public List<string> BroughtItems { get; set; }

        public List<PostArrivalNeedsForViewDto> PostArrivalNeeds { get; set; }

        public List<BenefitedFromOrgsForViewDto> BenefitedFromOrgs { get; set; }

        public List<string> Transportations { get; set; }

        public List<string> LivelihoodEmpNeeds { get; set; }

        public List<string> NeedTools { get; set; }

        public List<string> MainConcerns { get; set; }

        public List<string> HostCountrySchools { get; set; }

        public BeneficiaryForViewDto()
        {
            Individuals = new List<IndividualForViewDto>();
            psns = new List<string>();
            ReturnReasons = new List<string>();
            Determinations = new List<DeterminationForViewDto>();
            MoneySources = new List<string>();
            BroughtItems = new List<string>();
            PostArrivalNeeds = new List<PostArrivalNeedsForViewDto>();
            BenefitedFromOrgs = new List<BenefitedFromOrgsForViewDto>();
            Transportations = new List<string>();
            LivelihoodEmpNeeds = new List<string>();
            NeedTools = new List<string>();
            MainConcerns = new List<string>();
            HostCountrySchools = new List<string>();
        }
    }

}
