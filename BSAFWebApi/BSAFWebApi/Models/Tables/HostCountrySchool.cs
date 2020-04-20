using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BSAF.Models
{

    [Table("HostCountrySchool")]
    public  class HostCountrySchool
    {
        public int ID { get; set; }

        public int BeneficiaryID { get; set; }

        [Required]
        public string SchoolTypeCode { get; set; }
    }
}
