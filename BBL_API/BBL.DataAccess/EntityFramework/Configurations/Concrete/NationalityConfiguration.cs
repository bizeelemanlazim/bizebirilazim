using BBL.Core.Domain.Configuration;
using BBL.Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BBL.DataAccess.EntityFramework.Configurations.Concrete
{
    public class NationalityConfiguration : BaseEntityTypeConfiguration<Nationality, int>
    {
        public override void Configure(EntityTypeBuilder<Nationality> builder)
        {
            builder.Property(x => x.Name)
    .IsRequired()

    .HasMaxLength(100);

            builder.Property(x => x.Description)
                .IsRequired(false)
                .HasMaxLength(300);

            builder.Property(x => x.IsDeleted)
                .IsRequired()
                .HasDefaultValue(false);

            base.Configure(builder);


        }
    }
}