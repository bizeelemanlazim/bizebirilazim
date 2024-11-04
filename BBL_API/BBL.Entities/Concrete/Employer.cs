using BBL.Core.Domain.Entities;
using BBL.Entities.Identity;

namespace BBL.Entities.Concrete
{
    public class Employer : EntityBase<int>, IEntity, ISoftDelete
    {
        public Employer()
        {
            this.Ads = new HashSet<Ad>();
            this.ApplyForJobs = new HashSet<ApplyForJob>();
        }

        public string AspNetUserId { get; set; }
        public int? CompanyTypeId { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? CommercialTitle { get; set; }
        public string? PhoneNumber { get; set; }
        public string? TaxNumber { get; set; }
        public string? TaxOffice { get; set; }
        public string? RecordNumber { get; set; }
        public string? MersisNumber { get; set; }
        public string? Address { get; set; }
        public int? CityId { get; set; }
        public int? DistrictId { get; set; }
        public string? FoundedDate { get; set; }
        public int? EmployeesCount { get; set; }
        public string? ActivityFields { get; set; }
        public decimal? CapitalPrice { get; set; }
        public string? Description { get; set; }
        public string? ImageName { get; set; }
        public bool IsDeleted { get; set; } = false;

        public string GetFormattedName()
        {
            return $"{FirstName} {LastName}";
        }

        public ApplicationUser ApplicationUser { get; set; }
        public EmployerPriceRate EmployerPriceRate { get; set; }

        public ICollection<Ad> Ads { get; set; }
        public ICollection<ApplyForJob> ApplyForJobs { get; set; }
    }
}