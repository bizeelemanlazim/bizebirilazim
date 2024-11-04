using BBL.Core.Constants;
using BBL.DataAccess.EntityFramework.Configurations.Concrete;
using BBL.DataAccess.EntityFramework.Configurations.Identity;
using BBL.Entities.Concrete;
using BBL.Entities.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace BBL.DataAccess.EntityFramework.Context
{
    public class BBLContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        //Required for Consoles
        public BBLContext()
        {

        }

        //Required for API and WEB
        public BBLContext(DbContextOptions<BBLContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // IConfigurationRoot configuration;

            // if (Environment.GetEnvironmentVariable(EnvironmentVariableKeys.ASPNETCORE_ENVIRONMENT) == null)
            // {
            //     configuration = new ConfigurationBuilder()
            //         .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            //         .AddJsonFile("appsettings.json")
            //         .Build();
            // }
            // else
            // {
            //     configuration = new ConfigurationBuilder()
            //         .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            //         .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable(EnvironmentVariableKeys.ASPNETCORE_ENVIRONMENT)}.json")
            //         .Build();
            // }

            // optionsBuilder.UseNpgsql(configuration.GetConnectionString("BBLConnection"), sqlServerOptions => sqlServerOptions.CommandTimeout(60));
        }

        #region VIEW
        #endregion

        #region STOREDPROCEDURE
        #endregion

        #region ENTITIES

        public DbSet<Employer> Employers { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<CompanyType> CompanyTypes { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<Nationality> Nationalities { get; set; }
        public DbSet<DrivingLicence> DrivingLicences { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<WorkExperience> WorkExperiences { get; set; }
        public DbSet<EducationInformation> EducationInformations { get; set; }
        public DbSet<SkillInformation> SkillInformations { get; set; }
        public DbSet<DisabledStatus> DisabledStatuses { get; set; }
        public DbSet<CertificateInformation> CertificateInformations { get; set; }
        public DbSet<AbilityInformation> AbilityInformations { get; set; }
        public DbSet<ApplyForJob> ApplyForJob { get; set; }

        public DbSet<SocialMediaInformation> SocialMediaInformations { get; set; }
        public DbSet<BankAndPersonalInformation> BankAndPersonalInformations { get; set; }
        public DbSet<Ad> Ads { get; set; }
        public DbSet<OrderSummary> OrderSummaries { get; set; }
        public DbSet<EmployerPriceRate> EmployerPricesRate { get; set; }
        public DbSet<Application> Applications { get; set; }
        public DbSet<Rating> Rating { get; set; }


        #endregion

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            #region Identity Configurations

            builder.ApplyConfiguration(new ApplicationRoleConfiguration());
            builder.ApplyConfiguration(new ApplicationUserConfiguration());

            #endregion

            #region Entity Configurations

            builder.ApplyConfiguration(new EmployerConfiguration());
            builder.ApplyConfiguration(new EmployeeConfiguration());
            builder.ApplyConfiguration(new CompanyTypeConfiguration());
            builder.ApplyConfiguration(new CityConfiguration());
            builder.ApplyConfiguration(new DistrictConfiguration());
            builder.ApplyConfiguration(new NationalityConfiguration());
            builder.ApplyConfiguration(new DrivingLicenceConfiguration());
            builder.ApplyConfiguration(new JobConfiguration());
            builder.ApplyConfiguration(new WorkExperienceConfiguration());
            builder.ApplyConfiguration(new EducationInformationConfiguration());
            builder.ApplyConfiguration(new DisabledStatusConfiguration());
            builder.ApplyConfiguration(new CertificateInformationConfiguration());
            builder.ApplyConfiguration(new AbilityInformationConfiguration());
            builder.ApplyConfiguration(new SocialMediaInformationConfiguration());
            builder.ApplyConfiguration(new BankAndPersonalInformationConfiguration());
            builder.ApplyConfiguration(new EmployerPriceRateConfiguration());
            builder.ApplyConfiguration(new AdConfiguration());
            builder.ApplyConfiguration(new OrderSummaryConfiguration());
            builder.ApplyConfiguration(new ApplyForJobConfiguration());
            builder.ApplyConfiguration(new RatingConfiguration());

            #endregion
        }
    }
}