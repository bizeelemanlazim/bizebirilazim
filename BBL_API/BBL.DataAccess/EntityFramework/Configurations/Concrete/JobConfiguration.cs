using BBL.Core.Domain.Configuration;
using BBL.Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BBL.DataAccess.EntityFramework.Configurations.Concrete
{
    public class JobConfiguration : BaseEntityTypeConfiguration<Job, int>
    {
        public override void Configure(EntityTypeBuilder<Job> builder)
        {
            builder.Property(x => x.JobCode)
                 .IsRequired()
                 .HasMaxLength(200);

            builder.Property(x => x.JobName)
                .IsRequired()
                .HasMaxLength(300);

            base.Configure(builder);

        }
    }
}