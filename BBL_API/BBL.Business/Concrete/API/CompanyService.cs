using AutoMapper;
using BBL.Business.Abstract.API;
using BBL.Business.Concrete.Base;
using BBL.Business.ValidationRules.FluentValidation.API.CompanyValidation;
using BBL.Core.Aspects.Autofac.Transaction;
using BBL.Core.Aspects.Autofac.Validation;
using BBL.Core.Models.API.Company;
using BBL.Core.Utilities.Results;
using BBL.DataAccess.EntityFramework.UnityOfWork;
using BBL.Entities.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace BBL.Business.Concrete.API
{
    public class CompanyService : BBLServiceBase, ICompanyService
    {
        private readonly IMapper _mapper;

        public CompanyService(
            IUowBBL repository,
            IHttpContextAccessor httpContextAccessor,
            UserManager<ApplicationUser> userManager,
            IMapper mapper) : base(repository, httpContextAccessor, userManager)
        {
            _mapper = mapper;
        }

        [ValidationAspect(typeof(AddCompanyValidator))]
        [TransactionScopeAspectAsync]
        public async Task<ApiResult> AddCompany(AddCompanyModel addCompany)
        {
            var aspNetUserId = AspNetUserId;
            await _repository.CompanyType.InsertAsync(new Entities.Concrete.CompanyType
            {
                CompanyName = addCompany.CompanyName,
                CreatedDate = DateTime.Now,
                CreatedUserId = aspNetUserId
            });

            return new ApiResult();
        }

        public ApiResult<List<DetailCompanyModel>> GetCompany()
        {
            var model = (from data in _repository.CompanyType.GetAll()
                         where !data.IsDeleted
                         select new DetailCompanyModel
                         {
                             Id = data.Id,
                             CompanyName = data.CompanyName,
                         }).ToList();

            return new ApiResult<List<DetailCompanyModel>> { Data = model };
        }

        [ValidationAspect(typeof(EditCompanyValidator))]
        [TransactionScopeAspectAsync]
        public async Task<ApiResult> EditCompany(BaseCompanyModel editCompany, int id)
        {
            var aspNetUserId = AspNetUserId;

            var data = _repository.CompanyType.Where(x => x.Id == id).FirstOrDefault();

            if (data != null)
            {
                data.CompanyName = editCompany.CompanyName;
                data.ModifiedUserId = aspNetUserId;
                data.ModifiedDate = DateTime.Now;
                
                _repository.CompanyType.Update(data);

                _repository.Commit();

                return new ApiResult();
            }
            else
                return new ApiResult() { IsSuccess = false, Message = "Belirtilen Id numarasında değer yoktur!" };
        }

        public ApiResult DeleteCompany(int id)
        {
            var aspNetUserId = AspNetUserId;

            var data = _repository.CompanyType.Where(x => x.Id == id).FirstOrDefault();

            if (data != null)
            {
                data.IsDeleted = true;
                data.ModifiedDate = DateTime.Now;
                data.ModifiedUserId = aspNetUserId;

                _repository.CompanyType.Update(data);

                _repository.Commit();

                return new ApiResult();
            }
            else
                return new ApiResult() { IsSuccess = false, Message = "Belirtilen Id numarasında değer yoktur!" };
        }
    }
}