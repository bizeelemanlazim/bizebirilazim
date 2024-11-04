using AutoMapper;
using BBL.Business.Abstract.API;
using BBL.Business.Concrete.Base;
using BBL.Business.Helpers.Abstract;
using BBL.Business.Helpers.Concrete;
using BBL.Business.Middleware.Authorization;
using BBL.Business.ValidationRules.FluentValidation.API.EmployeeValidaiton;
using BBL.Business.ValidationRules.FluentValidation.API.EmployeeValidaiton.AbilityInformation;
using BBL.Business.ValidationRules.FluentValidation.API.EmployeeValidaiton.BankAndPersonalInformation;
using BBL.Business.ValidationRules.FluentValidation.API.EmployeeValidaiton.CertificateInformation;
using BBL.Business.ValidationRules.FluentValidation.API.EmployeeValidaiton.DisabledStatus;
using BBL.Business.ValidationRules.FluentValidation.API.EmployeeValidaiton.EducationInformation;
using BBL.Business.ValidationRules.FluentValidation.API.EmployeeValidaiton.SkillInformation;
using BBL.Business.ValidationRules.FluentValidation.API.EmployeeValidaiton.SocialMediaInformation;
using BBL.Business.ValidationRules.FluentValidation.API.EmployeeValidaiton.WorkExperience;
using BBL.Business.ValidationRules.FluentValidation.API.File;
using BBL.Core.Aspects.Autofac.Transaction;
using BBL.Core.Aspects.Autofac.Validation;
using BBL.Core.Constants;
using BBL.Core.Enums;
using BBL.Core.Middleware.Caching;
using BBL.Core.Models.API.Ad;
using BBL.Core.Models.API.Base;
using BBL.Core.Models.API.Employee;
using BBL.Core.Models.API.Employer;
using BBL.Core.Models.API.Utilities;
using BBL.Core.Models.Application;
using BBL.Core.Utilities.Results;
using BBL.Core.Utilities.Toolkit;
using BBL.DataAccess.EntityFramework.UnityOfWork;
using BBL.Entities.Concrete;
using BBL.Entities.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Org.BouncyCastle.Ocsp;
using System.Linq;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using IResult = BBL.Core.Utilities.Results.IResult;

namespace BBL.Business.Concrete.API
{
    [AuthorizeBySelectedRole(UserRoles.Employee)]
    public class EmployeeService : BBLServiceBase, IEmployeeService
    {
        private readonly IMapper _mapper;
        private readonly IFileService _fileService;
        private readonly UtilityHelper _utilityHelper;
        private readonly ApplicationSettingsModel _options;
        private readonly IUtilitiesService _utilitiesService;


        public EmployeeService(IUowBBL repository,
            IHttpContextAccessor httpContextAccessor,
            UserManager<ApplicationUser> userManager,
            IMapper mapper,
            IFileService fileService,
            UtilityHelper utilityHelper,
            IOptions<ApplicationSettingsModel> options,
            IUtilitiesService utilitiesService) : base(repository, httpContextAccessor, userManager)
        {
            _mapper = mapper;
            _fileService = fileService;
            _options = options.Value;
            _utilityHelper = utilityHelper;
            _utilitiesService = utilitiesService;
        }

        #region Employee Process

        public async Task<IResult> AddUser(AddEmployeeUserModel addEmployeeUser)
        {
            var addUser = _mapper.Map<Employee>(addEmployeeUser);

            await _repository.Employee.InsertAsync(addUser);

            return new Result();
        }

        public ApiResult<DetailEmployeeUserModel> GetUserDetail()
        {
            var data = this.EmployeeData;
            var _cityData = _utilitiesService.GetAllCity().Data;
            var _ganderData = _utilitiesService.GetAllGenderType().Data;
            var _nationalityData = _utilitiesService.GetAllNationality().Data;
            var _maritalStatus = _utilitiesService.GetAllMaritalStatusType().Data;
            var _district = _utilitiesService.GetAllDistrict(data.CityId ?? 0)?.Data;

            if (data != null)
            {
                var detailUser = _mapper.Map<DetailEmployeeUserModel>(data);
                detailUser.City = data.CityId.HasValue ? _cityData.FirstOrDefault(x => x.Id == data.CityId)?.Name : "Belirtmek istemiyorum";
                detailUser.Gender = data.GenderId.HasValue ? _ganderData.FirstOrDefault(x => x.Id == data.GenderId)?.Name : "Belirtmek istemiyorum";
                detailUser.Nationality = data.NationalityId.HasValue ? _nationalityData.FirstOrDefault(x => x.Id == data.NationalityId)?.Name : "Belirtmek istemiyorum";
                detailUser.MaritalStatus = data.MaritalStatusId.HasValue ? _maritalStatus.FirstOrDefault(x => x.Id == data.MaritalStatusId)?.Name : "Belirtmek istemiyorum";
                detailUser.District = data.DistrictId.HasValue ? _district?.FirstOrDefault(x => x.Id == data.DistrictId)?.Name ?? "Belirtmek istemiyorum" : "Belirtmek istemiyorum";

                return new ApiResult<DetailEmployeeUserModel> { Data = detailUser };
            }
            else
                return new ApiResult<DetailEmployeeUserModel> { IsSuccess = false, Message = "İş arayan kimliği bulunamadı" };
        }

        [ValidationAspect(typeof(UpdateEmployeeUserValidator))]
        [TransactionScopeAspectAsync]
        public async Task<ApiResult> UpdateUser(EditEmployeeUserModel editEmployeeUser)
        {
            //var resultDataControl = DataControl(editEmployeeUser);

            //if (!resultDataControl.IsSuccess)
            //    return new ApiResult() { Message = resultDataControl.Message, IsSuccess = resultDataControl.IsSuccess };

            var employeeData = EmployeeData;

            if (employeeData != null)
            {
                employeeData.FirstName = editEmployeeUser.FirstName;
                employeeData.LastName = editEmployeeUser.LastName;
                employeeData.Email = editEmployeeUser.Email;
                employeeData.PhoneNumber = editEmployeeUser.PhoneNumber;
                employeeData.SecondPhoneNumber = editEmployeeUser.SecondPhoneNumber;
                employeeData.BirthDate = editEmployeeUser.BirthDate;
                employeeData.PlaceOfBirth = editEmployeeUser.PlaceOfBirth;
                employeeData.CityId = editEmployeeUser.CityId;
                employeeData.DistrictId = editEmployeeUser.DistrictId;
                employeeData.GenderId = editEmployeeUser.GenderId;
                employeeData.MaritalStatusId = editEmployeeUser.MaritalStatusId;
                employeeData.DrivingLicenceId = editEmployeeUser.DrivingLicenceId;
                employeeData.NationalityId = editEmployeeUser.NationalityId;
                employeeData.Address = editEmployeeUser.Address;


                await _repository.Employee.UpdateAsync(employeeData);

                _repository.Commit();

                return new ApiResult();
            }
            else
                return new ApiResult { IsSuccess = false, Message = "İş arayan kimliği bulunamadı" };
        }

        #endregion

        #region Ad Process
        public async Task<ApiResult<DetailEmployeeAdAndOrderSummaryCount>> DetailAdAndOrderSummary(OrderSkipTakeReq req, DetailEmployeeAdAndOrderSummaryFilter filter)
        {
            var _employeeData = EmployeeData;

            var query = (from adData in _repository.Ad.GetAll()
                         join eployerData in _repository.Employer.GetAll()
                               on adData.EmployerId equals eployerData.Id
                         join orderSummaryData in _repository.OrderSummary.GetAll()
                               on adData.Id equals orderSummaryData.AdId
                         join jobData in _repository.Job.GetAll()
                               on adData.JobId equals jobData.Id

                         join r in _repository.ApplyForJob.Where(x => x.EmployeeId == _employeeData.Id)
                         on adData.Id equals r.AdId into ps_jointable
                         from p in ps_jointable.DefaultIfEmpty()

                         join r in _repository.City.Where(x =>  filter.CityId.Any(id=> id== x.Id))
                         on adData.CityId equals r.Id into cityJoin
                         from c in cityJoin.DefaultIfEmpty()

                         where adData.IsActive == true

                         select new { AdData = adData, OrderSummaryData = orderSummaryData, JobData = jobData, EmployerData = eployerData, IsApplied = p == null ? false : true })
                          .Select(x => new DetailEmployeeAdAndOrderSummary
                          {
                              DetailAdModel = new DetailEmployeeAdModel2
                              {
                                  Id = x.AdData.Id,
                                  EmployerId = x.EmployerData.Id,
                                  EmployerName = x.EmployerData.FirstName + " " + x.EmployerData.LastName,
                                  Address = x.AdData.Address,
                                  Attribute = x.AdData.Attribute,
                                  Criterion = JsonConvert.DeserializeObject<List<Criterion>>(x.AdData.Criterion.ToString()),
                                  WorkType = x.AdData.WorkType,
                                  Gender = x.AdData.Gender,
                                  IsMyAddress = x.AdData.IsMyAddress,
                                  IsMyRecruitment = x.AdData.IsMyRecruitment,
                                  JobId = x.AdData.JobId,
                                  SectorId = x.AdData.SectorId,
                                  EducationId = x.AdData.EducationId,
                                  ExperienceId = x.AdData.ExperienceId,
                                  Price = x.AdData.Price,
                                  WorkEndDate = x.AdData.WorkEndDate,
                                  WorkingStartTime = x.AdData.WorkingStartTime.ToString().Substring(0, 5),
                                  WorkingTime = x.AdData.WorkingTime.ToString(),
                                  WorkStartDate = x.AdData.WorkStartDate,
                                  IsApplied = x.IsApplied
                              },
                              DetailOrderSummary = new DetailOrderSummary
                              {
                                  Id = x.OrderSummaryData.Id,
                                  JobName = x.JobData.JobName,
                                  CommissionFee = x.OrderSummaryData.CommissionFee,
                                  LegalDeduction = x.OrderSummaryData.LegalDeduction,
                                  Location = x.OrderSummaryData.Location,
                                  OperationTime = x.OrderSummaryData.OperationTime,
                                  ProgressPayment = x.OrderSummaryData.ProgressPayment,
                                  TotalFees = x.OrderSummaryData.TotalFees,
                                  CityId= x.AdData.CityId,
                                  DistrictId = x.AdData.DistrictId,

                              }
                          })
                          .CustomOrderBy(req.OrderBy ?? "detailAdModel.Id:desc");

            if (filter.JobId?.Count > 0)
                query = query.Where(x => filter.JobId.Contains(x.DetailAdModel.JobId));

            if (filter.SektorId?.Count > 0)
                query = query.Where(x => filter.SektorId.Contains(x.DetailAdModel.SectorId ?? 0));

            if (filter.CityId?.Count > 0)
                query = query.Where(x => filter.CityId.Contains(x.DetailOrderSummary.CityId ?? 0));

            if (filter.DistrictId?.Count > 0)
                query = query.Where(x => filter.DistrictId.Contains(x.DetailOrderSummary.DistrictId ?? 0));

            if (filter.WorkingTypeId?.Count > 0)
                query = query.Where(x => filter.WorkingTypeId
                .Any(workingTypeId => x.DetailAdModel.WorkType == workingTypeId));

            if (filter.GenderId != null)
                query = query.Where(x => x.DetailAdModel.Gender.Contains(filter.GenderId.ToString()));

            if (!String.IsNullOrEmpty(filter.searchJobOrEmployer))
                query = query
                    .Where(x => x.DetailAdModel.EmployerName.Contains(filter.searchJobOrEmployer)
                    || x.DetailOrderSummary.JobName.Contains(filter.searchJobOrEmployer)
                    || x.DetailAdModel.Attribute.Contains(filter.searchJobOrEmployer)
                    || x.DetailAdModel.Criterion.Any(c=>c.Name.Contains(filter.searchJobOrEmployer))
                    );

            if (filter.EducationId != null)
                query = query.Where(x => x.DetailAdModel.EducationId == filter.EducationId);

            if (filter.ExperienceId != null)
                query = query.Where(x => x.DetailAdModel.ExperienceId == filter.ExperienceId);


            var result = query.Skip(req.Skip).Take(req.Take).ToList();

            var res = new DetailEmployeeAdAndOrderSummaryCount();
            res.TotalCount = query.Count();
            res.data = result;
            return new ApiResult<DetailEmployeeAdAndOrderSummaryCount> { Data = res };
        }

        public async Task<ApiResult<ApplyForAJobListDetailEmployeeAdAndOrderSummaryCount>> ApplyForAJobList(bool IsActive, OrderSkipTakeReq req)
        {
            var _employeeData = EmployeeData;
            var query = (from adData in _repository.Ad.GetAll()
                         join orderSummaryData in _repository.OrderSummary.GetAll()
                               on adData.Id equals orderSummaryData.AdId
                         join applyForJobData in _repository.ApplyForJob.GetAll()
                         on adData.Id equals applyForJobData.AdId
                         join jobData in _repository.Job.GetAll()
                               on adData.JobId equals jobData.Id
                         where adData.IsActive == IsActive
                         && applyForJobData.EmployeeId == _employeeData.Id
                         && applyForJobData.IsDeleted == false

                         select new { AdData = adData, OrderSummaryData = orderSummaryData, JobData = jobData, ApplyForAJobData = applyForJobData })

                          .Select(x => new ApplyForAJobListDetailEmployeeAdAndOrderSummary
                          {
                              ApplyForAJobId = x.ApplyForAJobData.Id,
                              DetailAdModel = new DetailEmployeeAdModel
                              {
                                  Id = x.AdData.Id,
                                  Address = x.AdData.Address,
                                  Attribute = x.AdData.Attribute,
                                  Criterion = JsonConvert.DeserializeObject<List<Criterion>>(x.AdData.Criterion),
                                  IsMyAddress = x.AdData.IsMyAddress,
                                  IsMyRecruitment = x.AdData.IsMyRecruitment,
                                  JobId = x.AdData.JobId,
                                  EducationId = x.AdData.EducationId,
                                  ExperienceId = x.AdData.ExperienceId,
                                  SectorId = x.AdData.SectorId,
                                  Price = x.AdData.Price,
                                  WorkEndDate = x.AdData.WorkEndDate,
                                  WorkingStartTime = x.AdData.WorkingStartTime.ToString().Substring(0, 5),
                                  WorkingTime = x.AdData.WorkingTime.ToString(),
                                  WorkStartDate = x.AdData.WorkStartDate
                              },
                              DetailOrderSummary = new DetailOrderSummary
                              {
                                  Id = x.OrderSummaryData.Id,
                                  JobName = x.JobData.JobName,
                                  CommissionFee = x.OrderSummaryData.CommissionFee,
                                  LegalDeduction = x.OrderSummaryData.LegalDeduction,
                                  Location = x.OrderSummaryData.Location,
                                  OperationTime = x.OrderSummaryData.OperationTime,
                                  ProgressPayment = x.OrderSummaryData.ProgressPayment,
                                  TotalFees = x.OrderSummaryData.TotalFees
                              }
                          })
                          .CustomOrderBy(req.OrderBy ?? "detailAdModel.Id:desc");
            var totalCount = query.Count();
            var result = query.Skip(req.Skip).Take(req.Take).ToList();
            var res = new ApplyForAJobListDetailEmployeeAdAndOrderSummaryCount();
            res.TotalCount = totalCount;
            res.data = result;

            return new ApiResult<ApplyForAJobListDetailEmployeeAdAndOrderSummaryCount> { Data = res };
        }
        public async Task<ApiResult> ApplyForAJob(int adId)
        {
            var userEmployeeData = EmployeeData;

            var data = _repository.Ad.Where(x => x.Id == adId).FirstOrDefault();

            if (data != null)
            {
                var check = _repository.ApplyForJob.Where(x => x.AdId == adId && x.EmployeeId == userEmployeeData.Id && x.IsDeleted == false).FirstOrDefault();
                if (check != null)
                    return new ApiResult() { IsSuccess = false, Message = "İlgili ilana daha önce başvuru yapılmış" };

                var insert = new ApplyForJob
                {
                    EmployeeId = userEmployeeData.Id,
                    EmployerId = data.EmployerId,
                    AdId = data.Id
                };


                await _repository.ApplyForJob.InsertAndGetIdAsync(insert);
                return new ApiResult();
            }

            else
                return new ApiResult() { IsSuccess = false, Message = "İlan bulunamadı" };
        }

        public async Task<ApiResult> ApplyForAJobDelete(int adId)
        {
            var userEmployeeData = EmployeeData;

            var data = _repository.ApplyForJob.Where(x => x.AdId == adId && x.EmployeeId == userEmployeeData.Id).FirstOrDefault();

            if (data != null)
            {
                data.IsDeleted = true;

                await _repository.ApplyForJob.UpdateAsync(data);
                _repository.Commit();

                return new ApiResult();
            }

            else
                return new ApiResult() { IsSuccess = false, Message = "Belirtilen ilanda basvuru yok" };
        }

        #endregion

        #region Work Experience Process

        [ValidationAspect(typeof(AddWorkExperienceValidator))]
        [TransactionScopeAspectAsync]
        public async Task<ApiResult> AddWorkExperience(AddWorkExperienceModel addWorkExperienceModel)
        {
            var userEmployeeData = EmployeeData;

            var addWorkExperince = _mapper.Map<WorkExperience>(addWorkExperienceModel);

            addWorkExperince.EmployeeId = userEmployeeData.Id;



            await _repository.WorkExperience.InsertAsync(addWorkExperince);

            return new ApiResult();
        }

        [ValidationAspect(typeof(EditWorkExperienceValidator))]
        [TransactionScopeAspectAsync]
        public async Task<ApiResult> EditWorkExperience(BaseWorkExperienceModel editWorkExperienceModel, int id)
        {
            var userEmployeeData = EmployeeData;

            var data = _repository.WorkExperience.Where(x => x.EmployeeId == userEmployeeData.Id && x.Id == id).FirstOrDefault();

            if (data != null && userEmployeeData != null && data.IsDeleted == false)
            {
                data.JobId = editWorkExperienceModel.JobId;
                data.WorkingTypeId = editWorkExperienceModel.WorkingTypeId;
                data.IsWorking = editWorkExperienceModel.IsWorking;
                data.StartDate = editWorkExperienceModel.StartDate;
                data.EndDate = editWorkExperienceModel.EndDate;
                data.WorkingCompany = editWorkExperienceModel.WorkingCompany;
                data.Description = editWorkExperienceModel.Description;

                data.ModifiedDate = DateTime.Now;
                data.ModifiedUserId = userEmployeeData.AspNetUserId;
                await _repository.WorkExperience.UpdateAsync(data);

                _repository.Commit();

                return new ApiResult();
            }
            else
                return new ApiResult() { IsSuccess = false, Message = "İş deneyimi bulunamadı" };

        }

        public ApiResult<List<DetailWorkExperienceModel>> GetAllDetailWorkExperience()
        {
            var userEmployeeData = EmployeeData;

            var model = (from data in _repository.WorkExperience.GetAll()
                         join job in _repository.Job.GetAll()
                         on data.JobId equals job.Id
                         where !data.IsDeleted && data.EmployeeId == userEmployeeData.Id
                         select new DetailWorkExperienceModel
                         {
                             Id = data.Id,
                             Description = data.Description,
                             EndDate = data.EndDate,
                             IsWorking = data.IsWorking,
                             JobId = data.JobId,
                             Job = job.JobName,
                             StartDate = data.StartDate,
                             WorkingCompany = data.WorkingCompany,
                             WorkingTypeId = data.WorkingTypeId
                         }).ToList();




            return new ApiResult<List<DetailWorkExperienceModel>>() { Data = model };

        }

        public ApiResult DeleteWorkExperience(int id)
        {
            var userEmployeeData = EmployeeData;

            var data = _repository.WorkExperience.Where(x => x.Id == id && x.EmployeeId == userEmployeeData.Id).FirstOrDefault();

            if (data != null)
            {
                data.IsDeleted = true;

                _repository.WorkExperience.Update(data);

                _repository.Commit();

                return new ApiResult();
            }

            else
                return new ApiResult() { IsSuccess = false, Message = "Belirtilen id de veri yok" };
        }

        #endregion

        #region Education Information Process

        [ValidationAspect(typeof(AddEducationInformationValidator))]
        [TransactionScopeAspectAsync]
        public async Task<ApiResult> AddEducationInformation(AddEducationInformationModel addEducationInformation)
        {
            var userEmployeeData = EmployeeData;

            var addWorkExperince = _mapper.Map<EducationInformation>(addEducationInformation);

            addWorkExperince.EmployeeId = userEmployeeData.Id;

            await _repository.EducationInformation.InsertAsync(addWorkExperince);

            return new ApiResult();
        }

        public ApiResult<List<DetailEducationInformationModel>> GetAllDetailEducationInformation()
        {
            var userEmployeeData = EmployeeData;

            var model = (from data in _repository.EducationInformation
                         where !data.IsDeleted && data.EmployeeId == userEmployeeData.Id
                         select new DetailEducationInformationModel
                         {
                             Id = data.Id,
                             Description = data.Description,
                             EndDate = data.EndDate,
                             IsBreak = data.IsBreak,
                             IsContinue = data.IsContinue,
                             School = data.School,
                             Section = data.Section,
                             StartDate = data.StartDate
                         }).ToList();

            return new ApiResult<List<DetailEducationInformationModel>>() { Data = model };
        }

        [ValidationAspect(typeof(EditEducationInformationValidator))]
        [TransactionScopeAspectAsync]
        public async Task<ApiResult> EditEducationInformation(BaseEducationInformationModel editEducationInformation, int id)
        {
            var userEmployeeData = EmployeeData;

            var data = _repository.EducationInformation.Where(x => x.EmployeeId == userEmployeeData.Id && x.Id == id).FirstOrDefault();

            if (data != null && userEmployeeData != null)
            {
                data.School = editEducationInformation.School;
                data.Section = editEducationInformation.Section;
                data.StartDate = Convert.ToDateTime(editEducationInformation.StartDate);
                data.EndDate = Convert.ToDateTime(editEducationInformation.EndDate);
                data.Description = editEducationInformation.Description;
                data.IsContinue = editEducationInformation.IsContinue;
                data.IsBreak = editEducationInformation.IsBreak;

                await _repository.EducationInformation.UpdateAsync(data);

                _repository.Commit();

                return new ApiResult();
            }
            else
                return new ApiResult() { IsSuccess = false, Message = "Eğitim bilgisi bulunamadı" };
        }

        public ApiResult DeleteEducationInformation(int id)
        {
            var userEmployeeData = EmployeeData;

            var data = _repository.EducationInformation.Where(x => x.Id == id && x.EmployeeId == userEmployeeData.Id).FirstOrDefault();

            if (data != null)
            {
                data.IsDeleted = true;

                _repository.EducationInformation.Update(data);

                _repository.Commit();

                return new ApiResult();
            }

            else
                return new ApiResult() { IsSuccess = false, Message = "Belirtilen id de veri yok" };
        }

        #endregion

        #region Skill Information Process

        [ValidationAspect(typeof(AddSkillInformationValidator))]
        [TransactionScopeAspectAsync]
        public async Task<ApiResult> AddSkillInformation(AddSkillInformationModel addSkillInformationModel)
        {
            var userEmployeeData = EmployeeData;

            var addSkillInformation = _mapper.Map<SkillInformation>(addSkillInformationModel);

            addSkillInformation.EmployeeId = userEmployeeData.Id;

            await _repository.SkillInformation.InsertAsync(addSkillInformation);

            return new ApiResult();
        }

        public ApiResult<List<DetailSkillInformationModel>> GetAllDetailSkillInformation()
        {
            var userEmployeeData = EmployeeData;

            var model = (from data in _repository.SkillInformation
                         where !data.IsDeleted && data.EmployeeId == userEmployeeData.Id
                         select new DetailSkillInformationModel
                         {
                             Id = data.Id,
                             SkillName = data.SkillName,
                             Description = data.Description,
                             Rating = data.Rating,
                         }).ToList();

            return new ApiResult<List<DetailSkillInformationModel>>() { Data = model };
        }

        [ValidationAspect(typeof(EditSkillInformationValidator))]
        [TransactionScopeAspectAsync]
        public async Task<ApiResult> EditSkillInformation(EditSkillInformationModel editSkillInformationModel)
        {
            var userEmployeeData = EmployeeData;

            var data = _repository.SkillInformation.Where(x => x.EmployeeId == userEmployeeData.Id && x.Id == editSkillInformationModel.Id).FirstOrDefault();

            if (data != null && userEmployeeData != null)
            {
                data.SkillName = editSkillInformationModel.SkillName;
                data.Description = editSkillInformationModel.Description;
                data.Rating = editSkillInformationModel.Rating;

                await _repository.SkillInformation.UpdateAsync(data);

                _repository.Commit();

                return new ApiResult();
            }
            else
                return new ApiResult() { IsSuccess = false, Message = "Beceri bilgisi bulunamadı" };
        }

        public ApiResult DeleteSkillInformation(int id)
        {
            var userEmployeeData = EmployeeData;

            var data = _repository.SkillInformation.Where(x => x.Id == id && x.EmployeeId == userEmployeeData.Id).FirstOrDefault();

            if (data != null)
            {
                data.IsDeleted = true;

                _repository.SkillInformation.Update(data);

                _repository.Commit();

                return new ApiResult();
            }

            else
                return new ApiResult() { IsSuccess = false, Message = "Belirtilen id de veri yok" };
        }

        #endregion

        #region Disabled Status Process

        [ValidationAspect(typeof(AddDisabledStatusValidator))]
        [TransactionScopeAspectAsync]
        public async Task<ApiResult> AddDisabledStatus(AddDisabledStatusModel addDisabledStatusModel)
        {
            var userEmployeeData = EmployeeData;

            var addDisabledStatus = _mapper.Map<DisabledStatus>(addDisabledStatusModel);

            addDisabledStatus.EmployeeId = userEmployeeData.Id;

            await _repository.DisabledStatus.InsertAsync(addDisabledStatus);

            return new ApiResult();
        }

        [ValidationAspect(typeof(EditDisabledStatusValidator))]
        [TransactionScopeAspectAsync]
        public async Task<ApiResult> EditDisabledStatus(BaseDisabledStatusModel editDisabledStatusModel, int id)
        {
            var userEmployeeData = EmployeeData;

            var editDisabledStatus = _repository.DisabledStatus.Where(x => x.EmployeeId == userEmployeeData.Id && x.Id == id).FirstOrDefault();

            if (editDisabledStatus != null)
            {
                editDisabledStatus.CategoryId = editDisabledStatusModel.CategoryId;
                editDisabledStatus.Percentage = editDisabledStatusModel.Percentage;
                editDisabledStatus.IsHealthReport = editDisabledStatusModel.IsHealthReport;
                editDisabledStatus.IsChronicHealth = editDisabledStatusModel.IsChronicHealth;
                editDisabledStatus.ChronicDescription = editDisabledStatusModel.ChronicDescription;
                editDisabledStatus.IsContinuousMedicationUse = editDisabledStatusModel.IsContinuousMedicationUse;
                editDisabledStatus.ContinuousMedicationUseDescription = editDisabledStatusModel.ContinuousMedicationUseDescription;
                editDisabledStatus.IsLossOfConsciousness = editDisabledStatusModel.IsLossOfConsciousness;
                editDisabledStatus.LossOfConsciousnessDescription = editDisabledStatusModel.LossOfConsciousnessDescription;
                editDisabledStatus.IsInfectiousDisease = editDisabledStatusModel.IsInfectiousDisease;
                editDisabledStatus.InfectiousDiseaseDescription = editDisabledStatusModel.InfectiousDiseaseDescription;

                await _repository.DisabledStatus.UpdateAsync(editDisabledStatus);

                _repository.Commit();

                return new ApiResult();
            }
            else
                return new ApiResult() { IsSuccess = false, Message = "Belirtilen Id de veri bulunamadı" };
        }

        public ApiResult<DetailDisabledStatusModel> GetAllDetailDisabledStatus()
        {
            var userEmployeeData = EmployeeData;

            var model = (from data in _repository.DisabledStatus.GetAll()
                         where !data.IsDeleted
                         select new DetailDisabledStatusModel
                         {
                             Id = data.Id,
                             CategoryId = data.CategoryId,
                             Percentage = data.Percentage,
                             IsHealthReport = data.IsHealthReport,
                             IsInfectiousDisease = data.IsInfectiousDisease,
                             InfectiousDiseaseDescription = data.InfectiousDiseaseDescription,
                             IsContinuousMedicationUse = data.IsInfectiousDisease,
                             ContinuousMedicationUseDescription = data.InfectiousDiseaseDescription,
                             IsChronicHealth = data.IsChronicHealth,
                             ChronicDescription = data.ChronicDescription,
                             IsLossOfConsciousness = data.IsLossOfConsciousness,
                             LossOfConsciousnessDescription = data.LossOfConsciousnessDescription
                         }).FirstOrDefault();

            return new ApiResult<DetailDisabledStatusModel>() { Data = model };
        }

        public async Task<ApiResult> DeleteDisabledStatus(int id)
        {
            var userEmployeeData = EmployeeData;

            var data = _repository.DisabledStatus.Where(x => x.Id == id && x.EmployeeId == userEmployeeData.Id).FirstOrDefault();

            if (data != null)
            {
                await _repository.DisabledStatus.DeleteAsync(data.Id);

                return new ApiResult();
            }
            else
                return new ApiResult() { IsSuccess = false, Message = "Belirtilen Id de data bulunamadı" };
        }

        #endregion

        #region Employee Image Process

        [ValidationAspect(typeof(FileValidator))]
        public async Task<ApiResult> AddEmployeeUserImage(IFormFile file)
        {
            var userEmployeeData = EmployeeData;

            if (file != null)
            {
                string path = _options.Folder.ImageFolder.EmployeeUserImagePath;//.Replace('\\', Path.DirectorySeparatorChar);
                var resultFile = await _fileService.FileUpload(file, userEmployeeData.ImageName, path);
                if (!resultFile.IsSuccess)
                    return new ApiResult
                    {
                        Message = "Dosya yüklenemedi",
                        StatusCode = StatusCodes.Status400BadRequest
                    };

                userEmployeeData.ImageName = resultFile.Data;

                await _repository.Employee.UpdateAsync(userEmployeeData);

                _repository.Commit();

                return new ApiResult();
            }
            else
                return new ApiResult { IsSuccess = false, Message = "Lütfen dosya yükleyiniz" };

        }

        public ApiResult GetUserImage()
        {
            var userEmployeeData = EmployeeData;

            if (!String.IsNullOrEmpty(userEmployeeData.ImageName))
            {
                string path = _options.Folder.ImageFolder.EmployeeUserImagePath;//.Replace('\\', Path.DirectorySeparatorChar);
                var resultFile = _fileService.FileDownload(userEmployeeData.ImageName, path);

                return new ApiResult() { Data = resultFile.Data };
            }
            else
                return new ApiResult() { IsSuccess = false, Message = "Profil resmi bulunamadı" };
        }

        public async Task<ApiResult> DeleteUserImage()
        {
            var userEmployeeData = EmployeeData;

            if (!String.IsNullOrEmpty(userEmployeeData.ImageName))
            {
                string path = _options.Folder.ImageFolder.EmployeeUserImagePath;//.Replace('\\', Path.DirectorySeparatorChar);
                _fileService.FileDelete(userEmployeeData.ImageName, path);

                userEmployeeData.ImageName = null;
                await _repository.Employee.UpdateAsync(userEmployeeData);

                _repository.Commit();

                return new ApiResult() { IsSuccess = true };
            }
            else
                return new ApiResult() { IsSuccess = false, Message = "Profil resmi bulunamadı" };
        }

        #endregion

        #region Certificate Information Process

        [ValidationAspect(typeof(AddCertificateInformationValidator))]
        [TransactionScopeAspectAsync]
        public async Task<ApiResult> AddCertificateInformation(AddCertificateInformationModel addCertificateInformationModel)
        {
            var userEmployeeData = EmployeeData;

            var addCertificateInformation = _mapper.Map<CertificateInformation>(addCertificateInformationModel);

            addCertificateInformation.EmployeeId = userEmployeeData.Id;

            await _repository.CertificateInformation.InsertAsync(addCertificateInformation);

            return new ApiResult();
        }

        [ValidationAspect(typeof(EditCertificateInformationValidator))]
        [TransactionScopeAspectAsync]
        public async Task<ApiResult> EditCertificateInformation(BaseCertificateInformationModel editCertificateInformationModel, int id)
        {
            var userEmployeeData = EmployeeData;

            var editCertificateInformation = _repository.CertificateInformation.Where(x => x.EmployeeId == userEmployeeData.Id && x.Id == id).FirstOrDefault();

            if (editCertificateInformation != null)
            {

                editCertificateInformation.CertificateName = editCertificateInformationModel.CertificateName;
                editCertificateInformation.CertificationInstitution = editCertificateInformationModel.CertificationInstitution;
                editCertificateInformation.StartDate = Convert.ToDateTime(editCertificateInformationModel.StartDate);
                editCertificateInformation.Description = editCertificateInformationModel.Description;

                await _repository.CertificateInformation.UpdateAsync(editCertificateInformation);

                _repository.Commit();

                return new ApiResult();
            }
            else
                return new ApiResult() { IsSuccess = false, Message = "Belirtilen Id de veri bulunamadı" };
        }

        public ApiResult<List<DetailCertificateInformationModel>> GetAllDetailCertificateInformation()
        {
            var userEmployeeData = EmployeeData;

            var model = (from data in _repository.CertificateInformation.GetAll()
                         where !data.IsDeleted && data.EmployeeId == userEmployeeData.Id
                         select new DetailCertificateInformationModel
                         {
                             Id = data.Id,
                             CertificateName = data.CertificateName,
                             CertificationInstitution = data.CertificationInstitution,
                             Description = data.Description,
                             StartDate = data.StartDate
                         }).ToList();

            return new ApiResult<List<DetailCertificateInformationModel>>() { Data = model };
        }

        public async Task<ApiResult> DeleteCertificateInformation(int id)
        {
            var userEmployeeData = EmployeeData;

            var data = _repository.CertificateInformation.Where(x => x.Id == id && x.EmployeeId == userEmployeeData.Id).FirstOrDefault();

            if (data != null)
            {
                data.IsDeleted = true;

                await _repository.CertificateInformation.UpdateAsync(data);
                _repository.Commit();
                return new ApiResult();
            }
            else
                return new ApiResult() { IsSuccess = false, Message = "Belirtilen Id de data bulunamadı" };
        }

        #endregion

        #region Ability Information Process

        [ValidationAspect(typeof(AddAbilityInformationValidator))]
        [TransactionScopeAspectAsync]
        public async Task<ApiResult> AddAbilityInformation(AddAbilityInformationModel addAbilityInformationModel)
        {
            var userEmployeeData = EmployeeData;

            var addAbilityInformation = _mapper.Map<AbilityInformation>(addAbilityInformationModel);

            addAbilityInformation.EmployeeId = userEmployeeData.Id;

            await _repository.AbilityInformation.InsertAsync(addAbilityInformation);

            return new ApiResult();
        }

        [ValidationAspect(typeof(EditAbilityInformationValidator))]
        [TransactionScopeAspectAsync]
        public async Task<ApiResult> EditAbilityInformation(BaseAbilityInformationModel1 editAbilityInformationModel, int id)
        {
            var userEmployeeData = EmployeeData;

            var editAbilityInformation = _repository.AbilityInformation.Where(x => x.EmployeeId == userEmployeeData.Id && x.Id == id).FirstOrDefault();

            if (editAbilityInformation != null)
            {

                editAbilityInformation.AbilityId = editAbilityInformationModel.AbilityId;
                editAbilityInformation.Degree = editAbilityInformationModel.Degree;
                editAbilityInformation.Description = editAbilityInformationModel.Description;

                await _repository.AbilityInformation.UpdateAsync(editAbilityInformation);

                _repository.Commit();

                return new ApiResult();
            }
            else
                return new ApiResult() { IsSuccess = false, Message = "Belirtilen Id de veri bulunamadı" };
        }

        public ApiResult<List<DetailAbilityInformationModel>> GetAllDetailAbilityInformation()
        {
            var userEmployeeData = EmployeeData;
            var _abilityData = (from data in EnumExtensions.EnumDictionary<Core.Enums.AbilityType>()
                                select new BaseUtilitiesModel
                                {
                                    Id = data.Key,
                                    Name = data.Value
                                });


            var model = (from data in _repository.AbilityInformation.GetAll()
                         where !data.IsDeleted && data.EmployeeId == userEmployeeData.Id
                         select new DetailAbilityInformationModel
                         {
                             Id = data.Id,
                             AbilityId = data.AbilityId,
                             AbilityName = "",
                             Degree = data.Degree,
                             Description = data.Description,
                         }).ToList();
            foreach (var data in model)
            {
                data.AbilityName = _abilityData.First(x => x.Id == data.AbilityId).Name;
            }


            return new ApiResult<List<DetailAbilityInformationModel>>() { Data = model };
        }

        public async Task<ApiResult> DeleteAbilityInformation(int id)
        {
            var userEmployeeData = EmployeeData;

            var data = _repository.AbilityInformation.Where(x => x.Id == id && x.EmployeeId == userEmployeeData.Id).FirstOrDefault();

            if (data != null)
            {
                data.IsDeleted = true;

                await _repository.AbilityInformation.UpdateAsync(data);
                _repository.Commit();
                return new ApiResult();
            }
            else
                return new ApiResult() { IsSuccess = false, Message = "Belirtilen Id de data bulunamadı" };
        }

        #endregion

        #region Social Media Information Process
        [ValidationAspect(typeof(AddSocialInformationValidator))]
        [TransactionScopeAspectAsync]
        public async Task<ApiResult> AddSocialMediaInformation(AddSocialMediaInformationModel addSocialMediaInformationModel)
        {
            var userEmployeeData = EmployeeData;

            if (_repository.SocialMediaInformation.Where(x => x.EmployeeId == userEmployeeData.Id).FirstOrDefault() != null)
                return new ApiResult() { IsSuccess = false, Message = "Bu kullanıcının kaydı zaten var" };

            var addSocialMediaInformation = _mapper.Map<SocialMediaInformation>(addSocialMediaInformationModel);

            addSocialMediaInformation.EmployeeId = userEmployeeData.Id;

            await _repository.SocialMediaInformation.InsertAsync(addSocialMediaInformation);

            return new ApiResult();
        }

        public ApiResult<DetailSocialMediaInformationModel> GetDetailSocialMediaInformation()
        {
            var userEmployeeData = EmployeeData;

            var model = (from data in _repository.SocialMediaInformation.GetAll()
                         where data.EmployeeId == userEmployeeData.Id
                         select new DetailSocialMediaInformationModel
                         {
                             Id = data.Id,
                             FacebookLink = data.FacebookLink,
                             InstagramLink = data.InstagramLink,
                             LinkedinLink = data.LinkedinLink,
                             TwitterLink = data.TwitterLink,
                             YoutubeLink = data.YoutubeLink
                         }).FirstOrDefault();

            return new ApiResult<DetailSocialMediaInformationModel> { Data = model };
        }

        [ValidationAspect(typeof(EditSocialInformationValidator))]
        [TransactionScopeAspectAsync]
        public async Task<ApiResult> EditSocialMediaInformation(BaseSocialMediaInformationModel editSocialMediaInformationModel, int id)
        {
            var userEmployeeData = EmployeeData;

            var data = _repository.SocialMediaInformation.Where(x => x.Id == id && x.EmployeeId == userEmployeeData.Id).FirstOrDefault();

            if (data != null)
            {
                data.YoutubeLink = editSocialMediaInformationModel.YoutubeLink;
                data.FacebookLink = editSocialMediaInformationModel.FacebookLink;
                data.LinkedinLink = editSocialMediaInformationModel.LinkedinLink;
                data.TwitterLink = editSocialMediaInformationModel.TwitterLink;
                data.InstagramLink = editSocialMediaInformationModel.InstagramLink;

                await _repository.SocialMediaInformation.UpdateAsync(data);

                _repository.Commit();

                return new ApiResult();
            }
            else
                return new ApiResult() { IsSuccess = false, Message = "Belirtilen Id de veri bulunamadı" };
        }

        #endregion

        #region Bank And Personal Information

        [ValidationAspect(typeof(AddBankAndPersonalInformationValidator))]
        [TransactionScopeAspectAsync]
        public async Task<ApiResult> AddBankAndPersonalInformation(AddBankAndPersonalInformationModel addBankAndPersonalInformationModel)
        {
            var userEmployeeData = EmployeeData;

            var data = _repository.BankAndPersonalInformation.FirstOrDefault(x => x.EmployeeId == userEmployeeData.Id);

            if (data == null)
            {
                var addBankAndPersonalInformation = _mapper.Map<BankAndPersonalInformation>(addBankAndPersonalInformationModel);

                addBankAndPersonalInformation.EmployeeId = userEmployeeData.Id;

                await _repository.BankAndPersonalInformation.InsertAsync(addBankAndPersonalInformation);

                return new ApiResult();
            }
            else
                return new ApiResult() { IsSuccess = false, Message = "Bu kullanıcının kaydı zaten var" };
        }

        public ApiResult<DetailBankAndPersonalInformationModel> GetDetailBankAndPersonalInformation()
        {
            var userEmployeeData = EmployeeData;

            var data = _repository.BankAndPersonalInformation.Where(x => x.EmployeeId == userEmployeeData.Id).FirstOrDefault();

            var responseData = _mapper.Map<DetailBankAndPersonalInformationModel>(data);

            return new ApiResult<DetailBankAndPersonalInformationModel>() { Data = responseData };
        }

        [ValidationAspect(typeof(EditBankAndPersonalInformationValidator))]
        [TransactionScopeAspectAsync]
        public async Task<ApiResult> EditBankAndPersonalInformation(BaseBankAndPersonalInformationModel editBankAndPersonalInformationModel, int id)
        {
            var userEmployeeData = EmployeeData;

            var data = _repository.BankAndPersonalInformation.Where(x => x.EmployeeId == userEmployeeData.Id && x.Id == id).FirstOrDefault();

            if (data != null)
            {
                data.BankName = editBankAndPersonalInformationModel.BankName;
                data.BranchName = editBankAndPersonalInformationModel.BranchName;
                data.BranchCode = editBankAndPersonalInformationModel.BranchCode;
                data.AccountName = editBankAndPersonalInformationModel.AccountName;
                data.IBAN = editBankAndPersonalInformationModel.IBAN;
                data.TCIdentityNumber = editBankAndPersonalInformationModel.TCIdentityNumber;
                data.TCSerialNumber = editBankAndPersonalInformationModel.TCSerialNumber;
                data.ExpiryDate = editBankAndPersonalInformationModel.ExpiryDate;
                data.FatherName = editBankAndPersonalInformationModel.FatherName;
                data.MotherName = editBankAndPersonalInformationModel.MotherName;
                data.IssuingAuthority = editBankAndPersonalInformationModel.IssuingAuthority;
                data.SettlementBarcodeNumber = editBankAndPersonalInformationModel.SettlementBarcodeNumber;
                data.CriminalRecordBarcodeNumber = editBankAndPersonalInformationModel.CriminalRecordBarcodeNumber;

                await _repository.BankAndPersonalInformation.UpdateAsync(data);

                _repository.Commit();

                return new ApiResult();
            }
            else
                return new ApiResult() { IsSuccess = false, Message = "Bu kullanıcının kaydı zaten var" };
        }

        #endregion

        #region Rating

        public async Task<ApiResult<List<EmployeeRatingResponse>>> GetEmployerRating(SkipTakeReq req)
        {
            var userEmployeeData = EmployeeData;
            if (userEmployeeData is null) return new ApiResult<List<EmployeeRatingResponse>>() { IsSuccess = false };

            var res = (from aj in _repository.ApplyForJob.Where(x => x.EmployeeId == userEmployeeData.Id)
                       join a in _repository.Ad.GetAll()
                        on aj.AdId equals a.Id
                       join r in _repository.Rating.Where(x => x.IsEmployer == true)
                        on aj.Id equals r.ApplyForJobId
                       join e in _repository.Employer.GetAll()
                        on r.CreatedUserId equals e.AspNetUserId
                       orderby r.Id
                       select new EmployeeRatingResponse
                       {
                           Id = r.Id,
                           ApplyForJobId = aj.Id,
                           JobId = a.JobId,
                           FirstName = e.FirstName,
                           LastName = e.LastName,
                           StartDate = a.WorkStartDate,
                           EndDate = a.WorkEndDate,
                           Rate = r.Rate,
                           Comment = r.Comment
                       })
                       .Skip(req.Skip)
                       .Take(req.Take)
            .ToList();


            foreach (var item in res)
            {

                if (!String.IsNullOrEmpty(item.Image))
                {
                    string path = _options.Folder.ImageFolder.EmployeeUserImagePath;//.Replace('\\', Path.DirectorySeparatorChar);
                    var resultFile = _fileService.FileDownload(item.Image, path);

                    item.Image = resultFile.Data;
                }

            }

            return new ApiResult<List<EmployeeRatingResponse>>() { IsSuccess = true, Data = res };
        }

        public async Task<ApiResult<List<EmployeeRatingResponse>>> GetMyRating(SkipTakeReq req)
        {
            var userEmployeeData = EmployeeData;
            if (userEmployeeData is null) return new ApiResult<List<EmployeeRatingResponse>>() { IsSuccess = false };

            var res = (from aj in _repository.ApplyForJob.Where(x => x.EmployeeId == userEmployeeData.Id && x.IsFinish == true)
                       join a in _repository.Ad.GetAll()
                        on aj.AdId equals a.Id
                       join e in _repository.Employer.GetAll()
                        on a.EmployerId equals e.Id
                       join r in _repository.Rating.Where(x => x.IsEmployer == false)
                        on aj.Id equals r.ApplyForJobId into ps_jointable
                       from p in ps_jointable.DefaultIfEmpty()
                       orderby aj.Id
                       select new EmployeeRatingResponse
                       {
                           ApplyForJobId = aj.Id,
                           JobId = a.JobId,
                           FirstName = e.FirstName,
                           LastName = e.LastName,
                           StartDate = a.WorkStartDate,
                           EndDate = a.WorkEndDate,
                           Rate = p == null ? 0 : p.Rate,
                           Comment = p == null ? "" : p.Comment,
                           Id = p == null ? 0 : p.Id
                       })
                       .Skip(req.Skip)
                       .Take(req.Take)
                       .ToList();

            return new ApiResult<List<EmployeeRatingResponse>>() { IsSuccess = true, Data = res };
        }

        public async Task<ApiResult> AddRating(EmployeeAddRatingModel req)
        {
            var afjObj = _repository.ApplyForJob.Where(x => x.Id == req.ApplyForJobId).FirstOrDefault();
            if (afjObj is null) return new ApiResult() { IsSuccess = false, Message = "ApplyForJobId bulunamadı." };
            if (!afjObj.IsFinish) return new ApiResult() { IsSuccess = false, Message = "İs henüz tamamlanmadı." };

            var userEmployeeData = EmployeeData;

            var IsExist = await _repository.Rating.
                FirstOrDefaultAsync(x => x.ApplyForJobId == req.ApplyForJobId && x.IsEmployer == false && x.CreatedUserId == userEmployeeData.AspNetUserId);
            if (IsExist is not null)
                return new ApiResult() { IsSuccess = false, Message = "Bu kullanıcı bu iş verene daha önce değerlendirmede bulundu." };

            var addRating = _mapper.Map<Rating>(req);

            addRating.IsEmployer = false;
            addRating.CreatedUserId = userEmployeeData.AspNetUserId;

            await _repository.Rating.InsertAsync(addRating);

            return new ApiResult();
        }

        public async Task<ApiResult> EditRating(EmployeeEditRatingModel req, int ratingId)
        {
            var userEmployeeData = EmployeeData;
            var rate = await _repository.Rating.FirstOrDefaultAsync(x => x.Id == ratingId);

            if (rate.CreatedUserId != userEmployeeData.AspNetUserId)
                return new ApiResult() { IsSuccess = false, Message = "Değerlendirmeyi sadece yapan kişi güncelleyebilir." };

            rate.Comment = req.Comment;
            rate.Rate = req.Rate;

            await _repository.Rating.UpdateAsync(rate);

            await _repository.CommitAsync();

            return new ApiResult() { IsSuccess = true };
        }

        #endregion

        #region CV

        public async Task<ApiResult<GetCVinfoResponse>> GetCVinfo(int employeeId)
        {
            var res = new GetCVinfoResponse();

            var employee = _repository.Employee.Where(x => x.Id == employeeId).FirstOrDefault();
            if (employee is null) return new ApiResult<GetCVinfoResponse>() { IsSuccess = false, Message = "Employee bulunamadı" };
            var _abilityData = (from data in EnumExtensions.EnumDictionary<Core.Enums.AbilityType>()
                                select new BaseUtilitiesModel
                                {
                                    Id = data.Key,
                                    Name = data.Value
                                });


            var rateDataList = (from afj in _repository.ApplyForJob.Where(x => x.EmployeeId == employeeId && x.IsFinish == true && x.IsDeleted == false)
                                join r in _repository.Rating.Where(x => x.IsEmployer == true)
                                    on afj.Id equals r.ApplyForJobId
                                select r.Rate
                            ).ToList();

            double rateData = 0;
            if (rateDataList.Count > 0)
                rateData = rateDataList.Average();

            res.Personal.FirstName = employee.FirstName;
            res.Personal.LastName = employee.LastName;
            res.Personal.Age = employee.BirthDate.CalculateAge();
            res.Personal.GenderValue = _utilityHelper.FindByID(employee.GenderId, CacheKeys.GetAllGenderType);
            res.Personal.NationalityValue = _utilityHelper.FindByID(employee.NationalityId, CacheKeys.GetAllNationality);
            res.Personal.Location = _utilityHelper.FindByID(employee.CityId, CacheKeys.GetAllCity) + " / " +
                                    _utilityHelper.FindDistrictByID(employee.CityId, employee.DistrictId);
            res.Personal.Rate = (int)Math.Round(rateData);

            res.WorkExperiences = (from data in _repository.WorkExperience.GetAll()
                                   where !data.IsDeleted && data.EmployeeId == employeeId
                                   select new DetailWorkExperienceModel
                                   {
                                       Id = data.Id,
                                       Description = data.Description,
                                       EndDate = data.EndDate,
                                       IsWorking = data.IsWorking,
                                       JobId = data.JobId,
                                       StartDate = data.StartDate,
                                       WorkingCompany = data.WorkingCompany,
                                       WorkingTypeId = data.WorkingTypeId
                                   }).ToList();

            res.EducationInformations = (from data in _repository.EducationInformation
                                         where !data.IsDeleted && data.EmployeeId == employeeId
                                         select new DetailEducationInformationModel
                                         {
                                             Id = data.Id,
                                             Description = data.Description,
                                             EndDate = data.EndDate,
                                             IsBreak = data.IsBreak,
                                             IsContinue = data.IsContinue,
                                             School = data.School,
                                             Section = data.Section,
                                             StartDate = data.StartDate
                                         }).ToList();

            res.CertificateInformations = (from data in _repository.CertificateInformation.GetAll()
                                           where !data.IsDeleted && data.EmployeeId == employeeId
                                           select new DetailCertificateInformationModel
                                           {
                                               Id = data.Id,
                                               CertificateName = data.CertificateName,
                                               CertificationInstitution = data.CertificationInstitution,
                                               Description = data.Description,
                                               StartDate = data.StartDate
                                           }).ToList();

            res.AbilityInformations = (from data in _repository.AbilityInformation.GetAll()
                                       where !data.IsDeleted && data.EmployeeId == employeeId
                                       select new DetailAbilityInformationModel
                                       {
                                           Id = data.Id,
                                           AbilityId = data.AbilityId,
                                           AbilityName = "",
                                           Degree = data.Degree,
                                           Description = data.Description,
                                       }).ToList();


            foreach (var data in res.AbilityInformations)
            {
                data.AbilityName = _abilityData.First(x => x.Id == data.AbilityId).Name;
            }



            return new ApiResult<GetCVinfoResponse>() { IsSuccess = true, Data = res };
        }

        #endregion

        #region Private Methods

        private ApiResult DataControl(EditEmployeeUserModel model)
        {
            #region Gender

            if (((GenderType)model.GenderId).GetDescription() == null)
                return new ApiResult() { IsSuccess = false, Message = "Bu id ye kayıtlı cinsiyet bulunamadı" };

            #endregion

            #region City

            if (_repository.City.FirstOrDefault(x => x.Id == model.CityId) == null)
                return new ApiResult() { IsSuccess = false, Message = "Bu id ye kayıtlı şehir bulunamadı" };

            #endregion

            #region District

            if (_repository.District.FirstOrDefault(x => x.Id == model.DistrictId) == null)
                return new ApiResult() { IsSuccess = false, Message = "Bu id ye kayıtlı ilçe bulunamadı" };

            #endregion

            #region MaritalStatus

            if (((MartialStatusType)model.MaritalStatusId).GetDescription() == null)
                return new ApiResult() { IsSuccess = false, Message = "Bu id ye kayıtlı medeni durum bulunamadı" };

            #endregion

            #region Driving Licence

            if (_repository.DrivingLicence.FirstOrDefault(x => x.Id == model.DrivingLicenceId) == null)
                return new ApiResult() { IsSuccess = false, Message = "Bu id ye kayıtlı ehliyet bulunamadı" };

            #endregion

            #region Nationality

            if (_repository.Nationality.FirstOrDefault(x => x.Id == model.DrivingLicenceId) == null)
                return new ApiResult() { IsSuccess = false, Message = "Bu id ye kayıtlı uyruk bulunamadı" };

            #endregion

            return new ApiResult() { IsSuccess = true };
        }

        #endregion

        #region Report
        public async Task<ApiResult<EmployeeReport>> Report()
        {
            var employeeData = EmployeeData;
            var ApplyForJob = _repository.ApplyForJob.Where(x => x.EmployeeId == employeeData.Id).ToList();
            var resualt = new EmployeeReport()
            {
                isApplyCount = ApplyForJob.Count,
                isFinisedCount = ApplyForJob.Where(x => x.IsFinish).Count()
            };

            return new ApiResult<EmployeeReport> { Data = resualt };
        }
        #endregion
    }
}