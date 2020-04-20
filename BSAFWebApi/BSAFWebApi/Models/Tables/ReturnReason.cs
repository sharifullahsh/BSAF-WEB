
using System.ComponentModel.DataAnnotations;
namespace BSAF.Models
{
    public class ReturnReason
    {
        [Key]
        public int ID { get; set; }

        public int BeneficiaryID { get; set; }

        public string ReasonCode { get; set; }

        public string Other { get; set; }
    }
}
