using BBL.Core.Domain.Entities;

namespace BBL.Entities.Concrete
{
    public class Ad : EntityBase<int>, IEntity
    {
        public Ad()
        {
            this.ApplyForJobs = new HashSet<ApplyForJob>();
        }
        public int EmployerId { get; set; }
        public int JobId { get; set; }
        public int? SectorId { get; set; }
        public byte WorkType { get; set; } // iş tipi evten, ofiste
        public string? Gender { get; set; }
        public TimeSpan WorkingTime { get; set; }//Mesai Suresi
        public DateTime WorkStartDate { get; set; }
        public DateTime WorkEndDate { get; set; }
        public TimeSpan WorkingStartTime { get; set; }//Mesai Baslangic Saati
        public string? Attribute { get; set; } //Nitelikler
        public string? Criterion { get; set; }
        public bool IsMyAddress { get; set; }
        public int? CityId { get; set; } //
        public int? EducationId { get; set; }
        public int? ExperienceId { get; set; }
        public int? DistrictId { get; set; } //
        public string? Address { get; set; }
        public decimal Price { get; set; }
        public bool IsMyRecruitment { get; set; }
        public bool IsActive { get; set; }

        public Employer Employer { get; set; }
        public OrderSummary OrderSummary { get; set; }
        public Job Job { get; set; }

        public ICollection<Application> Applications { get; set; }
        public ICollection<ApplyForJob> ApplyForJobs { get; set; }
    }
}