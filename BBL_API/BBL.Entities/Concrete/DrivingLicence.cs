using BBL.Core.Domain.Entities;

namespace BBL.Entities.Concrete
{
    public class DrivingLicence : EntityBase<int>, IEntity, ISoftDelete
    {
        public DrivingLicence()
        {
        }

        public string Name { get; set; }
        public bool IsDeleted { get; set; }

    }
}
