using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BSAFWebApi.Dtos
{
    public class BeneficiaryForListDto
    {
        public int BeneficiaryID { get; set; }

        public Guid GUID { get; set; }

        public string Name { get; set; }

        public string FName { get; set; }

        public DateTime ScreeningDate { get; set; }

        public string ProvinceBCP { get; set; }

        public string BorderPoint { get; set; }

        public string BeneficiaryType { get; set; }

        public string ReturnStatus { get; set; }

        public string ReturnProvince { get; set; }

        public string CountryOfExile { get; set; }

        public bool IsCardIssued { get; set; }

    }
}
