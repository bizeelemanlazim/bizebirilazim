namespace BBL.Core.Domain.Entities
{
    public interface IEntity : IEntity<int>
    {

    }

    public interface IEntity<TPrimaryKey>
    {
        TPrimaryKey Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string CreatedUserId { get; set; }
        public string ModifiedUserId { get; set; }
    }
}