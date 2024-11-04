using BBL.Core.Domain.Configuration;
using BBL.Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BBL.DataAccess.EntityFramework.Configurations.Concrete
{
    public class DisabledStatusConfiguration : BaseEntityTypeConfiguration<DisabledStatus, int>
    {
        public override void Configure(EntityTypeBuilder<DisabledStatus> builder)
        {
            builder.Property(x => x.EmployeeId)
     .IsRequired();

            builder.Property(x => x.CategoryId)
                .IsRequired();

            builder.Property(x => x.Percentage)
                .IsRequired();

            builder.Property(x => x.IsHealthReport)
                .IsRequired()
                .HasDefaultValue(false);

            builder.Property(x => x.IsChronicHealth)
                .IsRequired()
                .HasDefaultValue(false);

            builder.Property(x => x.ChronicDescription)
                .IsRequired(false)
                .HasMaxLength(200);

            builder.Property(x => x.IsContinuousMedicationUse)
                .IsRequired()
                .HasDefaultValue(false);

            builder.Property(x => x.ContinuousMedicationUseDescription)
                .IsRequired(false)
                .HasMaxLength(200);

            builder.Property(x => x.IsLossOfConsciousness)
                .IsRequired()
                .HasDefaultValue(false);

            builder.Property(x => x.IsInfectiousDisease)
                .IsRequired();

            builder.Property(x => x.InfectiousDiseaseDescription)
                .IsRequired()
                .HasDefaultValue(false);

            builder.Property(x => x.LossOfConsciousnessDescription)
                .IsRequired(false)
                .HasMaxLength(200);

            builder.Property(x => x.IsDeleted)
                .IsRequired()
                .HasDefaultValue(false);

            builder.HasOne(x => x.Employee)
                .WithOne(x => x.DisabledStatus)
                .HasForeignKey<DisabledStatus>(x => x.EmployeeId)
                .HasConstraintName("FK_DisabledStatus_Employee")
                .OnDelete(DeleteBehavior.Restrict);

            base.Configure(builder);

        }
    }
}