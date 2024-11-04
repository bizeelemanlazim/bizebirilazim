using BBL.Core.Domain.Configuration;
using BBL.Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BBL.DataAccess.EntityFramework.Configurations.Concrete
{
    public class WorkExperienceConfiguration : BaseEntityTypeConfiguration<WorkExperience, int>
    {
        public override void Configure(EntityTypeBuilder<WorkExperience> builder)
        {
            builder.Property(x => x.EmployeeId)
          .IsRequired()
          ;

            builder.Property(x => x.JobId)
                .IsRequired();

            builder.Property(x => x.WorkingTypeId)
                .IsRequired();

            builder.Property(x => x.IsWorking)
                .HasDefaultValue(false);

            builder.Property(x => x.StartDate)
                .IsRequired()
                ;

            builder.Property(x => x.EndDate)
                ;

            builder.Property(x => x.WorkingCompany)
                .IsRequired()
                .HasMaxLength(300);

            builder.Property(x => x.IsDeleted)
                .IsRequired()
                .HasDefaultValue(false);

            builder.HasOne(x => x.Employee)
                .WithMany(x => x.WorkExperiences)
                .HasForeignKey(x => x.EmployeeId)
                .HasConstraintName("FK_WorkExperiences_Employee")
                .OnDelete(DeleteBehavior.Restrict);

            base.Configure(builder);
        }
    }
}