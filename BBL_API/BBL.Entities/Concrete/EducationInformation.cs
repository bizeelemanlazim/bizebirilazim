using BBL.Core.Domain.Entities;

namespace BBL.Entities.Concrete
{
    public class EducationInformation : EntityBase<int>, IEntity, ISoftDelete
    {
        public int EmployeeId { get; set; }
        public string School { get; set; }
        public string Section { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? Description { get; set; }
        public bool IsContinue { get; set; }
        public bool IsBreak { get; set; }
        public bool IsDeleted { get; set; }

        public Employee Employee { get; set; }
    }
}
