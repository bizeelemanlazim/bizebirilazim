using BBL.Core.Domain.Entities;

namespace BBL.Entities.Concrete
{
    public class CertificateInformation : EntityBase<int>, IEntity, ISoftDelete
    {
        public int EmployeeId { get; set; }
        public string CertificateName { get; set; }
        public string CertificationInstitution { get; set; }
        public DateTime StartDate { get; set; }
        public string Description { get; set; }
        public bool IsDeleted { get; set; }

        public Employee Employee { get; set; }
    }
}