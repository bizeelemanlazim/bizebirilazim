using BBL.Core.Domain.Configuration;
using BBL.Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BBL.DataAccess.EntityFramework.Configurations.Concrete
{
    public class CompanyTypeConfiguration : BaseEntityTypeConfiguration<CompanyType, int>
    {
        public override void Configure(EntityTypeBuilder<CompanyType> builder)
        {
            builder.Property(x => x.CompanyName)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(x => x.IsDeleted)
                .IsRequired()
                .HasDefaultValue(false);

            base.Configure(builder);
        }
    }
}