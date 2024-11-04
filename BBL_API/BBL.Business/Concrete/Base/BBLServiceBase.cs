using BBL.Core.Constants;
using BBL.DataAccess.EntityFramework.UnityOfWork;
using BBL.Entities.Concrete;
using BBL.Entities.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;


namespace BBL.Business.Concrete.Base
{
    public class BBLServiceBase : IDisposable
    {
        protected readonly IUowBBL _repository;
        protected readonly IHttpContextAccessor _httpContextAccessor;
        protected readonly UserManager<ApplicationUser> _userManager;
        private bool disposedValue;

        public BBLServiceBase(
            IUowBBL repository,
            IHttpContextAccessor httpContextAccessor,
            UserManager<ApplicationUser> userManager)
        {
            _repository = repository;
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
        }

        public string AspNetUserId
        {
            get
            {
                var id = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypesBBL.AspUserId).Value;
                return id;
            }
        }

        public Employer? EmployerData
        {
            get
            {
                var aspNetUserId = this.AspNetUserId;

                return _repository.Employer.FirstOrDefault(x => x.AspNetUserId == aspNetUserId);
            }
        }

        public Employee? EmployeeData
        {
            get
            {
                var aspNetUserId = this.AspNetUserId;

                var employee = _repository.Employee.FirstOrDefault(x => x.AspNetUserId == aspNetUserId);
                return employee;
            }
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects)
                    _repository?.Dispose();
                    _userManager?.Dispose();
                }

                // TODO: free unmanaged resources (unmanaged objects) and override finalizer
                // TODO: set large fields to null
                disposedValue = true;
            }
        }

        // // TODO: override finalizer only if 'Dispose(bool disposing)' has code to free unmanaged resources
        // ~BBLServiceBase()
        // {
        //     // Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method
        //     Dispose(disposing: false);
        // }

        public void Dispose()
        {
            // Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
    }
}