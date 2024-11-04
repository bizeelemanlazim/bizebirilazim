using BBL.Core.Domain.Configuration;
using BBL.Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BBL.DataAccess.EntityFramework.Configurations.Concrete
{
    public class EmployerPriceRateConfiguration : BaseEntityTypeConfiguration<EmployerPriceRate, int>
    {
        public override void Configure(EntityTypeBuilder<EmployerPriceRate> builder)
        {
            builder.Property(x => x.CommissionFee)
     .HasDefaultValue(3.0);

            builder.Property(x => x.LegalDeduction)
                .HasDefaultValue(18.0);

            builder.HasOne(x => x.Employer)
                .WithOne(x => x.EmployerPriceRate)
                .HasForeignKey<EmployerPriceRate>(x => x.EmployerId)
                .HasConstraintName("FK_EmployerPriceRate_Employer")
                .OnDelete(DeleteBehavior.Restrict);

            base.Configure(builder);

        }
    }
}