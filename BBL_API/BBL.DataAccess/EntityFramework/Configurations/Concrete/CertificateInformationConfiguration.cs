using BBL.Core.Domain.Configuration;
using BBL.Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BBL.DataAccess.EntityFramework.Configurations.Concrete
{
    public class CertificateInformationConfiguration : BaseEntityTypeConfiguration<CertificateInformation, int>
    {
        public override void Configure(EntityTypeBuilder<CertificateInformation> builder)
        {
            builder.Property(x => x.EmployeeId)
                .IsRequired();

            builder.Property(x => x.CertificateName)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(x => x.CertificationInstitution)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(x => x.StartDate)
                .IsRequired();

            builder.Property(x => x.Description)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(x => x.IsDeleted)
                .IsRequired()
                .HasDefaultValue(false);

            builder.HasOne(x => x.Employee)
                .WithMany(x => x.CertificateInformations)
                .HasForeignKey(x => x.EmployeeId)
                .HasConstraintName("FK_CertificateInformations_Employee")
                .OnDelete(DeleteBehavior.Restrict);

            base.Configure(builder);
        }
    }
}