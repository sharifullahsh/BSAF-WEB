using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BSAFWebApi.Dtos
{
    public class IndividualDto
    {
        public int IndividualID { get; set; }

        public int? BeneficiaryID { get; set; }

        public string Name { get; set; }

        public string DrName { get; set; }

        public string FName { get; set; }

        public string DrFName { get; set; }

        public string GenderCode { get; set; }

        public string Gender { get; set; }

        public string MaritalStatusCode { get; set; }

        public string MaritalStatus { get; set; }

        public int? Age { get; set; }

        public string IDTypeCode { get; set; }

        public string IDType { get; set; }

        public string IDNo { get; set; }

        public string RelationshipCode { get; set; }

        public string Relationship { get; set; }

        public string ContactNumber { get; set; }
    }

}
