using BBL.Core.Domain.Repositories;
using BBL.DataAccess.EntityFramework.Base;
using BBL.DataAccess.EntityFramework.Context;
using BBL.Entities.Concrete;
using BBL.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace BBL.DataAccess.EntityFramework.UnityOfWork
{
    public class UowBBL : IUowBBL
    {
        public BBLContext _dbContext { get; }

        public UowBBL(BBLContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<ApplicationRole> IdentityRoles => _dbContext.Roles.AsQueryable();

        public IQueryable<IdentityUserRole<string>> IdentityUserRoles => _dbContext.UserRoles.AsQueryable();

        public IQueryable<ApplicationUser> Users => _dbContext.Users.AsQueryable();

        public IQueryable<IdentityUserClaim<string>> IdentityUserClaim => _dbContext.UserClaims.AsQueryable();

        #region ENTITTES

        public IRepositoryBase<Employer> Employer => new EfRepositoryBase<Employer>(_dbContext);
        public IRepositoryBase<CompanyType> CompanyType => new EfRepositoryBase<CompanyType>(_dbContext);
        public IRepositoryBase<City> City => new EfRepositoryBase<City>(_dbContext);
        public IRepositoryBase<District> District => new EfRepositoryBase<District>(_dbContext);
        public IRepositoryBase<Nationality> Nationality => new EfRepositoryBase<Nationality>(_dbContext);
        public IRepositoryBase<DrivingLicence> DrivingLicence => new EfRepositoryBase<DrivingLicence>(_dbContext);
        public IRepositoryBase<Employee> Employee => new EfRepositoryBase<Employee>(_dbContext);
        public IRepositoryBase<Job> Job => new EfRepositoryBase<Job>(_dbContext);
        public IRepositoryBase<WorkExperience> WorkExperience => new EfRepositoryBase<WorkExperience>(_dbContext);
        public IRepositoryBase<EducationInformation> EducationInformation => new EfRepositoryBase<EducationInformation>(_dbContext);
        public IRepositoryBase<SkillInformation> SkillInformation => new EfRepositoryBase<SkillInformation>(_dbContext);
        public IRepositoryBase<DisabledStatus> DisabledStatus => new EfRepositoryBase<DisabledStatus>(_dbContext);
        public IRepositoryBase<CertificateInformation> CertificateInformation => new EfRepositoryBase<CertificateInformation>(_dbContext);
        public IRepositoryBase<AbilityInformation> AbilityInformation => new EfRepositoryBase<AbilityInformation>(_dbContext);

        public IRepositoryBase<SocialMediaInformation> SocialMediaInformation => new EfRepositoryBase<SocialMediaInformation>(_dbContext);
        public IRepositoryBase<BankAndPersonalInformation> BankAndPersonalInformation => new EfRepositoryBase<BankAndPersonalInformation>(_dbContext);
        public IRepositoryBase<Ad> Ad => new EfRepositoryBase<Ad>(_dbContext);
        public IRepositoryBase<OrderSummary> OrderSummary => new EfRepositoryBase<OrderSummary>(_dbContext);
        public IRepositoryBase<EmployerPriceRate> EmployerPriceRate => new EfRepositoryBase<EmployerPriceRate>(_dbContext);
        public IRepositoryBase<Application> Application => new EfRepositoryBase<Application>(_dbContext);
        public IRepositoryBase<ApplyForJob> ApplyForJob => new EfRepositoryBase<ApplyForJob>(_dbContext);

        public IRepositoryBase<Rating> Rating => new EfRepositoryBase<Rating>(_dbContext);

        #endregion

        #region STORED PROCEDURE

        #endregion

        public void ExecuteSqlRaw(string sqlCommand)
        {
            _dbContext.Database.ExecuteSqlRaw(sqlCommand);
        }

        public IDbContextTransaction BeginTransaction()
        {
            return _dbContext.Database.BeginTransaction();
        }

        public int Commit()
        {
            return _dbContext.SaveChanges();
        }

        public async Task<int> CommitAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }

        public void Dispose()
        {
            _dbContext.Dispose();
        }
    }
}