using BBL.Core.Domain.Configuration;
using BBL.Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BBL.DataAccess.EntityFramework.Configurations.Concrete
{
    public class BankAndPersonalInformationConfiguration : BaseEntityTypeConfiguration<BankAndPersonalInformation, int>
    {
        public override void Configure(EntityTypeBuilder<BankAndPersonalInformation> builder)
        {
            builder.Property(x => x.EmployeeId)
    .IsRequired();

            builder.Property(x => x.BankName)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.BranchName)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.BranchCode)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.AccountName)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.IBAN)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.TCIdentityNumber)
                .IsRequired()
                .HasMaxLength(11);

            builder.Property(x => x.TCSerialNumber)
                .IsRequired()
                .HasMaxLength(9);

            builder.Property(x => x.ExpiryDate)
                .IsRequired();

            builder.Property(x => x.FatherName)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(x => x.MotherName)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(x => x.IssuingAuthority)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.SettlementBarcodeNumber)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.CriminalRecordBarcodeNumber)
                .IsRequired()
                .HasMaxLength(100);

            builder.HasOne(x => x.Employee)
                .WithMany(x => x.BankAndPersonalInformations)
                .HasForeignKey(x => x.EmployeeId)
                .HasConstraintName("FK_BankAndPersonalInformations_Employee")
                .OnDelete(DeleteBehavior.Restrict);

            base.Configure(builder);
        }
    }
}