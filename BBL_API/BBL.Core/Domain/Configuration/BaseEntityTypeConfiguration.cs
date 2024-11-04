using BBL.Core.Constants;
using BBL.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BBL.Core.Domain.Configuration
{
    public abstract class BaseEntityTypeConfiguration<TBase, T> : IEntityTypeConfiguration<TBase>
     where TBase : EntityBase<T>, IEntity
    {
        public virtual void Configure(EntityTypeBuilder<TBase> builder)
        {
            builder.Property(x => x.CreatedDate)
      .IsRequired()
      .HasDefaultValueSql("CURRENT_DATE");
            builder.Property(x => x.CreatedDate);

            builder.Property(x => x.CreatedUserId)
                .IsRequired(false)
            .HasMaxLength(450)
              .HasDefaultValue(ApplicationSettings.SystemId);

            builder.Property(x => x.CreatedUserId);

            builder.Property(x => x.ModifiedDate)
                .IsRequired(false)
                ;
            builder.Property(x => x.ModifiedDate).HasDefaultValue(null);

            builder.Property(x => x.ModifiedUserId)
                .IsRequired(false)
            .HasMaxLength(450)
                ;
            builder.Property(x => x.ModifiedUserId).HasDefaultValue(null);

        }
    }
}
