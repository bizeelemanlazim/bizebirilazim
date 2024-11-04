using BBL.Core.Domain.Configuration;
using BBL.Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BBL.DataAccess.EntityFramework.Configurations.Concrete
{
    public class EducationInformationConfiguration : BaseEntityTypeConfiguration<EducationInformation, int>
    {
        public override void Configure(EntityTypeBuilder<EducationInformation> builder)
        {
            builder.Property(x => x.EmployeeId)
      .IsRequired()
      ;

            builder.Property(x => x.School)
                .IsRequired()

                .HasMaxLength(100);

            builder.Property(x => x.Section)
                .IsRequired()

                .HasMaxLength(100);

            builder.Property(x => x.StartDate)
                .IsRequired()
                ;

            builder.Property(x => x.EndDate)
                .IsRequired(false)
                ;

            builder.Property(x => x.IsContinue)
                .IsRequired()
                .HasDefaultValue(false);

            builder.Property(x => x.IsBreak)
                .IsRequired()
                .HasDefaultValue(false);

            builder.Property(x => x.IsDeleted)
                .IsRequired()
                .HasDefaultValue(false);

            builder.HasOne(x => x.Employee)
                .WithMany(x => x.EducationInformations)
                .HasForeignKey(x => x.EmployeeId)
                .HasConstraintName("FK_EducationInformations_Employee")
                .OnDelete(DeleteBehavior.Restrict);

            base.Configure(builder);

        }
    }
}