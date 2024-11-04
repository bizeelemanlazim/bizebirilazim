using BBL.Core.Domain.Configuration;
using BBL.Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BBL.DataAccess.EntityFramework.Configurations.Concrete
{
    public class EmployerConfiguration : BaseEntityTypeConfiguration<Employer, int>
    {
        public override void Configure(EntityTypeBuilder<Employer> builder)
        {
            builder.Property(x => x.AspNetUserId)

      .HasMaxLength(450)
      .IsRequired();

            builder.Property(x => x.CompanyTypeId)
                .IsRequired(false);

            builder.Property(t => t.Email)

                .HasMaxLength(100);

            builder.Property(t => t.FirstName)

                .HasMaxLength(50);

            builder.Property(t => t.LastName)

                .HasMaxLength(50);

            builder.Property(t => t.CommercialTitle)

                .HasMaxLength(50);

            builder.Property(t => t.PhoneNumber)

                .HasMaxLength(10);

            builder.Property(t => t.TaxNumber)

                .HasMaxLength(10);

            builder.Property(t => t.TaxOffice)

                .HasMaxLength(50);

            builder.Property(t => t.RecordNumber)

                .HasMaxLength(16);

            builder.Property(t => t.MersisNumber)

                .HasMaxLength(16);

            builder.Property(t => t.Address)
                .HasMaxLength(200);

            builder.Property(x => x.CityId)
                .IsRequired(false);

            builder.Property(x => x.DistrictId)
                .IsRequired(false);

            builder.Property(t => t.FoundedDate)
                ;

            builder.Property(x => x.EmployeesCount)
                .IsRequired(false);

            builder.Property(t => t.ActivityFields)
                .HasMaxLength(200);

            builder.Property(t => t.CapitalPrice);

            builder.Property(x => x.Description)
                .IsRequired(false)
                .HasMaxLength(300);

            builder.Property(x => x.IsDeleted)
                .IsRequired()
                .HasDefaultValue(0);

            builder.HasOne(t => t.ApplicationUser)
                .WithMany(t => t.Employers)
                .HasForeignKey(d => d.AspNetUserId)
                .HasConstraintName("FK_Employer_ApplicationUser")
                .OnDelete(DeleteBehavior.Restrict);

            base.Configure(builder);

        }
    }
}