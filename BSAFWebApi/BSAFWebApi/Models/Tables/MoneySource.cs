namespace BSAF.Models
{
     public class MoneySource
    {
        public int ID { get; set; }

        public int? BeneficiaryID { get; set; }

        public string MoneySourceCode { get; set; }

        public string MoneySourceOther { get; set; }
    }
}
