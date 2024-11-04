using BBL.Core.Domain.Entities;

namespace BBL.Entities.Concrete
{
    public class SocialMediaInformation : EntityBase<int>, IEntity
    {
        public int EmployeeId { get; set; }
        public string YoutubeLink { get; set; }
        public string LinkedinLink { get; set; }
        public string InstagramLink { get; set; }
        public string FacebookLink { get; set; }
        public string TwitterLink { get; set; }

        public Employee Employee { get; set; }
    }
}