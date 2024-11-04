using BBL.Core.Domain.Entities;

namespace BBL.Entities.Concrete
{
    public class District : EntityBase<int>, IEntity, ISoftDelete
    {
        public District()
        {
        }

        public int CityId { get; set; }
        public string DistrictName { get; set; }
        public bool IsDeleted { get; set; }

        public City City { get; set; }
    }
}
