using System;
using System.Collections.Generic;

namespace BSAF.Models
{
    public partial class Beneficiary
    {
        public int BeneficiaryID { get; set; }

        public Guid GUID { get; set; }

        public DateTime ScreeningDate { get; set; }

        public string ProvinceBCP { get; set; }

        public string BorderPoint { get; set; }

        public string BeneficiaryType { get; set; }

        public string ReturnStatus { get; set; }

        public string OriginProvince { get; set; }

        public int? OriginDistrict { get; set; }

        public string OriginVillage { get; set; }

        public string ReturnProvince { get; set; }

        public int? ReturnDistrict { get; set; }

        public string ReturnVillage { get; set; }

        public string LeavingReason1 { get; set; }

        public string LeavingReason1Other { get; set; }

        public string LeavingReason2 { get; set; }

        public string LeavingReason2Other { get; set; }

        public string LeavingReason3 { get; set; }

        public string LeavingReason3Other { get; set; }

        public bool? OwnHouse { get; set; }

        public string WhereWillLive { get; set; }

        public int? RentPayForAccom { get; set; }

        public string RentPayCurrency { get; set; }

        public bool? AllowForJob { get; set; }

        public string CountryOfExile { get; set; }

        public string CountryOfExilOther { get; set; }

        public int? BeforReturnProvince { get; set; }

        public int? BeforReturnDistrictID { get; set; }

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

        public string TopNeed1Other { get; set; }

        public string TopNeed2 { get; set; }

        public string TopNeed2Other { get; set; }

        public string TopNeed3 { get; set; }

        public string TopNeed3Other { get; set; }

        public string IntendToDo { get; set; }

        public string IntendToReturnToHostReason { get; set; }

        public string ProfessionInHostCountry { get; set; }

        public string ProfessionInHostCountryOther { get; set; }

        public bool? HoHCanReadWrite { get; set; }

        public string HoHEducationLevel { get; set; }

        public string HoHEducationLevelOther { get; set; }

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

        public bool IsSubmitted { get; set; }

        public bool IsCardIssued { get; set; }

        public bool IsActive { get; set; }
        public byte[] Photo { get; set; }

    }
}
