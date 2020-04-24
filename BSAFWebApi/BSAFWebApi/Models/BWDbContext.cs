using BSAF.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BSAFWebApi.Models
{
    //public class BWDbContext : IdentityDbContext<ApplicationUser, IdentityRole, string>
    public class BWDbContext: IdentityDbContext<ApplicationUser>
    {
        public BWDbContext(DbContextOptions<BWDbContext> options) : base(options)
        {

        }

        public virtual DbSet<Beneficiary> Beneficiaries { get; set; }
        public virtual DbSet<BenefitedFromOrg> BenefitedFromOrgs { get; set; }
        public virtual DbSet<BorderCrossingPoint> BorderCrossingPoints { get; set; }
        public virtual DbSet<BroughtItem> BroughtItems { get; set; }
        public virtual DbSet<Determination> Determinations { get; set; }
        public virtual DbSet<District> Districts { get; set; }
        public virtual DbSet<HostCountryDistrict> HostCountryDistricts { get; set; }
        public virtual DbSet<HostCountryProvince> HostCountryProvinces { get; set; }
        public virtual DbSet<HostCountrySchool> HostCountrySchools { get; set; }
        public virtual DbSet<Individual> Individuals { get; set; }
        public virtual DbSet<LivelihoodEmpNeed> LivelihoodEmpNeeds { get; set; }
        public virtual DbSet<LookupType> LookupTypes { get; set; }
        public virtual DbSet<LookupValue> LookupValues { get; set; }
        public virtual DbSet<MainConcern> MainConcerns { get; set; }
        public virtual DbSet<MoneySource> MoneySources { get; set; }
        public virtual DbSet<NeedTool> NeedTools { get; set; }
        public virtual DbSet<PostArrivalNeed> PostArrivalNeeds { get; set; }
        public virtual DbSet<Province> Provinces { get; set; }
        public virtual DbSet<PSN> PSNs { get; set; }
        public virtual DbSet<Transportation> Transportations { get; set; }
        public virtual DbSet<ReturnReason> ReturnReasons { get; set; }
    }
}
