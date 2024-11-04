using BBL.Core.Domain.Entities;

namespace BBL.Entities.Concrete
{
    public class Application : EntityBase<int>, IEntity
    {
        public int AdId { get; set; }
        public int EmployeeId { get; set; }
        public bool? IsApproval { get; set; }
        public DateTime? CreatedApprovalDate { get; set; }
        public string? CreatedApprovalUserId { get; set; }

        public Ad Ad { get; set; }
        public Employee Employee { get; set; }
    }
}