namespace BSAF.Models
{

    public partial class District
    {
        public int DistrictId { get; set; }

        public int DistrictCode { get; set; }

        public string ProvinceCode { get; set; }

        public string EnName { get; set; }

        public string DrName { get; set; }

        public string PaName { get; set; }

        public bool IsActive { get; set; }
    }
}
