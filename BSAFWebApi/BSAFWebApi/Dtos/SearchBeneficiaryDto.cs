using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BSAFWebApi.Dtos
{
    public class SearchBeneficiaryDto
    {
        public string CardID { get; set; }

        public string BeneficiaryName { get; set; }

        public string BeneficiaryFName { get; set; }

        public DateTime? ScreeningDateFrom { get; set; }

        public DateTime? ScreeningDateTo { get; set; }

        public string BorderPoint { get; set; }

        public string BeneficiaryType { get; set; }

        public string ReturnStatus { get; set; }

        public int PageIndex { get; set; }

        public int PageSize { get; set; }

        public int Length { get; set; }

    }
}
