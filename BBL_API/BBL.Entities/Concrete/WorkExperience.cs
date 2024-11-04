using BBL.Core.Domain.Entities;

namespace BBL.Entities.Concrete
{
    public class WorkExperience : EntityBase<int>, IEntity, ISoftDelete
    {
        public int EmployeeId { get; set; }
        public int JobId { get; set; }
        public int WorkingTypeId { get; set; }
        public bool IsWorking { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string WorkingCompany { get; set; }
        public string Description { get; set; }
        public bool IsDeleted { get; set; }

        public Employee Employee { get; set; }
    }
}
