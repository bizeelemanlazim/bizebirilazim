using BBL.Core.Domain.Configuration;
using BBL.Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BBL.DataAccess.EntityFramework.Configurations.Concrete
{
    public class AdConfiguration : BaseEntityTypeConfiguration<Ad, int>
    {
        public override void Configure(EntityTypeBuilder<Ad> builder)
        {
            builder.Property(x => x.EmployerId)
    .IsRequired();

            builder.Property(x => x.JobId)
                .IsRequired();

            builder.Property(x => x.SectorId)
                .IsRequired(false);

            builder.Property(x => x.EducationId)
                .IsRequired(false);

            builder.Property(x => x.ExperienceId)
                .IsRequired(false);

            builder.Property(x => x.WorkType)
                .IsRequired();

            builder.Property(x => x.Gender)
                .IsRequired(false)
                .HasMaxLength(300);

            builder.Property(x => x.WorkingTime)
                .IsRequired();

            builder.Property(x => x.WorkStartDate)
                .IsRequired();

            builder.Property(x => x.WorkEndDate)
                .IsRequired()
                ;

            builder.Property(x => x.Attribute)
                .IsRequired(false);

            builder.Property(x => x.IsMyAddress)
                .IsRequired();

            builder.Property(x => x.CityId)
                .IsRequired();

            builder.Property(x => x.DistrictId)
                .IsRequired();

            builder.Property(x => x.Criterion)
                .IsRequired(false)
                .HasMaxLength(300);

            builder.Property(x => x.Address)
                .IsRequired(false)
                .HasMaxLength(300);

            builder.Property(x => x.Price)
                .IsRequired()
                .HasDefaultValue(0);

            builder.Property(x => x.IsMyRecruitment)
                .IsRequired();

            builder.HasOne(x => x.Employer)
                .WithMany(x => x.Ads)
                .HasConstraintName("FK_Ads_Employer")
                .HasForeignKey(x => x.EmployerId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Job)
                .WithMany(x => x.Ads)
                .HasConstraintName("FK_Ads_Job")
                .HasForeignKey(x => x.JobId)
                .OnDelete(DeleteBehavior.Restrict);

            base.Configure(builder);
        }
    }
}