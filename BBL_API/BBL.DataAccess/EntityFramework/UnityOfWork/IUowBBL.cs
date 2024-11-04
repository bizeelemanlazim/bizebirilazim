using BBL.Core.Domain.Repositories;
using BBL.Entities.Concrete;
using BBL.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Storage;

namespace BBL.DataAccess.EntityFramework.UnityOfWork
{
    public interface IUowBBL : IDisposable
    {
        IDbContextTransaction BeginTransaction();

        IQueryable<ApplicationRole> IdentityRoles { get; }
        IQueryable<ApplicationUser> Users { get; }
        IQueryable<IdentityUserRole<string>> IdentityUserRoles { get; }
        IQueryable<IdentityUserClaim<string>> IdentityUserClaim { get; }

        #region ENTITIES

        IRepositoryBase<Employer> Employer { get; }
        IRepositoryBase<CompanyType> CompanyType { get; }
        IRepositoryBase<City> City { get; }
        IRepositoryBase<District> District { get; }
        IRepositoryBase<Nationality> Nationality { get; }
        IRepositoryBase<DrivingLicence> DrivingLicence { get; }
        IRepositoryBase<Employee> Employee { get; }
        IRepositoryBase<Job> Job { get; }
        IRepositoryBase<WorkExperience> WorkExperience { get; }
        IRepositoryBase<EducationInformation> EducationInformation { get; }
        IRepositoryBase<SkillInformation> SkillInformation { get; }
        IRepositoryBase<DisabledStatus> DisabledStatus { get; }
        IRepositoryBase<CertificateInformation> CertificateInformation { get; }
        IRepositoryBase<AbilityInformation> AbilityInformation { get; }
        IRepositoryBase<ApplyForJob> ApplyForJob { get; }
        IRepositoryBase<SocialMediaInformation> SocialMediaInformation { get; }
        IRepositoryBase<BankAndPersonalInformation> BankAndPersonalInformation { get; }
        IRepositoryBase<Ad> Ad { get; }
        IRepositoryBase<OrderSummary> OrderSummary { get; }
        IRepositoryBase<EmployerPriceRate> EmployerPriceRate { get; }
        IRepositoryBase<Application> Application { get; }
        IRepositoryBase<Rating> Rating { get; }


        #endregion

        #region VIEW

        #endregion

        #region STOREDPROCEDURE

        #endregion

        void ExecuteSqlRaw(string sqlCommand);
        Task<int> CommitAsync();
        int Commit();
    }
}
