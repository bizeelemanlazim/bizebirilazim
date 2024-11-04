using BBL.Core.Domain.Configuration;
using BBL.Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BBL.DataAccess.EntityFramework.Configurations.Concrete
{
    public class DrivingLicenceConfiguration : BaseEntityTypeConfiguration<DrivingLicence, int>
    {
        public override void Configure(EntityTypeBuilder<DrivingLicence> builder)
        {
            builder.Property(x => x.Name)
     .IsRequired()

     .HasMaxLength(50);

            builder.Property(x => x.IsDeleted)
                .IsRequired()
                .HasDefaultValue(false);

            base.Configure(builder);

        }
    }
}