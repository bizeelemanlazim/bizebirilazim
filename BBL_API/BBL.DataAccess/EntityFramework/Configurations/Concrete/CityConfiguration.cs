using BBL.Core.Domain.Configuration;
using BBL.Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BBL.DataAccess.EntityFramework.Configurations.Concrete
{
    public class CityConfiguration : BaseEntityTypeConfiguration<City, int>
    {
        public override void Configure(EntityTypeBuilder<City> builder)
        {
            builder.Property(x => x.CityName)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(x => x.IsDeleted)
                .IsRequired()
                .HasDefaultValue(false);

            base.Configure(builder);

        }
    }
}