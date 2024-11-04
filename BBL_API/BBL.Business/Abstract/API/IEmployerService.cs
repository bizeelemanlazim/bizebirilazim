using BBL.Core.Models.API.Base;
using BBL.Core.Models.API.Employer;
using BBL.Core.Utilities.Results;
using Microsoft.AspNetCore.Http;

namespace BBL.Business.Abstract.API
{
    public interface IEmployerService
    {
        #region Employer

        public Task<Core.Utilities.Results.IResult> AddUser(AddEmployerUserModel addEmployerUser);
        public Task<ApiResult<DetailEmployerUserModel>> GetUserDetail();
        public Task<ApiResult> UpdateUser(EditEmployerUserModel updateEmployerUser);

        #endregion

        #region Employer Price Rate

        Task<ApiResult<EmployerPriceRate>> GetUserPriceRate();

        #endregion

        #region Employer Image

        Task<ApiResult> AddEmployerUserImage(IFormFile file);
        ApiResult GetUserImage();
        Task<ApiResult> DeleteUserImage();
        #endregion

        #region Rating

        Task<ApiResult<List<EmployerRatingResponse>>> GetEmployeeRating(SkipTakeReq req);
        Task<ApiResult<List<EmployerRatingResponse>>> GetMyRating(SkipTakeReq req);
        Task<ApiResult> AddRating(EmployerAddRatingModel req);
        Task<ApiResult> EditRating(EmployerEditRatingModel req, int ratingId);
        #endregion

        #region Report
        Task<ApiResult<EmployerReport>> Report(int id);
        #endregion
    }
}