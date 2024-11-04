using BBL.Core.Models.API.Company;
using BBL.Core.Utilities.Results;

namespace BBL.Business.Abstract.API
{
    public interface ICompanyService
    {
        public Task<ApiResult> AddCompany(AddCompanyModel addCompany);
        public ApiResult<List<DetailCompanyModel>> GetCompany();
        public Task<ApiResult> EditCompany(BaseCompanyModel addCompany, int id);
        public ApiResult DeleteCompany(int id);
    }
}
