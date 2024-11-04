using BBL.Core.Domain.Configuration;
using BBL.Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BBL.DataAccess.EntityFramework.Configurations.Concrete
{
    public class OrderSummaryConfiguration : BaseEntityTypeConfiguration<OrderSummary, int>
    {
        public override void Configure(EntityTypeBuilder<OrderSummary> builder)
        {
            builder.Property(x => x.AdId)
      .IsRequired()
      ;

            builder.Property(x => x.JobName)
                .IsRequired()
                .HasMaxLength(300);

            builder.Property(x => x.OperationTime)
                .IsRequired()

                .HasMaxLength(100);

            builder.Property(x => x.Location)
                .IsRequired(false)
                .HasMaxLength(200);

            builder.Property(x => x.ProgressPayment)
                .IsRequired();

            builder.Property(x => x.LegalDeduction)
                .IsRequired()
                ;

            builder.Property(x => x.CommissionFee)
                .IsRequired()
                ;

            builder.Property(x => x.TotalFees)
                .IsRequired()
                ;

            builder.Property(x => x.EmployeeId);

            builder.HasOne(x => x.Ad)
                .WithOne(x => x.OrderSummary)
                .HasForeignKey<OrderSummary>(x => x.AdId)
                .HasConstraintName("FK_OrderSummary_Ad")
                .OnDelete(DeleteBehavior.Restrict);

            base.Configure(builder);

        }
    }
}