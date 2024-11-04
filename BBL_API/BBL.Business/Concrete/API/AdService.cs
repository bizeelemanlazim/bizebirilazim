using System.Globalization;
using System.Linq.Expressions;
using AutoMapper;
using BBL.Business.Abstract.API;
using BBL.Business.Concrete.Base;
using BBL.Business.Helpers.Abstract;
using BBL.Business.Helpers.Concrete;
using BBL.Business.ValidationRules.FluentValidation.API.AdValidation;
using BBL.Core.Aspects.Autofac.Transaction;
using BBL.Core.Aspects.Autofac.Validation;
// using BBL.Core.Enums;
using BBL.Core.Extensions;
using BBL.Core.Middleware.Caching;
using BBL.Core.Models.API.Ad;
using BBL.Core.Models.API.Base;
using BBL.Core.Models.Application;
using BBL.Core.Utilities.Results;
using BBL.Core.Utilities.Toolkit;
using BBL.DataAccess.EntityFramework.UnityOfWork;
using BBL.Entities.Concrete;
using BBL.Entities.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace BBL.Business.Concrete.API
{
    public class AdService : BBLServiceBase, IAdService
    {
        public readonly IMapper _mapper;
        private readonly IUtilitiesService _utilitiesService;
        private readonly UtilityHelper _utilityHelper;
        private readonly ApplicationSettingsModel _options;
        private readonly IFileService _fileService;

        public AdService(
            IUowBBL repository,
            IHttpContextAccessor httpContextAccessor,
            IUtilitiesService utilitiesService,
            UserManager<ApplicationUser> userManager,
            UtilityHelper utilityHelper,
            IFileService fileService,
            IOptions<ApplicationSettingsModel> options,
            IMapper mapper) : base(repository, httpContextAccessor, userManager)
        {
            _mapper = mapper;
            _utilitiesService = utilitiesService;
            _utilityHelper = utilityHelper;
            _fileService = fileService;
            _options = options.Value;
        }

        #region Ad and Order Summary
        [ValidationAspect(typeof(InsertAdAndOrderSummaryValidation))]
        [TransactionScopeAspectAsync]
        public async Task<ApiResult> AddAd(InsertAdAndOrderSummary insertAdAndOrderSummary)
        {
            var _employerData = EmployerData;

            var date = DateTime.Now;

            var jobData = _repository.Job.FirstOrDefault(x => x.Id == insertAdAndOrderSummary.InsertAddModel.JobId);

            if (jobData == null)
                return new ApiResult() { IsSuccess = false, Message = "Belirtilen iş id'si bulunamadı" };

            if (insertAdAndOrderSummary.InsertAddModel.IsMyAddress)
            {
                insertAdAndOrderSummary.InsertAddModel.Address = _employerData.Address;
                insertAdAndOrderSummary.InsertOrderSummaryModel.Location = _employerData.Address;
            }

            var adData = _mapper.Map<Ad>(insertAdAndOrderSummary.InsertAddModel);
            adData.Criterion = JsonConvert.SerializeObject(insertAdAndOrderSummary.InsertAddModel.Criterion);
            adData.WorkType = insertAdAndOrderSummary.InsertAddModel.WorkType;
            adData.Gender = JsonConvert.SerializeObject(insertAdAndOrderSummary.InsertAddModel.Gender);

            adData.EmployerId = _employerData.Id;

            adData.IsActive = true;

            adData.CreatedUserId = _employerData.AspNetUserId;
            adData.CreatedDate = date;

            var insertAdId = await _repository.Ad.InsertAndGetIdAsync(adData);

            var orderSummaryData = _mapper.Map<OrderSummary>(insertAdAndOrderSummary.InsertOrderSummaryModel);

            orderSummaryData.AdId = insertAdId;
            orderSummaryData.CreatedUserId = _employerData.AspNetUserId;
            orderSummaryData.CreatedDate = date;

            await _repository.OrderSummary.InsertAndGetIdAsync(orderSummaryData);
            return new ApiResult();
        }


        public async Task<PaginationResult<DetailAdAndOrderSummary>> DetailAdAndOrderSummary(Core.Enums.JobStatus jobStatus, OrderSkipTakeReq req)
        {
            var _employerData = EmployerData;
            var _company = new CompanyType();

            var _experienceData = _utilitiesService.GetAllExperienceType().Data;
            var _educationData = _utilitiesService.GetAllEducationType().Data;

            if (EmployerData != null)
            {
                _company = _repository.CompanyType.Get(EmployerData.CompanyTypeId ?? 0);
            }

            //var propertyAndDirectionArry = req.OrderBy.Split(":");

            var query = (from adData in _repository.Ad.GetAll()
                         join orderSummaryData in _repository.OrderSummary.GetAll()
                               on adData.Id equals orderSummaryData.AdId
                         join jobData in _repository.Job.GetAll()
                               on adData.JobId equals jobData.Id
                         where (_employerData == null || adData.EmployerId == _employerData.Id) &&
                            ((adData.IsActive == true && jobStatus == Core.Enums.JobStatus.ActiveJobs)
                            || (adData.IsActive == false && jobStatus == Core.Enums.JobStatus.CompletedJobs)
                            || (adData.WorkStartDate.Date <= DateTime.Now.Date && adData.WorkEndDate.Date >= DateTime.Now.Date && jobStatus == Core.Enums.JobStatus.OngoingJobs)) // Değişiklik burada

                         select new DetailAdAndOrderSummary
                         {
                             DetailAdModel = new DetailAdModel
                             {
                                 Id = adData.Id,
                                 Address = adData.Address,
                                 Attribute = adData.Attribute,
                                 Criterion = JsonConvert.DeserializeObject<List<Criterion>>(adData.Criterion),
                                 WorkType = adData.WorkType,
                                 Gender = JsonConvert.DeserializeObject<List<Gender>>(adData.Gender),
                                 SectorId = adData.SectorId,
                                 EducationId = adData.EducationId,
                                 ExperienceId = adData.ExperienceId,
                                 IsMyAddress = adData.IsMyAddress,
                                 IsMyRecruitment = adData.IsMyRecruitment,
                                 JobId = adData.JobId,
                                 Price = adData.Price,
                                 WorkEndDate = adData.WorkEndDate,
                                 WorkingStartTime = adData.WorkingStartTime.ToString().Substring(0, 5),
                                 WorkingTime = adData.WorkingTime.ToString(),
                                 WorkStartDate = adData.WorkStartDate,
                                 IsActive = adData.IsActive,
                             },
                             DetailOrderSummary = new DetailOrderSummary
                             {
                                 Id = orderSummaryData.Id,
                                 JobName = jobData.JobName,
                                 CommissionFee = orderSummaryData.CommissionFee,
                                 LegalDeduction = orderSummaryData.LegalDeduction,
                                 Location = orderSummaryData.Location,
                                 OperationTime = orderSummaryData.OperationTime,
                                 ProgressPayment = orderSummaryData.ProgressPayment,
                                 TotalFees = orderSummaryData.TotalFees
                             }
                         })
                          .CustomOrderBy(req.OrderBy ?? "detailAdModel.Id:desc")
                          .ToPagination(req);

            query.Data.ForEach(item =>
            {
                item.DetailAdModel.Education = item.DetailAdModel.EducationId.HasValue ? _educationData.First(x => x.Id == item.DetailAdModel.EducationId).Name : "";
                item.DetailAdModel.Experience = item.DetailAdModel.ExperienceId.HasValue ? _experienceData.First(x => x.Id == item.DetailAdModel.ExperienceId).Name : "";

                item.DetailAdModel.EducationId = item.DetailAdModel.EducationId ?? 0;
                item.DetailAdModel.ExperienceId = item.DetailAdModel.ExperienceId ?? 0;
            });

            return query;
        }

        public async Task<ApiResult<DetailAdAndOrderSummary2>> AdAndOrderSummary(int id)
        {
            var _employerData = EmployerData;
            var _company = new CompanyType();
            var CompanyTypeId = _employerData.CompanyTypeId;
            var _cityData = _utilitiesService.GetAllCity().Data;

            var _experienceData = _utilitiesService.GetAllExperienceType().Data;
            var _educationData = _utilitiesService.GetAllEducationType().Data;
            var _sectorData = _utilitiesService.GetAllSectorType().Data;

            if (CompanyTypeId != null)
            {
                _company = _repository.CompanyType.Get(CompanyTypeId ?? 0);
            }

            //var propertyAndDirectionArry = req.OrderBy.Split(":");

            var query = (from adData in _repository.Ad.GetAll()
                         join orderSummaryData in _repository.OrderSummary.GetAll()
                               on adData.Id equals orderSummaryData.AdId
                         join jobData in _repository.Job.GetAll()
                               on adData.JobId equals jobData.Id
                         where adData.EmployerId == _employerData.Id && adData.Id == id
                         select new DetailAdAndOrderSummary2
                         {
                             DetailAdModel = new DetailAdModel2
                             {
                                 Id = adData.Id,
                                 Address = adData.Address,
                                 Attribute = adData.Attribute,
                                 Criterion = JsonConvert.DeserializeObject<List<Criterion>>(adData.Criterion),
                                 WorkType = adData.WorkType,// JsonConvert.DeserializeObject<List<WorkType>>(adData.WorkType),
                                 Gender = JsonConvert.DeserializeObject<List<Gender>>(adData.Gender),
                                 IsMyAddress = adData.IsMyAddress,
                                 IsMyRecruitment = adData.IsMyRecruitment,
                                 JobId = adData.JobId,
                                 Price = adData.Price,
                                 CityId = adData.CityId,
                                 SectorId = adData.SectorId,
                                 ExperienceId = adData.ExperienceId,
                                 EducationId = adData.EducationId,
                                 DistrictId = adData.DistrictId,
                                 WorkEndDate = adData.WorkEndDate,
                                 WorkingStartTime = adData.WorkingStartTime.ToString().Substring(0, 5),
                                 WorkingTime = adData.WorkingTime.ToString().Substring(0, 5),
                                 WorkStartDate = adData.WorkStartDate
                             },
                             DetailOrderSummary = new DetailOrderSummary
                             {
                                 Id = orderSummaryData.Id,
                                 JobName = jobData.JobName,
                                 CommissionFee = orderSummaryData.CommissionFee,
                                 LegalDeduction = orderSummaryData.LegalDeduction,
                                 Location = orderSummaryData.Location,
                                 OperationTime = orderSummaryData.OperationTime,
                                 ProgressPayment = orderSummaryData.ProgressPayment,
                                 TotalFees = orderSummaryData.TotalFees
                             }
                         });


            var result = query.FirstOrDefault();
            if (result is null)
                return new ApiResult<DetailAdAndOrderSummary2>() { IsSuccess = false, Message = "İlan bulunamadı" };
            var data = result.DetailAdModel;
            data.City = data.CityId.HasValue ? _cityData.First(x => x.Id == data.CityId).Name : "";
            data.CityId = data.CityId ?? 0;
            if (data.District != null)
                data.District = data.CityId.HasValue && data.DistrictId.HasValue ? _utilitiesService.GetAllDistrict(data.CityId ?? 0).Data.FirstOrDefault(x => x.Id == data.DistrictId).Name : "";
            data.DistrictId = data.DistrictId ?? 0;
            data.Education = data.EducationId.HasValue ? _educationData.First(x => x.Id == data.EducationId).Name : "";
            data.EducationId = data.EducationId ?? 0;
            data.Experience = data.ExperienceId.HasValue ? _experienceData.First(x => x.Id == data.ExperienceId).Name : "";
            data.ExperienceId = data.ExperienceId ?? 0;
            data.Sector = data.SectorId.HasValue ? _sectorData.First(x => x.Id == data.SectorId).Name : "";
            data.SectorId = data.SectorId ?? 0;
            data.JobName = _utilityHelper.FindByID(data.JobId, CacheKeys.GetAllJob);

            return new ApiResult<DetailAdAndOrderSummary2> { Data = result };
        }

        public async Task<ApiResult<EmployeeUserApplyForAJobModelCount>> ApplyForAJobList(bool isActive, int AdId, OrderSkipTakeReq req)
        {
            var _employerData = EmployerData;
            var _cityData = _utilitiesService.GetAllCity().Data;
            var _ganderData = _utilitiesService.GetAllGenderType().Data;
            var _nationalityData = _utilitiesService.GetAllNationality().Data;

            DateTime currentDate = DateTime.Now;

            var query = (from adData in _repository.Ad.Where(x => x.Id == AdId)
                         join applyForJobData in _repository.ApplyForJob.Where(x => x.AdId == AdId)
                               on adData.Id equals applyForJobData.AdId
                         join employeeData in _repository.Employee.GetAll()
                               on applyForJobData.EmployeeId equals employeeData.Id
                         where adData.EmployerId == _employerData.Id && adData.IsActive == isActive
                          && adData.Id == AdId
                         select new EmployeeUserApplyForAJobModel
                         {
                             Id = employeeData.Id,
                             ImageName = employeeData.ImageName,
                             ApplyForJobId = applyForJobData.Id,
                             Name = employeeData.FirstName + " " + employeeData.LastName,
                             Age = employeeData.BirthDate.HasValue ? (currentDate.Year - employeeData.BirthDate.Value.Year) : null,
                             Gender = employeeData.GenderId.HasValue ? employeeData.GenderId.ToString() : null,
                             City = employeeData.CityId.HasValue ? employeeData.CityId.ToString() : null,
                             Nationality = employeeData.NationalityId.HasValue ? employeeData.NationalityId.ToString() : null,
                             IsApply = applyForJobData.IsApply
                         })
                     .CustomOrderBy(req.OrderBy ?? "id:desc");
            var totalCount = query.Count();

            var result = query.Skip(req.Skip).Take(req.Take).ToList();

            foreach (var item in result)
            {

                if (!String.IsNullOrEmpty(item.ImageName))
                {
                    string path = _options.Folder.ImageFolder.EmployeeUserImagePath;//.Replace('\\', Path.DirectorySeparatorChar);
                    var resultFile = _fileService.FileDownload(item.ImageName, path);

                    item.Image = resultFile.Data;
                }

                if (item.Gender != null)
                    item.Gender = _ganderData.FirstOrDefault(x => x.Id == int.Parse(item.Gender))?.Name;
                if (item.City != null)
                    item.City = _cityData.FirstOrDefault(x => x.Id == int.Parse(item.City))?.Name;
                if (item.Nationality != null)
                    item.Nationality = _nationalityData.FirstOrDefault(x => x.Id == int.Parse(item.Nationality))?.Name;
            }

            var res = new EmployeeUserApplyForAJobModelCount();
            res.TotalCount = totalCount;
            res.data = result;

            return new ApiResult<EmployeeUserApplyForAJobModelCount> { Data = res };
        }

        public async Task<ApiResult<EmployeeUserApplyForAJobModel>> FinishForAJobList(int AdId)
        {
            var _employerData = EmployerData;
            var _cityData = _utilitiesService.GetAllCity().Data;
            var _ganderData = _utilitiesService.GetAllGenderType().Data;
            var _nationalityData = _utilitiesService.GetAllNationality().Data;

            DateTime currentDate = DateTime.Now;

            var query = (from adData in _repository.Ad.Where(x => x.Id == AdId)
                         join applyForJobData in _repository.ApplyForJob.Where(x => x.AdId == AdId)
                               on adData.Id equals applyForJobData.AdId
                         join employeeData in _repository.Employee.GetAll()
                               on applyForJobData.EmployeeId equals employeeData.Id
                         where adData.EmployerId == _employerData.Id
                          && adData.Id == AdId
                          && applyForJobData.IsFinish == true
                         select new EmployeeUserApplyForAJobModel
                         {
                             Id = employeeData.Id,
                             ImageName = employeeData.ImageName,
                             ApplyForJobId = applyForJobData.Id,
                             Name = employeeData.FirstName + " " + employeeData.LastName,
                             Age = employeeData.BirthDate.HasValue ? (currentDate.Year - employeeData.BirthDate.Value.Year) : null,
                             Gender = employeeData.GenderId.HasValue ? employeeData.GenderId.ToString() : null,
                             City = employeeData.CityId.HasValue ? employeeData.CityId.ToString() : null,
                             Nationality = employeeData.NationalityId.HasValue ? employeeData.NationalityId.ToString() : null,
                             IsApply = applyForJobData.IsApply
                         });


            var result = query.FirstOrDefault();
            if (result == null)
            {
                return new ApiResult<EmployeeUserApplyForAJobModel>() { IsSuccess = false, Message = "İlanda işi tamamlamış sizle ilgili kişi yok" };
            }
            else
            {
                if (!String.IsNullOrEmpty(result.ImageName))
                {
                    string path = _options.Folder.ImageFolder.EmployeeUserImagePath;//.Replace('\\', Path.DirectorySeparatorChar);
                    var resultFile = _fileService.FileDownload(result.ImageName, path);

                    result.Image = resultFile.Data;
                }

                if (result.Gender != null)
                    result.Gender = _ganderData.FirstOrDefault(x => x.Id == int.Parse(result.Gender))?.Name;
                if (result.City != null)
                    result.City = _cityData.FirstOrDefault(x => x.Id == int.Parse(result.City))?.Name;
                if (result.Nationality != null)
                    result.Nationality = _nationalityData.FirstOrDefault(x => x.Id == int.Parse(result.Nationality))?.Name;
            }

            return new ApiResult<EmployeeUserApplyForAJobModel> { Data = result };
        }

        public async Task<ApiResult> ApplyForAJob(int id)
        {
            var data = _repository.ApplyForJob.Where(x => x.Id == id).Include(x => x.Ad).ThenInclude(x => x.OrderSummary).FirstOrDefault();

            if (data != null)
            {
                var isApplyList = _repository.ApplyForJob.Where(x => x.AdId == data.AdId && x.IsApply == true).ToList();

                foreach (var item in isApplyList)
                {
                    item.IsApply = false;
                    await _repository.ApplyForJob.UpdateAsync(item);
                }

                data.IsApply = true;

                data.Ad.OrderSummary.EmployeeId = data.EmployeeId;

                await _repository.ApplyForJob.UpdateAsync(data);

                _repository.Commit();

                return new ApiResult();
            }

            else
                return new ApiResult() { IsSuccess = false, Message = "Belirtilen id de veri yok" };
        }

        public async Task<ApiResult> ApplyForAJobDelete(int id)
        {
            var data = _repository.ApplyForJob.Where(x => x.Id == id).FirstOrDefault();

            if (data != null)
            {
                data.IsApply = false;

                await _repository.ApplyForJob.UpdateAsync(data);
                _repository.Commit();

                return new ApiResult();
            }

            else
                return new ApiResult() { IsSuccess = false, Message = "Belirtilen id de veri yok" };
        }

        //[ValidationAspect(typeof(EditAddAndOrderSummaryValidation))]
        [TransactionScopeAspectAsync]
        public async Task<ApiResult> UpdateAd(EditAdAndOrderSummary editAdAndOrderSummary)
        {
            var _employerData = EmployerData;

            var date = DateTime.Now;

            var result = (from adData in _repository.Ad.GetAll()
                          join orderSummaryData in _repository.OrderSummary.GetAll()
                                on adData.Id equals orderSummaryData.AdId
                          where adData.EmployerId == _employerData.Id && adData.Id == editAdAndOrderSummary.EditAddModel.Id
                          select new { AdData = adData, OrderSummaryData = orderSummaryData })
                        .FirstOrDefault();

            if (result == null || (result.AdData == null || result.OrderSummaryData == null))
                return new ApiResult() { IsSuccess = false, Message = "Kullanıcıya ait ilan bulunmamaktadır." };

            #region Ad Data
            result.AdData.IsActive = editAdAndOrderSummary.EditAddModel.IsActive;
            result.AdData.JobId = editAdAndOrderSummary.EditAddModel.JobId;
            result.AdData.WorkingTime = StringConvertToTimeSpan(editAdAndOrderSummary.EditAddModel.WorkingTime);
            result.AdData.WorkingStartTime = StringConvertToTimeSpan(editAdAndOrderSummary.EditAddModel.WorkingStartTime);
            result.AdData.WorkEndDate = editAdAndOrderSummary.EditAddModel.WorkEndDate;
            result.AdData.Attribute = editAdAndOrderSummary.EditAddModel.Attribute;
            result.AdData.Criterion = editAdAndOrderSummary.EditAddModel.Criterion.ToString();
            result.AdData.Gender = editAdAndOrderSummary.EditAddModel.Gender.ToString();
            result.AdData.WorkType = editAdAndOrderSummary.EditAddModel.WorkType;
            result.AdData.IsMyAddress = editAdAndOrderSummary.EditAddModel.IsMyAddress;
            result.AdData.Address = editAdAndOrderSummary.EditAddModel.IsMyAddress
                                        ? _employerData.Address
                                        : editAdAndOrderSummary.EditAddModel.Address;
            result.AdData.Price = editAdAndOrderSummary.EditAddModel.Price;
            result.AdData.SectorId = editAdAndOrderSummary.EditAddModel.SectorId;
            result.AdData.EducationId = editAdAndOrderSummary.EditAddModel.EducationId;
            result.AdData.ExperienceId = editAdAndOrderSummary.EditAddModel.ExperienceId;

            editAdAndOrderSummary.EditAddModel.IsMyRecruitment = editAdAndOrderSummary.EditAddModel.IsMyRecruitment;
            result.AdData.ModifiedUserId = _employerData.AspNetUserId;
            result.AdData.ModifiedDate = date;
            _repository.Ad.Update(result.AdData);

            #endregion

            #region Order Summary

            var jobData = _repository.Job.FirstOrDefault(x => x.Id == editAdAndOrderSummary.EditAddModel.JobId);

            if (jobData == null)
                return new ApiResult() { IsSuccess = false, Message = "Tanımlı iş bulunamadı" };

            result.OrderSummaryData.JobName = jobData.JobName;
            result.OrderSummaryData.OperationTime = editAdAndOrderSummary.EditOrderSummaryModel.OperationTime;
            result.OrderSummaryData.Location = editAdAndOrderSummary.EditAddModel.IsMyAddress
                                                    ? _employerData.Address
                                                    : editAdAndOrderSummary.EditAddModel.Address;
            result.OrderSummaryData.ProgressPayment = editAdAndOrderSummary.EditOrderSummaryModel.ProgressPayment;
            result.OrderSummaryData.LegalDeduction = editAdAndOrderSummary.EditOrderSummaryModel.LegalDeduction;
            result.OrderSummaryData.CommissionFee = editAdAndOrderSummary.EditOrderSummaryModel.CommissionFee;
            result.OrderSummaryData.TotalFees = editAdAndOrderSummary.EditOrderSummaryModel.TotalFees;

            result.OrderSummaryData.ModifiedUserId = _employerData.AspNetUserId;
            result.OrderSummaryData.ModifiedDate = date;
            _repository.OrderSummary.Update(result.OrderSummaryData);
            #endregion

            _repository.Commit();

            return new ApiResult();
        }

        public async Task<ApiResult> UpdateAdActive(EditAddActive editAddActive)
        {
            var _employerData = EmployerData;

            var date = DateTime.Now;

            var result = (from adData in _repository.Ad.GetAll()
                          join orderSummaryData in _repository.OrderSummary.GetAll()
                                on adData.Id equals orderSummaryData.AdId
                          where adData.EmployerId == _employerData.Id && adData.Id == editAddActive.Id
                          select new { AdData = adData, OrderSummaryData = orderSummaryData })
                        .FirstOrDefault();

            if (result == null || (result.AdData == null))
                return new ApiResult() { IsSuccess = false, Message = "Kullanıcıya ait ilan bulunmamaktadır." };

            #region Ad Data
            result.AdData.IsActive = editAddActive.IsActive;

            result.AdData.ModifiedUserId = _employerData.AspNetUserId;
            result.AdData.ModifiedDate = date;
            _repository.Ad.Update(result.AdData);

            #endregion

            _repository.Commit();

            return new ApiResult();
        }


        public async Task<ApiResult> AdFinish(int AdId)
        {
            var userEmployerData = EmployerData;

            var data = _repository.OrderSummary.Where(x => x.AdId == AdId).FirstOrDefault();

            if (data != null)
            {
                var applyForJobsObj = _repository.ApplyForJob.GetAllIncluding(x => x.Ad).Where(
                    x => x.AdId == data.AdId
                    && x.EmployerId == userEmployerData.Id
                    && x.EmployeeId == data.EmployeeId
                ).FirstOrDefault();

                if (applyForJobsObj is null)
                    return new ApiResult() { IsSuccess = false, Message = "Belirtilen id de veri yok" };

                applyForJobsObj.IsFinish = true;

                applyForJobsObj.Ad.IsActive = false;

                await _repository.ApplyForJob.UpdateAsync(applyForJobsObj);

                _repository.Commit();

                return new ApiResult();
            }

            else
                return new ApiResult() { IsSuccess = false, Message = "Belirtilen id de veri yok" };
        }

        #endregion

        #region Private Methods

        private TimeSpan StringConvertToTimeSpan(string data) => TimeSpan.Parse(data);

        #endregion
    }
}
