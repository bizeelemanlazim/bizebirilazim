using BBL.Core.Models.API.Base;
using BBL.Core.Models.API.Utilities;
using BBL.Core.Utilities.Results;

namespace BBL.Business.Abstract.API
{
    public interface IUtilitiesService
    {
        ApiResult<List<CityModel>> GetAllCity();

        ApiResult<List<DistrictModel>> GetAllDistrict(int cityId);

        ApiResult<List<NationalityModel>> GetAllNationality();

        ApiResult<List<DrivingLicenceModel>> GetAllDrivingLicence();

        ApiResult<List<JobModel>> GetAllJob(SearchSkipTakeReq req);

        ApiResult<JobModel> FindJob(int id);

        ApiResult<List<UserTypeModel>> GetAllUserType();

        ApiResult<List<MaritalStatusTypeModel>> GetAllMaritalStatusType();

        ApiResult<List<GenderTypeModel>> GetAllGenderType();

        ApiResult<List<WorkingTypeModel>> GetAllWorkingType();

        ApiResult<List<BaseUtilitiesModel>> GetAllSectorType();

        ApiResult<List<BaseUtilitiesModel>> GetAllEducationType();

        ApiResult<List<BaseUtilitiesModel>> GetAllExperienceType();

        ApiResult<List<BaseUtilitiesModel>> GetAllCompanyType();

        ApiResult<List<BaseUtilitiesModel>> GetAllFundType();

        ApiResult<List<BaseUtilitiesModel>> GetAllCriteriaType(SearchSkipTakeReq req);
        ApiResult<List<BaseUtilitiesModel>> GetAllAbilityType(SearchSkipTakeReq req);

    }
}
