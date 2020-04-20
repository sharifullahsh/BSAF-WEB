using System.ComponentModel.DataAnnotations;
namespace BSAF.Models
{

    public class LivelihoodEmpNeed
    {
        public int ID { get; set; }

        [Required]
        public string NeedCode { get; set; }

        public int BeneficiaryID { get; set; }
    }
}
