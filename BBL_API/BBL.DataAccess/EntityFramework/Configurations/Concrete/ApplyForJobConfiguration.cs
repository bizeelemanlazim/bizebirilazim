using BBL.Core.Domain.Configuration;
using BBL.Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BBL.DataAccess.EntityFramework.Configurations.Concrete
{
    public class ApplyForJobConfiguration : BaseEntityTypeConfiguration<ApplyForJob, int>
    {
        public override void Configure(EntityTypeBuilder<ApplyForJob> builder)
        {
            builder.Property(x => x.AdId)
       .IsRequired()
       ;

            builder.Property(x => x.EmployeeId)
                .IsRequired();

            builder.Property(x => x.IsDeleted)
                .IsRequired()
                .HasDefaultValue(false);

            builder.Property(x => x.IsApply)
                .IsRequired()
                .HasDefaultValue(false);

            builder.Property(x => x.IsFinish)
                .IsRequired()
                .HasDefaultValue(false);

            builder.HasOne(x => x.Ad)
                .WithMany(x => x.ApplyForJobs)
                .HasForeignKey(x => x.AdId)
                .HasConstraintName("FK_ApplyForJobs_Ad")
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Employer)
                .WithMany(x => x.ApplyForJobs)
                .HasForeignKey(x => x.EmployerId)
                .HasConstraintName("FK_ApplyForJobs_Employer")
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Employee)
                .WithMany(x => x.ApplyForJobs)
                .HasForeignKey(x => x.EmployeeId)
                .HasConstraintName("FK_ApplyForJobs_Employee")
                .OnDelete(DeleteBehavior.Restrict);

            base.Configure(builder);
        }
    }
}
