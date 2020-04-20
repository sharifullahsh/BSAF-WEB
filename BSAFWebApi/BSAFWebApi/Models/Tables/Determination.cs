namespace BSAF.Models
{

    public  class Determination
    {
        public int ID { get; set; }

        public int? BeneficiaryID { get; set; }

        public string DeterminationCode { get; set; }

        public string AnswerCode { get; set; }

        public string Other { get; set; }
    }
}
