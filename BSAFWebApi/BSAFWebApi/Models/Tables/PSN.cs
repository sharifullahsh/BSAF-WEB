using System.ComponentModel.DataAnnotations.Schema;

namespace BSAF.Models
{

    [Table("PSN")]
    public class PSN
    {
        public int ID { get; set; }

        public int? BeneficiaryID { get; set; }

        public string PSNCode { get; set; }

        public string PSNOther { get; set; }
    }
}
