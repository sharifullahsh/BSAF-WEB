
using System.ComponentModel.DataAnnotations;
namespace BSAF.Models
{

    public class MainConcern
    {
        public int ID { get; set; }

        public int BeneficiaryID { get; set; }

        [Required]
        public string ConcernCode { get; set; }

        public string Other { get; set; }
    }
}
