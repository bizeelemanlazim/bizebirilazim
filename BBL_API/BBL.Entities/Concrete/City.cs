using BBL.Core.Domain.Entities;

namespace BBL.Entities.Concrete
{
    public class City : EntityBase<int>, IEntity, ISoftDelete
    {
        public City()
        {
            this.Districts = new HashSet<District>();
        }

        public string CityName { get; set; }
        public bool IsDeleted { get; set; }

        public ICollection<District> Districts { get; set; }
    }
}
