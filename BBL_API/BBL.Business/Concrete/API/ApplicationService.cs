using AutoMapper;
using BBL.Business.Abstract.API;
using BBL.Business.Concrete.Base;
using BBL.Core.Enums;
using BBL.Core.Models.API.Ad;
using BBL.Core.Models.API.Application;
using BBL.Core.Utilities.Results;
using BBL.DataAccess.EntityFramework.UnityOfWork;
using BBL.Entities.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace BBL.Business.Concrete.API
{
    public class ApplicationService : BBLServiceBase, IApplicationService
    {
        public readonly IMapper _mapper;

        public ApplicationService(
            IMapper mapper,
            IUowBBL repository,
            IHttpContextAccessor httpContextAccessor,
            UserManager<ApplicationUser> userManager) : base(repository, httpContextAccessor, userManager)
        {
            _mapper = mapper;
        }

        public async Task<ApiResult<List<DetailApplicationModel>>> DetailApplicationModel(bool isActiveAd)
        {
            var _employerData = EmployerData;

            var result = (from applicationData in _repository.Application.GetAll()
                          join employeeData in _repository.Employee.GetAll()
                                on applicationData.EmployeeId equals employeeData.Id
                          join adData in _repository.Ad.GetAll()
                                on applicationData.AdId equals adData.Id
                          join nationalityData in _repository.Nationality.GetAll()
                                on employeeData.NationalityId equals nationalityData.Id
                          join certificaData in _repository.CertificateInformation.GetAll()
                                on employeeData.Id equals certificaData.EmployeeId into certificaData
                          from certificaDatax in certificaData.DefaultIfEmpty()
                          join educationData in _repository.EducationInformation.GetAll()
                                on employeeData.Id equals educationData.EmployeeId into educationData
                          from educationDatax in educationData.DefaultIfEmpty()
                          join skillData in _repository.SkillInformation.GetAll()
                                on employeeData.Id equals skillData.EmployeeId into skillData
                          from skillDatax in skillData.DefaultIfEmpty()
                          join workExperienceData in _repository.WorkExperience.GetAll()
                                on employeeData.Id equals workExperienceData.EmployeeId into workExperienceData
                          from workExperienceDatax in workExperienceData.DefaultIfEmpty()
                          where adData.EmployerId == _employerData.Id && adData.IsActive == isActiveAd
                          select new
                          {
                              ApplicationData = applicationData,
                              EmployeeData = employeeData,
                              AdData = adData,
                              NationalityData = nationalityData,
                              CertificaData = certificaDatax,
                              EducationData = educationDatax,
                              SkillData = skillDatax,
                              WorkExperienceData = workExperienceDatax
                          })
                          .Select(x => new DetailApplicationModel
                          {
                              DetailAdModels = new List<DetailAdModel>
                              {
                                  new DetailAdModel
                                  {
                                       Id = x.AdData.Id,
                                       Address = x.AdData.Address,
                                       Attribute = x.AdData.Attribute,
                                       Criterion = JsonConvert.DeserializeObject<List<Criterion>>(x.AdData.Criterion),
                                       IsActive = x.AdData.IsActive,
                                       IsMyAddress = x.AdData.IsMyAddress,
                                       IsMyRecruitment = x.AdData.IsMyRecruitment,
                                       JobId = x.AdData.JobId,
                                       Price = x.AdData.Price,
                                       WorkEndDate = x.AdData.WorkEndDate,
                                       WorkingStartTime = x.AdData.WorkingStartTime.ToString(),
                                       WorkingTime = x.AdData.WorkingTime.ToString(),
                                       WorkStartDate = x.AdData.WorkStartDate
                                  }
                              },
                              DetailApplicationEmployeeUserModels = new List<DetailApplicationEmployeeUserModel>
                              {
                                  new DetailApplicationEmployeeUserModel
                                  {
                                      EmployeeId=x.EmployeeData.Id,
                                      Age=GetAge(x.EmployeeData.BirthDate.Value).ToString(),
                                      EmployeeImageLink="",
                                      FirstName=x.EmployeeData.FirstName,
                                      LastName=x.EmployeeData.LastName,
                                      Location=x.EmployeeData.Address,
                                      Gender=((UserType)x.EmployeeData.GenderId).GetDescription(),
                                      Nationality=x.NationalityData.Name,
                                      DetailCertificateInformationModels=new List<Core.Models.API.Employee.DetailCertificateInformationModel>
                                      {
                                          new Core.Models.API.Employee.DetailCertificateInformationModel
                                          {
                                              Id=x.CertificaData.Id,
                                              CertificateName=x.CertificaData.CertificateName,
                                              CertificationInstitution=x.CertificaData.CertificationInstitution,
                                              Description=x.CertificaData.Description,
                                              StartDate=x.CertificaData.StartDate
                                          }
                                      },
                                      DetailEducationInformationModels=new List<Core.Models.API.Employee.DetailEducationInformationModel>
                                      {
                                          new Core.Models.API.Employee.DetailEducationInformationModel
                                          {
                                              Id=x.EducationData.Id,
                                              StartDate=x.EducationData.StartDate,
                                              Description=x.EducationData.Description,
                                              EndDate=x.EducationData.EndDate,
                                              IsBreak=x.EducationData.IsBreak,
                                              IsContinue=x.EducationData.IsContinue,
                                              School=x.EducationData.School,
                                              Section=x.EducationData.Section
                                          }
                                      },
                                      DetailSkillInformationModels=new List<Core.Models.API.Employee.DetailSkillInformationModel>
                                      {
                                          new Core.Models.API.Employee.DetailSkillInformationModel
                                          {
                                              Id=x.SkillData.Id,
                                              Description=x.SkillData.Description,
                                              Rating=x.SkillData.Rating,
                                              SkillName=x.SkillData.SkillName
                                          }
                                      },
                                      DetailWorkExperienceModels=new List<Core.Models.API.Employee.DetailWorkExperienceModel>
                                      {
                                          new Core.Models.API.Employee.DetailWorkExperienceModel
                                          {
                                              Id=x.WorkExperienceData.Id,
                                              Description = x.WorkExperienceData.Description,
                                              EndDate=x.WorkExperienceData.EndDate,
                                              IsWorking=x.WorkExperienceData.IsWorking,
                                              JobId=x.WorkExperienceData.JobId,
                                              StartDate=x.WorkExperienceData.StartDate,
                                              WorkingCompany=x.WorkExperienceData.WorkingCompany,
                                              WorkingTypeId=x.WorkExperienceData.WorkingTypeId
                                          }
                                      }
        }
                              }
                          }).ToList();

            return new ApiResult<List<DetailApplicationModel>>() { Data = result };
        }

        public async Task<ApiResult> UpdateAd(EditApplicationModel editApplicationModel)
        {
            var _employerData = EmployerData;

            var applicationData = _repository.Application.Where(x => x.Id == editApplicationModel.ApplicationId && x.EmployeeId == _employerData.Id).FirstOrDefault();

            if (applicationData == null)
                return new ApiResult()
                {
                    IsSuccess = false,
                    Message = "Bu kullanıcının başvurusu bulunumadı"
                };

            applicationData.IsApproval = editApplicationModel.IsApproval;
            applicationData.CreatedApprovalDate = DateTime.Now;

            return new ApiResult();
        }

        #region Private Methods

        public Int32 GetAge(DateTime dateOfBirth)
        {
            var today = DateTime.Today;

            var a = (today.Year * 100 + today.Month) * 100 + today.Day;
            var b = (dateOfBirth.Year * 100 + dateOfBirth.Month) * 100 + dateOfBirth.Day;

            return (a - b) / 10000;
        }

        #endregion
    }
}
