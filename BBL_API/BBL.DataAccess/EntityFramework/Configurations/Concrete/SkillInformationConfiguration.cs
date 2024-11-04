using BBL.Core.Domain.Configuration;
using BBL.Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BBL.DataAccess.EntityFramework.Configurations.Concrete
{
    public class SkillInformationConfiguration : BaseEntityTypeConfiguration<SkillInformation, int>
    {
        public override void Configure(EntityTypeBuilder<SkillInformation> builder)
        {
            builder.Property(x => x.SkillName)
    .IsRequired()

    .HasMaxLength(100); 
            builder.Property(x => x.Description)
                .IsRequired(false)
                .HasMaxLength(200); 

            builder.Property(x => x.Rating)
                .IsRequired(); 
            builder.Property(x => x.IsDeleted)
                .IsRequired()
                .HasDefaultValue(false); 

            builder.HasOne(t => t.Employee)
                  .WithMany(t => t.SkillInformations)
                  .HasForeignKey(d => d.EmployeeId)
                  .HasConstraintName("FK_SkillInformations_Employee")
                  .OnDelete(DeleteBehavior.Restrict);

            base.Configure(builder);

        }
    }
}
