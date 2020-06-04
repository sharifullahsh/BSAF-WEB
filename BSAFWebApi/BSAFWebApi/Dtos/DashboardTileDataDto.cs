using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BSAFWebApi.Dtos
{
    public class DashboardTileDataDto
    {
        public int TotalBeneficiaryCases { get; set; }
        public int TotalMembers { get; set; }
        public int TotalFamilyCases { get; set; }
        public int TotalIndividualCases { get; set; }
    }
}
