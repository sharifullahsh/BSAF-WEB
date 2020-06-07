using BSAFWebApi.Dtos;
using BSAFWebApi.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BSAFWebApi.Models.Repositories
{
    public class BeneficiaryRepository
    {
        private readonly BWDbContext db = null;

        public BeneficiaryRepository(BWDbContext context)
        {
            db = context;
        }
        //public void ReturneeByBCPList(DashboardSearchDto model)
        public HighCharts BeneficiaryByBCPList(DashboardSearchDto model)
        {
            var data = (from b in db.Beneficiaries
                         where b.IsActive == true && b.ScreeningDate >= model.FromDate && b.ScreeningDate <= model.ToDate
                         group b by b.BorderPoint into ByBCP
                         
                         select new {
                             BCPName = db.BorderCrossingPoints.Where(bp=>bp.BCPCode == ByBCP.Key).Select(bp=>bp.EnName).FirstOrDefault(),
                             DEP = ByBCP.Where(b=>b.ReturnStatus == "DEP").Count(),
                             DC = ByBCP.Where(b=>b.ReturnStatus == "DC").Count(),
                             SR = ByBCP.Where(b=>b.ReturnStatus == "SR").Count()
                         }
                         ).ToList();
            HighCharts bybcp = new HighCharts
            {
                categories = data.Select(x => x.BCPName).ToArray(),
                series = new Series[]
                {
                    new Series
                    {
                        name = "Deported",
                        data = data.Select(x => x.DEP).ToArray()
                    },
                    new Series
                    {
                        name = "Document claimant",
                        data = data.Select(x => x.DC).ToArray()
                    },
                    new Series
                    {
                        name = "Spontaneous returnee",
                        data = data.Select(x => x.SR).ToArray()
                    },
                }
            };
            return bybcp;
        }

    }
}
