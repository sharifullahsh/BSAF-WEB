using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BSAFWebApi.Models.ViewModels
{
    public class Ng2Charts
    {
        public string[] categories { get; set; }
        public Series[] series { get; set; }
    }
    public class Series
    {
        public string label { get; set; }
        public int[] data { get; set; }
    }
}
