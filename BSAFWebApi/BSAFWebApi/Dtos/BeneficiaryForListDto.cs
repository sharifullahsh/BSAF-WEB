using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BSAFWebApi.Dtos
{
    public class BeneficiaryForListDto
    {
        public int BeneficiaryID { get; set; }

        public string CardID { get; set; }

        public string Name { get; set; }

        public string FName { get; set; }

        public DateTime ScreeningDate { get; set; }

        public string BorderPoint { get; set; }

        public string BeneficiaryType { get; set; }

        public string ReturnStatus { get; set; }

        public bool IsCardIssued { get; set; }

    }
}
