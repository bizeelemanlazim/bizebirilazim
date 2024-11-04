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
    public class RatingConfiguration : BaseEntityTypeConfiguration<Rating, int>
    {
        public override void Configure(EntityTypeBuilder<Rating> builder)
        {
            builder.Property(x => x.ApplyForJobId)
     .IsRequired();

            builder.Property(x => x.IsEmployer)
                .IsRequired()
                .HasDefaultValue(false);

            builder.Property(x => x.Rate)
                .IsRequired();
            builder.Property(t => t.Comment)
                .HasMaxLength(500);

            builder.Property(x => x.IsDeleted)
                .IsRequired()
                .HasDefaultValue(false);

            base.Configure(builder);


        }

    }
}
