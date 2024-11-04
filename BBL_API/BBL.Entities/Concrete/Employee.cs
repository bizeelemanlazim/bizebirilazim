using BBL.Core.Domain.Entities;
using BBL.Entities.Identity;

namespace BBL.Entities.Concrete
{
    public class Employee : EntityBase<int>, IEntity, ISoftDelete
    {
        public Employee()
        {
            this.WorkExperiences = new HashSet<WorkExperience>();
            this.EducationInformations = new HashSet<EducationInformation>();
            this.SkillInformations = new HashSet<SkillInformation>();
            this.CertificateInformations = new HashSet<CertificateInformation>();
            this.AbilityInformations = new HashSet<AbilityInformation>();
            this.SocialMediaInformations = new HashSet<SocialMediaInformation>();
            this.BankAndPersonalInformations = new HashSet<BankAndPersonalInformation>();
            this.Applications = new HashSet<Application>();
            this.ApplyForJobs = new HashSet<ApplyForJob>();
        }

        public string AspNetUserId { get; set; }
        public int? CityId { get; set; }
        public int? DistrictId { get; set; }
        public int? GenderId { get; set; }
        public int? MaritalStatusId { get; set; }
        public int? DrivingLicenceId { get; set; }
        public int? NationalityId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? SecondPhoneNumber { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? PlaceOfBirth { get; set; }
        public string? Address { get; set; }
        public string? ImageName { get; set; }
        public bool IsDeleted { get; set; } = false;

        public ApplicationUser ApplicationUser { get; set; }
        public DisabledStatus DisabledStatus { get; set; }

        public string GetFormattedName()
        {
            return $"{FirstName} {LastName}";
        }

        public ICollection<SocialMediaInformation> SocialMediaInformations { get; set; }
        public ICollection<WorkExperience> WorkExperiences { get; set; }
        public ICollection<EducationInformation> EducationInformations { get; set; }
        public ICollection<SkillInformation> SkillInformations { get; set; }
        public ICollection<CertificateInformation> CertificateInformations { get; set; }
        public ICollection<AbilityInformation> AbilityInformations { get; set; }

        public ICollection<BankAndPersonalInformation> BankAndPersonalInformations { get; set; }
        public ICollection<Application> Applications { get; set; }
        public ICollection<ApplyForJob> ApplyForJobs { get; set; }
    }
}