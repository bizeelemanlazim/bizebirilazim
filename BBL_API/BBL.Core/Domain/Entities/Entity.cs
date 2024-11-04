using System.ComponentModel.DataAnnotations;

namespace BBL.Core.Domain.Entities
{
    public abstract class EntityBase : EntityBase<int>, IEntity<int> { }

    public abstract class EntityBase<TPrimaryKey> : IEntity<TPrimaryKey>
    {
        [Key]
        public virtual TPrimaryKey Id { get; set; }
        public DateTime CreatedDate { get; set; }

        public DateTime? ModifiedDate { get; set; } = null;
        public string CreatedUserId { get; set; } = null!;
        public string? ModifiedUserId { get; set; }

        public override string ToString() => $"[{GetType().Name} {Id}]";
    }
}