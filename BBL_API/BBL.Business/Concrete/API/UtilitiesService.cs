using System.Linq;
using BBL.Business.Abstract.API;
using BBL.Business.Concrete.Base;
using BBL.Core.Middleware.Caching;
using BBL.Core.Models.API.Base;
using BBL.Core.Models.API.Utilities;
using BBL.Core.Utilities.Results;
using BBL.DataAccess.EntityFramework.UnityOfWork;
using BBL.Entities.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace BBL.Business.Concrete.API
{
    public class UtilitiesService : BBLServiceBase, IUtilitiesService
    {
        private ICacheManager _cacheManager;

        public UtilitiesService(IUowBBL repository,
        IHttpContextAccessor httpContextAccessor,
            UserManager<ApplicationUser> userManager,
            ICacheManager cacheManager) : base(repository, httpContextAccessor, userManager)
        {
            _cacheManager = cacheManager;
        }

        public ApiResult<List<CityModel>> GetAllCity()
        {
            var isAllReadyExit = _cacheManager.IsAdd(CacheKeys.GetAllCity);

            var data = new List<CityModel>();

            if (isAllReadyExit)
                data = _cacheManager.Get<List<CityModel>>(CacheKeys.GetAllCity);

            else
            {
                data = (from city in _repository.City.GetAll()
                        where !city.IsDeleted
                        select new CityModel
                        {
                            Id = city.Id,
                            Name = city.CityName
                        }).OrderBy(x => x.Name).ToList();

                _cacheManager.Add(CacheKeys.GetAllCity, data);
            }

            return new ApiResult<List<CityModel>> { Data = data };
        }

        public ApiResult<List<DistrictModel>> GetAllDistrict(int cityId)
        {
            var _cacheKey = cityId + CacheKeys.GetAllDistrict;

            if (cityId != 0)
            {
                var data = new List<DistrictModel>();

                var isAllReadyExit = _cacheManager.IsAdd(_cacheKey);

                if (isAllReadyExit)
                    data = _cacheManager.Get<List<DistrictModel>>(_cacheKey);
                else
                {
                    data = (from district in _repository.District.GetAll()
                            where district.CityId == cityId
                            select new DistrictModel
                            {
                                CityId = district.CityId,
                                Id = district.Id,
                                Name = district.DistrictName,
                            }).OrderBy(x => x.Name).ToList();

                    _cacheManager.Add(_cacheKey, data, 1);
                }

                return new ApiResult<List<DistrictModel>> { Data = data };
            }
            else
                return new ApiResult<List<DistrictModel>> { IsSuccess = false, Message = $"{cityId} numaralı veri yok!" };
        }

        public ApiResult<List<DrivingLicenceModel>> GetAllDrivingLicence()
        {
            var result = new List<DrivingLicenceModel>();

            var isAllReadyExit = _cacheManager.IsAdd(CacheKeys.GetAllDrivingLicence);

            if (isAllReadyExit)
                result = _cacheManager.Get<List<DrivingLicenceModel>>(CacheKeys.GetAllDrivingLicence);
            else
            {
                result = (from data in _repository.DrivingLicence.GetAll()
                          where !data.IsDeleted
                          select new DrivingLicenceModel
                          {
                              Id = data.Id,
                              Name = data.Name
                          }).OrderBy(x => x.Name).ToList();

                _cacheManager.Add(CacheKeys.GetAllDrivingLicence, result);
            }

            return new ApiResult<List<DrivingLicenceModel>> { Data = result };
        }

        public ApiResult<List<NationalityModel>> GetAllNationality()
        {
            var result = new List<NationalityModel>();

            var isAllReadyExit = _cacheManager.IsAdd(CacheKeys.GetAllNationality);

            if (isAllReadyExit)
                result = _cacheManager.Get<List<NationalityModel>>(CacheKeys.GetAllNationality);
            else
            {
                result = (from nationality in _repository.Nationality.GetAll()
                          where !nationality.IsDeleted
                          select new NationalityModel
                          {
                              Id = nationality.Id,
                              Name = nationality.Name,
                          }).OrderBy(x => x.Name).ToList();

                _cacheManager.Add(CacheKeys.GetAllNationality, result);
            }

            return new ApiResult<List<NationalityModel>> { Data = result };
        }

        public ApiResult<List<JobModel>> GetAllJob(SearchSkipTakeReq req)
        {
            var model = new List<JobModel>();

            var cacheKey = (req.Search ?? "") + "-" + req.Skip + "-" + req.Take + "-" + CacheKeys.GetAllJob;
            var isAllReadyExit = _cacheManager.IsAdd(cacheKey);

            if (isAllReadyExit) model = _cacheManager.Get<List<JobModel>>(cacheKey);

            else
            {
                var query = (from data in _repository.Job.GetAll()
                         select new JobModel
                         {
                             Id = data.Id,
                             JobCode = data.JobCode,
                             Name = data.JobName,
                         });
                if (!String.IsNullOrEmpty(req.Search))
                {
                    var lowerSeach = req.Search.ToLowerInvariant();
                    var upperSeach = req.Search.ToUpperInvariant();
                    query = query.Where(x => x.Name.Contains(lowerSeach) || x.Name.Contains(upperSeach));
                }

                model = query
                            .OrderBy(x => x.Name)
                            .Skip(req.Skip)
                            .Take(req.Take)
                            .ToList();

                _cacheManager.Add(cacheKey, model);
            }

            return new ApiResult<List<JobModel>> { Data = model };
        }

        public ApiResult<JobModel> FindJob(int id)
        {
            var model = _repository.Job.Where(x => x.Id == id).Select(x => new JobModel { Id = id, JobCode = x.JobCode, Name = x.JobName}).FirstOrDefault();
            return new ApiResult<JobModel>() { Data = model, IsSuccess = true };
        }

        public ApiResult<List<UserTypeModel>> GetAllUserType()
        {
            var result = new List<UserTypeModel>();

            var isAllReadyExit = _cacheManager.IsAdd(CacheKeys.GetAllUserType);

            if (isAllReadyExit)
                result = _cacheManager.Get<List<UserTypeModel>>(CacheKeys.GetAllUserType);
            else
            {
                result = (from data in EnumExtensions.EnumDictionary<Core.Enums.UserType>()
                          select new UserTypeModel
                          {
                              Id = data.Key,
                              Name = data.Value
                          }).OrderBy(x => x.Name).ToList();

                _cacheManager.Add(CacheKeys.GetAllUserType, result);
            }

            return new ApiResult<List<UserTypeModel>>() { Data = result };
        }

        public ApiResult<List<MaritalStatusTypeModel>> GetAllMaritalStatusType()
        {
            var result = new List<MaritalStatusTypeModel>();

            var isAllReadyExit = _cacheManager.IsAdd(CacheKeys.GetAllMaritalStatusType);

            if (isAllReadyExit)
                result = _cacheManager.Get<List<MaritalStatusTypeModel>>(CacheKeys.GetAllMaritalStatusType);
            else
            {
                result = (from data in EnumExtensions.EnumDictionary<Core.Enums.MartialStatusType>()
                          select new MaritalStatusTypeModel
                          {
                              Id = data.Key,
                              Name = data.Value
                          }).ToList();

                _cacheManager.Add(CacheKeys.GetAllMaritalStatusType, result);
            }

            return new ApiResult<List<MaritalStatusTypeModel>>() { Data = result };
        }

        public ApiResult<List<GenderTypeModel>> GetAllGenderType()
        {
            var result = new List<GenderTypeModel>();

            var isAllReadyExit = _cacheManager.IsAdd(CacheKeys.GetAllGenderType);

            if (isAllReadyExit)
                result = _cacheManager.Get<List<GenderTypeModel>>(CacheKeys.GetAllGenderType);
            else
            {
                result = (from data in EnumExtensions.EnumDictionary<Core.Enums.GenderType>()
                          select new GenderTypeModel
                          {
                              Id = data.Key,
                              Name = data.Value
                          }).OrderBy(x => x.Name).ToList();

                _cacheManager.Add(CacheKeys.GetAllGenderType, result);
            }

            return new ApiResult<List<GenderTypeModel>>() { Data = result };
        }

        public ApiResult<List<WorkingTypeModel>> GetAllWorkingType()
        {
            var result = new List<WorkingTypeModel>();

            var isAllReady = _cacheManager.IsAdd(CacheKeys.GetAllWorkingType);

            if (isAllReady)
                result = _cacheManager.Get<List<WorkingTypeModel>>(CacheKeys.GetAllWorkingType);

            else
            {
                result = (from data in EnumExtensions.EnumDictionary<Core.Enums.WorkingType>()
                          select new WorkingTypeModel
                          {
                              Id = data.Key,
                              Name = data.Value
                          }).OrderBy(x => x.Name).ToList();

                _cacheManager.Add(CacheKeys.GetAllWorkingType, result);
            }

            return new ApiResult<List<WorkingTypeModel>>() { Data = result };
        }

        public ApiResult<List<BaseUtilitiesModel>> GetAllSectorType()
        {
            var result = new List<BaseUtilitiesModel>();

            var isAllReady = _cacheManager.IsAdd(CacheKeys.GetAllSectorType);

            if (isAllReady)
                result = _cacheManager.Get<List<BaseUtilitiesModel>>(CacheKeys.GetAllSectorType);

            else
            {
                result = (from data in EnumExtensions.EnumDictionary<Core.Enums.SectorType>()
                          select new BaseUtilitiesModel
                          {
                              Id = data.Key,
                              Name = data.Value
                          }).OrderBy(x => x.Name).ToList();

                _cacheManager.Add(CacheKeys.GetAllSectorType, result);
            }

            return new ApiResult<List<BaseUtilitiesModel>>() { Data = result };
        }

        public ApiResult<List<BaseUtilitiesModel>> GetAllEducationType()
        {
            var result = new List<BaseUtilitiesModel>();

            var isAllReady = _cacheManager.IsAdd(CacheKeys.GetAllEducationType);

            if (isAllReady)
                result = _cacheManager.Get<List<BaseUtilitiesModel>>(CacheKeys.GetAllEducationType);

            else
            {
                result = (from data in EnumExtensions.EnumDictionary<Core.Enums.EducationType>()
                          select new BaseUtilitiesModel
                          {
                              Id = data.Key,
                              Name = data.Value
                          }).OrderBy(x => x.Name).ToList();

                _cacheManager.Add(CacheKeys.GetAllEducationType, result);
            }

            return new ApiResult<List<BaseUtilitiesModel>>() { Data = result };
        }

        public ApiResult<List<BaseUtilitiesModel>> GetAllExperienceType()
        {
            var result = new List<BaseUtilitiesModel>();

            var isAllReady = _cacheManager.IsAdd(CacheKeys.GetAllExperienceType);

            if (isAllReady)
                result = _cacheManager.Get<List<BaseUtilitiesModel>>(CacheKeys.GetAllExperienceType);

            else
            {
                result = (from data in EnumExtensions.EnumDictionary<Core.Enums.ExperienceType>()
                          select new BaseUtilitiesModel
                          {
                              Id = data.Key,
                              Name = data.Value
                          }).OrderBy(x => x.Name).ToList();

                _cacheManager.Add(CacheKeys.GetAllExperienceType, result);
            }

            return new ApiResult<List<BaseUtilitiesModel>>() { Data = result };
        }

        public ApiResult<List<BaseUtilitiesModel>> GetAllCompanyType()
        {
            var result = new List<BaseUtilitiesModel>();

            var isAllReady = _cacheManager.IsAdd(CacheKeys.GetAllCompanyType);

            if (isAllReady)
                result = _cacheManager.Get<List<BaseUtilitiesModel>>(CacheKeys.GetAllCompanyType);

            else
            {
                result = (from data in EnumExtensions.EnumDictionary<Core.Enums.CompanyType>()
                          select new BaseUtilitiesModel
                          {
                              Id = data.Key,
                              Name = data.Value
                          }).OrderBy(x => x.Name).ToList();

                _cacheManager.Add(CacheKeys.GetAllCompanyType, result);
            }

            return new ApiResult<List<BaseUtilitiesModel>>() { Data = result };
        }

        public ApiResult<List<BaseUtilitiesModel>> GetAllFundType()
        {
            var result = new List<BaseUtilitiesModel>();

            var isAllReady = _cacheManager.IsAdd(CacheKeys.GetAllFundType);

            if (isAllReady)
                result = _cacheManager.Get<List<BaseUtilitiesModel>>(CacheKeys.GetAllFundType);

            else
            {
                result = (from data in EnumExtensions.EnumDictionary<Core.Enums.FundType>()
                          select new BaseUtilitiesModel
                          {
                              Id = data.Key,
                              Name = data.Value
                          }).OrderBy(x => x.Name).ToList();

                _cacheManager.Add(CacheKeys.GetAllFundType, result);
            }

            return new ApiResult<List<BaseUtilitiesModel>>() { Data = result };
        }

        public ApiResult<List<BaseUtilitiesModel>> GetAllCriteriaType(SearchSkipTakeReq req)
        {
            var model = new List<BaseUtilitiesModel>();

            var cacheKey = (req.Search ?? "") + "-" + req.Skip + "-" + req.Take + "-" + CacheKeys.GetAllCriteriaType;
            var isAllReadyExit = _cacheManager.IsAdd(cacheKey);

            if (isAllReadyExit) model = _cacheManager.Get<List<BaseUtilitiesModel>>(cacheKey);

            else
            {
                var query = (from data in EnumExtensions.EnumDictionary<Core.Enums.CriteriaType>()
                             select new BaseUtilitiesModel
                             {
                                 Id = data.Key,
                                 Name = data.Value
                             });
                if (!String.IsNullOrEmpty(req.Search))
                {
                    var lowerSeach = req.Search.ToLowerInvariant();
                    var upperSeach = req.Search.ToUpperInvariant();
                    query = query.Where(x => x.Name.Contains(lowerSeach) || x.Name.Contains(upperSeach));
                }

                model = query
                            .OrderBy(x => x.Name)
                            .Skip(req.Skip)
                            .Take(req.Take)
                            .ToList();

                _cacheManager.Add(cacheKey, model);
            }

            return new ApiResult<List<BaseUtilitiesModel>> { Data = model };
        }

        public ApiResult<List<BaseUtilitiesModel>> GetAllAbilityType(SearchSkipTakeReq req)
        {
            var model = new List<BaseUtilitiesModel>();

            var cacheKey = (req.Search ?? "") + "-" + req.Skip + "-" + req.Take + "-" + CacheKeys.GetAllAbilityType;
            var isAllReadyExit = _cacheManager.IsAdd(cacheKey);

            if (isAllReadyExit)
                model = _cacheManager.Get<List<BaseUtilitiesModel>>(cacheKey);
            else
            {
                var query = (from data in EnumExtensions.EnumDictionary<Core.Enums.AbilityType>()
                             select new BaseUtilitiesModel
                             {
                                 Id = data.Key,
                                 Name = data.Value
                             });
                if (!String.IsNullOrEmpty(req.Search))
                {
                    var lowerSeach = req.Search.ToLowerInvariant();
                    var upperSeach = req.Search.ToUpperInvariant();
                    query = query.Where(x => x.Name.Contains(lowerSeach) || x.Name.Contains(upperSeach));
                }

                model = query
                            .OrderBy(x => x.Name)
                            .Skip(req.Skip)
                            .Take(req.Take)
                            .ToList();

                _cacheManager.Add(cacheKey, model);
            }

            return new ApiResult<List<BaseUtilitiesModel>> { Data = model };
        }
    }
}