using BBL.Core.Domain.Entities;

namespace BBL.Entities.Concrete
{
    public class SkillInformation : EntityBase<int>, IEntity, ISoftDelete
    {
        public int EmployeeId { get; set; }
        public string SkillName { get; set; }
        public string? Description { get; set; }
        public int Rating { get; set; }
        public bool IsDeleted { get; set; }

        public Employee Employee { get; set; }
    }
}