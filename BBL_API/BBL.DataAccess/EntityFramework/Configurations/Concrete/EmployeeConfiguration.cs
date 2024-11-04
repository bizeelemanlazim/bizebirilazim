using BBL.Core.Domain.Configuration;
using BBL.Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BBL.DataAccess.EntityFramework.Configurations.Concrete
{
    public class EmployeeConfiguration : BaseEntityTypeConfiguration<Employee, int>
    {
        public override void Configure(EntityTypeBuilder<Employee> builder)
        {
            builder.Property(x => x.AspNetUserId)
                .IsRequired()

                .HasMaxLength(450);

            builder.Property(x => x.CityId)
                .IsRequired(false);

            builder.Property(x => x.DistrictId)
                .IsRequired(false);

            builder.Property(x => x.GenderId)
                .IsRequired(false);

            builder.Property(x => x.MaritalStatusId)
                .IsRequired(false);

            builder.Property(x => x.DrivingLicenceId)
                .IsRequired(false);

            builder.Property(x => x.NationalityId)
                .IsRequired(false);

            builder.Property(t => t.FirstName)

                .HasMaxLength(50);

            builder.Property(t => t.LastName)

                .HasMaxLength(50);

            builder.Property(t => t.Email)

                .HasMaxLength(100);

            builder.Property(t => t.PhoneNumber)

                .HasMaxLength(10);

            builder.Property(t => t.SecondPhoneNumber)

                .HasMaxLength(10);

            builder.Property(x => x.BirthDate)
                ;

            builder.Property(x => x.Address)
                .HasMaxLength(200);

            builder.Property(x => x.ImageName)

                .HasMaxLength(100);

            builder.Property(x => x.IsDeleted)
                .IsRequired()
                .HasDefaultValue(0);

            builder.HasOne(t => t.ApplicationUser)
                .WithMany(t => t.Employees)
                .HasForeignKey(d => d.AspNetUserId)
                .HasConstraintName("FK_Employees_ApplicationUser")
                .OnDelete(DeleteBehavior.Restrict);

            base.Configure(builder);


        }
    }
}
