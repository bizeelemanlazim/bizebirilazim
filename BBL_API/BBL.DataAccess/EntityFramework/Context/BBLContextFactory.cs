using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace BBL.DataAccess.EntityFramework.Context
{
    public class BBLContextFactory : IDesignTimeDbContextFactory<BBLContext>
    {
        public BBLContext CreateDbContext(string[] args)
        {
            // var basePath = Path.Combine(Directory.GetCurrentDirectory(), "../../../BBL.API");

            // IConfigurationRoot configuration = new ConfigurationBuilder()
            //     .SetBasePath(basePath)
            //     .AddJsonFile("appsettings.json")
            //     .Build();

            // IConfigurationRoot configuration = new ConfigurationBuilder()
            //     .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            //     .AddJsonFile("appsettings.json")
            //     .Build();

            var builder = new DbContextOptionsBuilder<BBLContext>();
            string connectionString = "Host=bizebirilazim.cvqsmkecwa6j.eu-central-1.rds.amazonaws.com;Port=5432;Database=bizebirilazim;Username=bizebirilazim;Password=kHM32ZMEy44Hhq5PJexN;";
            //configuration.GetConnectionString("BBLConnection")
            builder.UseNpgsql(connectionString);

            return new BBLContext(builder.Options);
        }
    }
}
