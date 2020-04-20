using System.ComponentModel.DataAnnotations;
namespace BSAF.Models
{

    public class NeedTool
    {
        public int ID { get; set; }

        public int BeneficiaryID { get; set; }

        [Required]
        public string ToolCode { get; set; }

        public string Other { get; set; }
    }
}
