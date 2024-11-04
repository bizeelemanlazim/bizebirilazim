using BBL.Core.Enums;
using BBL.Core.Models.API.Ad;
using BBL.Core.Models.API.Base;
using BBL.Core.Utilities.Results;

namespace BBL.Business.Abstract.API
{
    public interface IAdService
    {
        public Task<ApiResult> AddAd(InsertAdAndOrderSummary insertAdAndOrderSummary);

        public Task<ApiResult> UpdateAd(EditAdAndOrderSummary editAdAndOrderSummary);
        public Task<ApiResult> UpdateAdActive(EditAddActive editAddActive);

        public Task<PaginationResult<DetailAdAndOrderSummary>> DetailAdAndOrderSummary(JobStatus jobStatus, OrderSkipTakeReq req);
        public Task<ApiResult<DetailAdAndOrderSummary2>> AdAndOrderSummary(int id);

        public Task<ApiResult<EmployeeUserApplyForAJobModelCount>> ApplyForAJobList(bool isActive, int AdId, OrderSkipTakeReq req);
        public Task<ApiResult<EmployeeUserApplyForAJobModel>> FinishForAJobList(int AdId);
        public Task<ApiResult> ApplyForAJob(int id);
        public Task<ApiResult> ApplyForAJobDelete(int id);
        public Task<ApiResult> AdFinish(int AdId);
    }
}
