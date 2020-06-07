using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BSAFWebApi.Models.ViewModels
{
    public class HighCharts
    {
        public string[] categories { get; set; }
        public Series[] series { get; set; }
    }
    public class Series
    {
        public string name { get; set; }
        public int[] data { get; set; }
    }
}
