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
    public class AbilityInformationConfiguration : BaseEntityTypeConfiguration<AbilityInformation, int>
    {
        public override void Configure(EntityTypeBuilder<AbilityInformation> builder)
        {
            builder.Property(x => x.EmployeeId)
                .IsRequired();

            builder.Property(x => x.AbilityId)
                .IsRequired();

            builder.Property(x => x.Degree)
                .IsRequired()
                .HasDefaultValue(0);

            builder.Property(x => x.Description)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(x => x.IsDeleted)
                .IsRequired()
                .HasDefaultValue(false);

            builder.HasOne(x => x.Employee)
                .WithMany(x => x.AbilityInformations)
                .HasForeignKey(x => x.EmployeeId)
                .HasConstraintName("FK_AbilityInformations_Employee")
                .OnDelete(DeleteBehavior.Restrict);

            base.Configure(builder);
        }
    }
}
