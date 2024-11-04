using BBL.Core.Domain.Entities;

namespace BBL.Entities.Concrete
{
    public class CompanyType : EntityBase<int>, IEntity, ISoftDelete
    {
        public string CompanyName { get; set; }
        public bool IsDeleted { get; set; }
    }
}
