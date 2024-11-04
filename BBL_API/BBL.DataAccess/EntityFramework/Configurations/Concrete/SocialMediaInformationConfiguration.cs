using BBL.Core.Domain.Configuration;
using BBL.Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BBL.DataAccess.EntityFramework.Configurations.Concrete
{
    public class SocialMediaInformationConfiguration : BaseEntityTypeConfiguration<SocialMediaInformation, int>
    {
        public override void Configure(EntityTypeBuilder<SocialMediaInformation> builder)
        {
            builder.Property(x => x.EmployeeId)
     .IsRequired();

            builder.Property(x => x.YoutubeLink)

                .HasMaxLength(100);

            builder.Property(x => x.LinkedinLink)

                .HasMaxLength(100);

            builder.Property(x => x.InstagramLink)

                .HasMaxLength(100);

            builder.Property(x => x.FacebookLink)

                .HasMaxLength(100);

            builder.Property(x => x.TwitterLink)

                .HasMaxLength(100);

            builder.HasOne(x => x.Employee)
                .WithMany(x => x.SocialMediaInformations)
                .HasForeignKey(x => x.EmployeeId)
                .HasConstraintName("FK_SocialMediaInformations_Employee")
                .OnDelete(DeleteBehavior.Restrict);

            base.Configure(builder);

        }
    }
}