using BBL.Core.Constants;
using BBL.Entities.Concrete;
using BBL.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Microsoft.EntityFrameworkCore
{
    public static class ModelBuilderExtensions
    {
        public static void SeedRole(this ModelBuilder builder)
        {
            builder.Entity<ApplicationRole>()
                .HasData(
                new ApplicationRole
                {
                    Id = ApplicationSettings.SuperAdmin,
                    Name = "SuperAdmin",
                    NormalizedName = "SUPERADMIN"
                },
                new ApplicationRole
                {
                    Id = ApplicationSettings.Employer,
                    Name = "Employer",
                    NormalizedName = "EMPLOYER"
                },
                new ApplicationRole
                {
                    Id = ApplicationSettings.Employee,
                    Name = "Employee",
                    NormalizedName = "EMPLOYEE"
                });

        }

        public static void SeedSystemUserAndRole(this ModelBuilder builder)
        {
            ApplicationUser user = new()
            {
                Id = ApplicationSettings.SystemId,
                UserName = "system@bizebirilazim.com",
                NormalizedUserName = "SYSTEM@BIZEBIRILAZIM.COM",
                Email = "system@bizebirilazim.com",
                NormalizedEmail = "SYSTEM@BIZEBIRILAZIM.COM".ToUpper(),
                EmailConfirmed = true,
                RefreshToken = Guid.NewGuid().ToString(),
                IsDeleted = false,
                PasswordHash = "AQAAAAEAACcQAAAAEIxZO1AKW/+KF3nC8ewS+HeYrLwv9+NH3RtR4hrreIblApbl58xMhs1cwd1uQEt/SA=="
            };

            builder.Entity<ApplicationUser>().HasData(user);

            builder.Entity<IdentityUserRole<string>>().HasData(
                new IdentityUserRole<string>
                {
                    RoleId = ApplicationSettings.SuperAdmin,
                    UserId = ApplicationSettings.SystemId,
                });
        }

        public static void SeedCompanyType(this ModelBuilder builder)
        {
            builder.Entity<CompanyType>()
                .HasData(
                new CompanyType
                {
                    Id = 1,
                    CompanyName = "Tip 1",
                },
                new CompanyType
                {
                    Id = 2,
                    CompanyName = "Tip 2",
                });
        }
    }
}