using BBL.Core.Models.API.Base;
using BBL.Core.Models.API.Employee;
using BBL.Core.Utilities.Results;
using Microsoft.AspNetCore.Http;
using IResult = BBL.Core.Utilities.Results.IResult;

namespace BBL.Business.Abstract.API
{
    public interface IEmployeeService
    {
        #region Employee Process

        public Task<IResult> AddUser(AddEmployeeUserModel addEmployeeUser);
        public ApiResult<DetailEmployeeUserModel> GetUserDetail();
        public Task<ApiResult> UpdateUser(EditEmployeeUserModel editEmployeeUser);

        #endregion

        #region Ad Process
        
        public Task<ApiResult<DetailEmployeeAdAndOrderSummaryCount>> DetailAdAndOrderSummary(OrderSkipTakeReq req,DetailEmployeeAdAndOrderSummaryFilter filter);
        public Task<ApiResult<ApplyForAJobListDetailEmployeeAdAndOrderSummaryCount>> ApplyForAJobList(bool IsActive, OrderSkipTakeReq req);
        public Task<ApiResult> ApplyForAJob(int adId);
        public Task<ApiResult> ApplyForAJobDelete(int adId);

        #endregion

        #region WorkExperience Process

        public Task<ApiResult> AddWorkExperience(AddWorkExperienceModel addWorkExperienceModel);
        public ApiResult<List<DetailWorkExperienceModel>> GetAllDetailWorkExperience();
        public Task<ApiResult> EditWorkExperience(BaseWorkExperienceModel editWorkExperienceModel, int id);
        public ApiResult DeleteWorkExperience(int id);

        #endregion

        #region EducationInformation Process

        public Task<ApiResult> AddEducationInformation(AddEducationInformationModel addEducationInformation);
        public ApiResult<List<DetailEducationInformationModel>> GetAllDetailEducationInformation();
        public Task<ApiResult> EditEducationInformation(BaseEducationInformationModel editEducationInformation, int id);
        public ApiResult DeleteEducationInformation(int id);

        #endregion

        #region SkillInformation Process

        public Task<ApiResult> AddSkillInformation(AddSkillInformationModel addSkillInformationModel);
        public ApiResult<List<DetailSkillInformationModel>> GetAllDetailSkillInformation();
        public Task<ApiResult> EditSkillInformation(EditSkillInformationModel editSkillInformationModel);
        public ApiResult DeleteSkillInformation(int id);

        #endregion

        #region Employee Image

        public Task<ApiResult> AddEmployeeUserImage(IFormFile file);
        public ApiResult GetUserImage();
        Task<ApiResult> DeleteUserImage();

        #endregion

        #region Certificate Information Process

        public Task<ApiResult> AddCertificateInformation(AddCertificateInformationModel addCertificateInformationModel);
        public ApiResult<List<DetailCertificateInformationModel>> GetAllDetailCertificateInformation();
        public Task<ApiResult> EditCertificateInformation(BaseCertificateInformationModel editCertificateInformationModel, int id);
        public Task<ApiResult> DeleteCertificateInformation(int id);

        #endregion

        #region Ability Information Process

        public Task<ApiResult> AddAbilityInformation(AddAbilityInformationModel addAbilityInformationModel);
        public ApiResult<List<DetailAbilityInformationModel>> GetAllDetailAbilityInformation();
        public Task<ApiResult> EditAbilityInformation(BaseAbilityInformationModel1 editAbilityInformationModel, int id);
        public Task<ApiResult> DeleteAbilityInformation(int id);

        #endregion

        #region Social Media Information Process

        public Task<ApiResult> AddSocialMediaInformation(AddSocialMediaInformationModel addSocialMediaInformationModel);
        public ApiResult<DetailSocialMediaInformationModel> GetDetailSocialMediaInformation();
        public Task<ApiResult> EditSocialMediaInformation(BaseSocialMediaInformationModel editSocialMediaInformationModel, int id);

        #endregion

        #region Bank And Personal Informations

        public Task<ApiResult> AddBankAndPersonalInformation(AddBankAndPersonalInformationModel addBankAndPersonalInformationModel);
        public ApiResult<DetailBankAndPersonalInformationModel> GetDetailBankAndPersonalInformation();
        public Task<ApiResult> EditBankAndPersonalInformation(BaseBankAndPersonalInformationModel editBankAndPersonalInformationModel, int id);

        #endregion

        #region Disabled Status Process

        Task<ApiResult> AddDisabledStatus(AddDisabledStatusModel addDisabledStatusModel);

        Task<ApiResult> EditDisabledStatus(BaseDisabledStatusModel editDisabledStatusModel, int id);
        ApiResult<DetailDisabledStatusModel> GetAllDetailDisabledStatus();
        Task<ApiResult> DeleteDisabledStatus(int id);

        #endregion

        #region Rating
        Task<ApiResult<List<EmployeeRatingResponse>>> GetEmployerRating(SkipTakeReq req);
        Task<ApiResult<List<EmployeeRatingResponse>>> GetMyRating(SkipTakeReq req);
        Task<ApiResult> AddRating(EmployeeAddRatingModel req);
        Task<ApiResult> EditRating(EmployeeEditRatingModel req, int ratingId);
        #endregion

        #region CV
        Task<ApiResult<GetCVinfoResponse>> GetCVinfo(int employeeId);
        #endregion
        #region Report
        Task<ApiResult<EmployeeReport>> Report();
        #endregion
    }
}