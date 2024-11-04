using BBL.Core.Domain.Configuration;
using BBL.Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BBL.DataAccess.EntityFramework.Configurations.Concrete
{
    public class ApplicationConfiguration : BaseEntityTypeConfiguration<Application, int>
    {
        public override void Configure(EntityTypeBuilder<Application> builder)
        {
            builder.Property(x => x.AdId)
                .IsRequired();

            builder.Property(x => x.EmployeeId)
                .IsRequired();

            builder.Property(x => x.IsApproval)
                .IsRequired(false)
                .HasDefaultValue(null);

            builder.Property(x => x.CreatedApprovalDate)
                .IsRequired(false)
                .HasDefaultValue(null);

            builder.Property(x => x.CreatedApprovalUserId)
                .IsRequired(false)
                .HasMaxLength(450)
                .HasDefaultValue(null);

            base.Configure(builder);
        }
    }
}