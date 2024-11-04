using BBL.Core.Domain.Entities;

namespace BBL.Entities.Concrete
{
    public class Job : EntityBase<int>, IEntity
    {
        public Job()
        {
            this.Ads = new HashSet<Ad>();
        }

        public string JobCode { get; set; }
        public string JobName { get; set; }

        public ICollection<Ad> Ads { get; set; }
    }
}
