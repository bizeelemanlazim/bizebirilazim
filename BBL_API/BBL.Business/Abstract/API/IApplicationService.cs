using BBL.Core.Models.API.Application;
using BBL.Core.Utilities.Results;

namespace BBL.Business.Abstract.API
{
    public interface IApplicationService
    {
        public Task<ApiResult> UpdateAd(EditApplicationModel editApplicationModel);

        public Task<ApiResult<List<DetailApplicationModel>>> DetailApplicationModel(bool isActiveAd);
    }
}