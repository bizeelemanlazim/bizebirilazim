using BBL.Core.Domain.Configuration;
using BBL.Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BBL.DataAccess.EntityFramework.Configurations.Concrete
{
    public class DistrictConfiguration : BaseEntityTypeConfiguration<District, int>
    {
        public override void Configure(EntityTypeBuilder<District> builder)
        {
            builder.Property(x => x.CityId)
       .IsRequired()
       ;

            builder.Property(x => x.DistrictName)
                .IsRequired()

                .HasMaxLength(100);

            builder.Property(x => x.IsDeleted)
                .IsRequired()
                .HasDefaultValue(false);

            builder.HasOne(x => x.City)
                .WithMany(x => x.Districts)
                .HasForeignKey(x => x.CityId)
                .HasConstraintName("FK_Districts_City")
                .OnDelete(DeleteBehavior.Restrict);

            base.Configure(builder);

        }
    }
}