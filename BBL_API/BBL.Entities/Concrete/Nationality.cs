using BBL.Core.Domain.Entities;

namespace BBL.Entities.Concrete
{
    public class Nationality : EntityBase<int>, IEntity, ISoftDelete
    {
        public Nationality()
        {
        }

        public string Name { get; set; }
        public string? Description { get; set; }
        public bool IsDeleted { get; set; }
    }
}