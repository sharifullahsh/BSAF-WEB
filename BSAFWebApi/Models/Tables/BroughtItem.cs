namespace BSAF.Models
{


    public partial class BroughtItem
    {
        public int ID { get; set; }

        public int? BeneficiaryID { get; set; }

        public string ItemCode { get; set; }

        public string ItemOther { get; set; }

        public virtual Beneficiary Beneficiary { get; set; }

    }
}
