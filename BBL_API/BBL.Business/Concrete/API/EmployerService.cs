using AutoMapper;
using BBL.Business.Abstract.API;
using BBL.Business.Concrete.Base;
using BBL.Business.Helpers.Abstract;
using BBL.Business.Middleware.Authorization;
using BBL.Business.ValidationRules.FluentValidation.API.EmployerValidation;
using BBL.Business.ValidationRules.FluentValidation.API.File;
using BBL.Core.Aspects.Autofac.Transaction;
using BBL.Core.Aspects.Autofac.Validation;
using BBL.Core.Constants;
using BBL.Core.Models.API.Base;
using BBL.Core.Models.API.Employee;
using BBL.Core.Models.API.Employer;
using BBL.Core.Models.Application;
using BBL.Core.Utilities.Results;
using BBL.DataAccess.EntityFramework.UnityOfWork;
using BBL.Entities.Concrete;
using BBL.Entities.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using IResult = BBL.Core.Utilities.Results.IResult;

namespace BBL.Business.Concrete.API
{
    [AuthorizeBySelectedRole(UserRoles.Employer)]

    public class EmployerService : BBLServiceBase, IEmployerService
    {
        public readonly IMapper _mapper;
        private readonly IFileService _fileService;
        private readonly ApplicationSettingsModel _options;
        private readonly IUtilitiesService _utilitiesService;

        public EmployerService(
            IUowBBL repository,
            IHttpContextAccessor httpContextAccessor,
            UserManager<ApplicationUser> userManager,
            IMapper mapper,
            IFileService fileService,
            IOptions<ApplicationSettingsModel> options,
            IUtilitiesService utilitiesService) : base(repository, httpContextAccessor, userManager)
        {
            _mapper = mapper;
            _fileService = fileService;
            _options = options.Value;
            _utilitiesService = utilitiesService;
        }

        #region Employer

        public async Task<IResult> AddUser(AddEmployerUserModel addEmployerUser)
        {
            var addEmployer = _mapper.Map<Employer>(addEmployerUser);

            var employerId = await _repository.Employer.InsertAndGetIdAsync(addEmployer);

            await _repository.EmployerPriceRate.InsertAsync(new BBL.Entities.Concrete.EmployerPriceRate { EmployerId = employerId });

            return new Result();
        }

        public async Task<ApiResult<DetailEmployerUserModel>> GetUserDetail()
        {
            var data = this.EmployerData;

            var _cityData = _utilitiesService.GetAllCity().Data;
            var _district = _utilitiesService.GetAllDistrict(data.CityId ?? 0).Data;

            if (data != null)
            {
                var detailUser = _mapper.Map<DetailEmployerUserModel>(data);
                detailUser.City = data.CityId.HasValue ? _cityData.First(x => x.Id == data.CityId).Name : "Belirtmek istemiyorum";
                detailUser.District = data.DistrictId.HasValue ? _district.FirstOrDefault(x => x.Id == data.DistrictId)?.Name ?? "Belirtmek istemiyorum" : "Belirtmek istemiyorum";

                return new ApiResult<DetailEmployerUserModel> { Data = detailUser };
            }
            else
                return new ApiResult<DetailEmployerUserModel> { IsSuccess = false, Message = "İş arayan kimliği bulunamadı" };


        }

        [ValidationAspect(typeof(UpdateEmployerUserValidator))]
        [TransactionScopeAspectAsync]
        public async Task<ApiResult> UpdateUser(EditEmployerUserModel updateEmployerUser)
        {
            var _employerData = EmployerData;

            _employerData.CompanyTypeId = updateEmployerUser.CompanyTypeId;
            _employerData.Email = updateEmployerUser.Email;
            _employerData.FirstName = updateEmployerUser.FirstName;
            _employerData.LastName = updateEmployerUser.LastName;
            _employerData.CommercialTitle = updateEmployerUser.CommercialTitle;
            _employerData.PhoneNumber = updateEmployerUser.PhoneNumber;
            _employerData.TaxNumber = updateEmployerUser.TaxNumber;
            _employerData.TaxOffice = updateEmployerUser.TaxOffice;
            _employerData.RecordNumber = updateEmployerUser.RecordNumber;
            _employerData.MersisNumber = updateEmployerUser.MersisNumber;
            _employerData.Address = updateEmployerUser.Address;
            _employerData.CityId = updateEmployerUser.CityId;
            _employerData.DistrictId = updateEmployerUser.DistrictId;
            _employerData.FoundedDate = updateEmployerUser.FoundedDate;
            _employerData.EmployeesCount = updateEmployerUser.EmployeesCount;
            _employerData.ActivityFields = updateEmployerUser.ActivityFields;
            _employerData.CapitalPrice = updateEmployerUser.CapitalPrice;
            _employerData.Description = updateEmployerUser.Description;


            _employerData.ModifiedDate = DateTime.Now;
            _employerData.ModifiedUserId = _employerData.AspNetUserId;

            _repository.Employer.Update(_employerData);

            _repository.Commit();

            return new ApiResult();
        }

        #endregion

        #region Employer Price Rate

        public async Task<ApiResult<BBL.Core.Models.API.Employer.EmployerPriceRate>> GetUserPriceRate()
        {
            var data = _repository.EmployerPriceRate.FirstOrDefault(x => x.EmployerId == EmployerData.Id );

            if (data == null)
                return new ApiResult<Core.Models.API.Employer.EmployerPriceRate> { IsSuccess = false, Message = "Bu kullanıcıya ait kayır bulunamadı!" };

            var mapperData = _mapper.Map<BBL.Core.Models.API.Employer.EmployerPriceRate>(data);

            return new ApiResult<Core.Models.API.Employer.EmployerPriceRate> { Data = mapperData };
        }
        #endregion

        #region Employer Image Process

        [ValidationAspect(typeof(FileValidator))]
        public async Task<ApiResult> AddEmployerUserImage(IFormFile file)
        {
            var userEmployerData = EmployerData;

            if (file != null)
            {
                string path = _options.Folder.ImageFolder.EmployerUserImagePath;//.Replace('\\', Path.DirectorySeparatorChar);
                var resultFile = await _fileService.FileUpload(file, userEmployerData.ImageName, path);
                if (!resultFile.IsSuccess)
                    return new ApiResult
                    {
                        Message = "Dosya yüklenemedi",
                        StatusCode = StatusCodes.Status400BadRequest
                    };

                userEmployerData.ImageName = resultFile.Data;

                await _repository.Employer.UpdateAsync(userEmployerData);

                _repository.Commit();

                return new ApiResult();
            }
            else
                return new ApiResult { IsSuccess = false, Message = "Lütfen dosya yükleyiniz" };

        }

        public ApiResult GetUserImage()
        {
            var userEmployerData = EmployerData;

            if (!String.IsNullOrEmpty(userEmployerData.ImageName))
            {
                string path = _options.Folder.ImageFolder.EmployerUserImagePath;//.Replace('\\', Path.DirectorySeparatorChar);
                var resultFile = _fileService.FileDownload(userEmployerData.ImageName, path);

                return new ApiResult() { Data = resultFile.Data };
            }
            else
                return new ApiResult() { IsSuccess = false, Message = "Profil resmi bulunamadı" };
        }

        public async Task<ApiResult> DeleteUserImage()
        {
            var userEmployerData = EmployerData;

            if (!String.IsNullOrEmpty(userEmployerData.ImageName))
            {
                string path = _options.Folder.ImageFolder.EmployerUserImagePath;//.Replace('\\', Path.DirectorySeparatorChar);
                _fileService.FileDelete(userEmployerData.ImageName, path);

                userEmployerData.ImageName = null;
                await _repository.Employer.UpdateAsync(userEmployerData);

                _repository.Commit();

                return new ApiResult() { IsSuccess = true };
            }
            else
                return new ApiResult() { IsSuccess = false, Message = "Profil resmi bulunamadı" };
        }

        #endregion

        #region Rating

        public async Task<ApiResult<List<EmployerRatingResponse>>> GetEmployeeRating(SkipTakeReq req)
        {
            var userEmployerData = EmployerData;
            if (userEmployerData is null) return new ApiResult<List<EmployerRatingResponse>>() { IsSuccess = false };

            var res = (from aj in _repository.ApplyForJob.Where(x => x.EmployerId == userEmployerData.Id)
                       join a in _repository.Ad.GetAll()
                        on aj.AdId equals a.Id
                       join r in _repository.Rating.Where(x => x.IsEmployer == false)
                        on aj.Id equals r.ApplyForJobId
                       join e in _repository.Employee.GetAll()
                        on r.CreatedUserId equals e.AspNetUserId
                       orderby r.Id
                       select new EmployerRatingResponse
                       {
                           JobId = a.JobId,
                           FirstName = e.FirstName,
                           LastName = e.LastName,
                           StartDate = a.WorkStartDate,
                           EndDate = a.WorkEndDate,
                           Rate = r.Rate,
                           Comment = r.Comment,
                           ApplyForJobId = aj.Id,
                           Id = r.Id
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

            return new ApiResult<List<EmployerRatingResponse>>() { IsSuccess = true, Data = res };
        }

        public async Task<ApiResult<List<EmployerRatingResponse>>> GetMyRating(SkipTakeReq req)
        {
            var userEmployerData = EmployerData;
            if (userEmployerData is null) return new ApiResult<List<EmployerRatingResponse>>() { IsSuccess = false };

            var res = (from aj in _repository.ApplyForJob.Where(x => x.EmployerId == userEmployerData.Id && x.IsFinish == true)
                       join a in _repository.Ad.GetAll()
                        on aj.AdId equals a.Id
                       join e in _repository.Employee.GetAll()
                        on aj.EmployeeId equals e.Id
                       join r in _repository.Rating.Where(x => x.IsEmployer == true)
                        on aj.Id equals r.ApplyForJobId into ps_jointable
                       from p in ps_jointable.DefaultIfEmpty()
                       orderby aj.Id
                       select new EmployerRatingResponse
                       {
                           ApplyForJobId = aj.Id,
                           JobId = a.JobId,
                           FirstName = e.FirstName,
                           LastName = e.LastName,
                           StartDate = a.WorkStartDate,
                           EndDate = a.WorkEndDate,
                           Rate = p == null ? 0 : p.Rate,
                           Comment = p == null ? null : p.Comment,
                           Id = p == null ? null : p.Id,
                       })
                       .Skip(req.Skip)
                       .Take(req.Take)
                       .ToList();
            return new ApiResult<List<EmployerRatingResponse>>() { IsSuccess = true, Data = res };
        }

        public async Task<ApiResult> AddRating(EmployerAddRatingModel req)
        {
            var afjObj = _repository.ApplyForJob.Where(x => x.Id == req.ApplyForJobId).FirstOrDefault();
            if (afjObj is null) return new ApiResult() { IsSuccess = false, Message = "ApplyForJobId bulunamadı." };
            if (!afjObj.IsFinish) return new ApiResult() { IsSuccess = false, Message = "İs henüz tamamlanmadı." };

            var userEmployerData = EmployerData;

            var IsExist = await _repository.Rating.
                FirstOrDefaultAsync(x => x.ApplyForJobId == req.ApplyForJobId && x.IsEmployer == true && x.CreatedUserId == userEmployerData.AspNetUserId);
            if (IsExist is not null)
                return new ApiResult() { IsSuccess = false, Message = "Bu kullanıcı bu çalışana daha önce değerlendirmede bulundu." };

            var addRating = _mapper.Map<Rating>(req);

            addRating.IsEmployer = true;
            addRating.CreatedUserId = userEmployerData.AspNetUserId;

            await _repository.Rating.InsertAsync(addRating);

            return new ApiResult();
        }

        public async Task<ApiResult> EditRating(EmployerEditRatingModel req, int ratingId)
        {
            var userEmployerData = EmployerData;
            var rate = await _repository.Rating.FirstOrDefaultAsync(x => x.Id == ratingId);

            if (rate.CreatedUserId != userEmployerData.AspNetUserId)
                return new ApiResult() { IsSuccess = false, Message = "Değerlendirmeyi sadece yapan kişi güncelleyebilir." };

            rate.Comment = req.Comment;
            rate.Rate = req.Rate;

            await _repository.Rating.UpdateAsync(rate);

            await _repository.CommitAsync();

            return new ApiResult() { IsSuccess = true };
        }

        #endregion

        #region Report

        public async Task<ApiResult<EmployerReport>> Report(int id)
        {
            var _employerData = EmployerData;
            var isActiveAdCount = _repository.Ad.Where(x => x.EmployerId == _employerData.Id && x.IsActive == true).ToList().Count;
            var isPassiveAdCount = _repository.Ad.Where(x => x.EmployerId == _employerData.Id && x.IsActive == false).ToList().Count;
            var ad = _repository.Ad.Where(x=>x.Id == id).FirstOrDefault();
            var jobName = _repository.Job.Where(x=>x.Id == ad.JobId).FirstOrDefault().JobName;
            var adCreatedDate = ad.CreatedDate;
            var ApplyForJob = _repository.ApplyForJob.Where(x => x.AdId == id).ToList();
            var ApplyCount = ApplyForJob.Count;
            var resualt = new EmployerReport();
            resualt.isActiveAdCount = isActiveAdCount;
            resualt.isPassiveAdCount = isPassiveAdCount;
            resualt.AdReport.AdId = id;
            resualt.AdReport.jobName = jobName;

            var moonCount = (adCreatedDate.Year - DateTime.Today.Year) * 12 + adCreatedDate.Month - DateTime.Today.Month;
            moonCount = Math.Abs(moonCount);   
            
            var count = 0;
            for (int i = 0; i <= moonCount; i++)
            {
                var moonReport = new ApplyCountForDate();

                var moonCounter = (DateTime.Today.AddMonths(-count));
                moonReport.Moon = moonCounter.Month.ToString();
                count++;
                moonReport.ApplyCount= ApplyForJob.Where(x=>x.CreatedDate.Month == moonCounter.Month).Count();
                moonReport.isActiveAdCount = _repository.Ad.Where(x => x.EmployerId == _employerData.Id && x.IsActive == true && x.CreatedDate.Month == moonCounter.Month).ToList().Count();
                moonReport.isPassiveAdCount = _repository.Ad.Where(x => x.EmployerId == _employerData.Id && x.IsActive == false && x.CreatedDate.Month == moonCounter.Month).ToList().Count();

                resualt.MoonReport.Add(moonReport);
            }



            return new ApiResult<EmployerReport> { Data = resualt };

        }



        #endregion
    }
}