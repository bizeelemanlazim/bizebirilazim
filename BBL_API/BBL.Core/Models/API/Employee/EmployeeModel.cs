
using BBL.Core.Models.API.Ad;

namespace BBL.Core.Models.API.Employee
{
    #region Employee 

    public class BaseEmployeeUserModel
    {
        public int CityId { get; set; }
        public int DistrictId { get; set; }
        public int GenderId { get; set; }
        public int MaritalStatusId { get; set; }
        public int DrivingLicenceId { get; set; }
        public int NationalityId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string SecondPhoneNumber { get; set; }
        public string PlaceOfBirth { get; set; }
        public DateTime BirthDate { get; set; }
        public string Address { get; set; }
    }

    public class AddEmployeeUserModel : BaseEmployeeUserModel
    {
        public string AspNetUserId { get; set; }
    }

    public class DetailEmployeeUserModel : BaseEmployeeUserModel
    {
        public string City { get; set; }
        public string District { get; set; }
        public string MaritalStatus { get; set; }
        public string Nationality { get; set; }
        public string Gender { get; set; }

    }

    public class EditEmployeeUserModel : BaseEmployeeUserModel
    {

    }

    #endregion

    #region Ad Information
    public class BaseEmployeeAdModel
    {
        public int JobId { get; set; }
        public int? SectorId { get; set; }
        public int? EducationId { get; set; }
        public int? ExperienceId { get; set; }
        public int? EmployerId { get; set; }
        public string? EmployerName { get; set; }
        public string WorkingTime { get; set; }
        public DateTime? WorkStartDate { get; set; }
        public DateTime? WorkEndDate { get; set; }
        public string? WorkingStartTime { get; set; }
        public string? Attribute { get; set; }
        public List<Criterion> Criterion { get; set; } = new List<Criterion>();
        public byte WorkType { get; set; }
        public string? Gender { get; set; }
        public bool? IsMyAddress { get; set; }
        public string? Address { get; set; }
        public decimal? Price { get; set; }
        public bool? IsMyRecruitment { get; set; }
    }

    public class DetailEmployeeAdModel : BaseEmployeeAdModel
    {
        public int Id { get; set; }

        public bool IsActive { get; set; }
    }

    public class DetailEmployeeAdModel2 : BaseEmployeeAdModel
    {
        public int Id { get; set; }

        public bool IsActive { get; set; }

        public bool IsApplied { get; set; }
    }

    public class DetailEmployeeAdAndOrderSummaryCount
    {
        public int TotalCount { get; set; }
        public List<DetailEmployeeAdAndOrderSummary> data { get; set; } = new List<DetailEmployeeAdAndOrderSummary>();

    }

    public class DetailEmployeeAdAndOrderSummary
    {
        public DetailEmployeeAdModel2 DetailAdModel { get; set; }
        public DetailOrderSummary DetailOrderSummary { get; set; }
    }
    public class ApplyForAJobListDetailEmployeeAdAndOrderSummaryCount
    {
        public int TotalCount { get; set; }
        public List<ApplyForAJobListDetailEmployeeAdAndOrderSummary> data { get; set; } = new List<ApplyForAJobListDetailEmployeeAdAndOrderSummary>();
    }
    public class ApplyForAJobListDetailEmployeeAdAndOrderSummary
    {
        public int ApplyForAJobId { get; set; }
        public DetailEmployeeAdModel DetailAdModel { get; set; }
        public DetailOrderSummary DetailOrderSummary { get; set; }
    }

    public class DetailEmployeeAdAndOrderSummaryFilter
    {
        public string? searchJobOrEmployer { get; set; }
        public List<int>? CityId { get; set; } = new List<int>();
        public List<int>? DistrictId { get; set; } = new List<int>();
        public List<int>? JobId { get; set; } = new List<int>(); //Pozisyon
        public List<int>? SektorId { get; set; } = new List<int>(); //Sektor
        public List<int>? WorkingTypeId { get; set; } = new List<int>(); //Çalışma Tipleri
        public int? EducationId { get; set; }
        public int? ExperienceId { get; set; }
        public int? GenderId { get; set; }
        //public string? Education { get; set; }
        //public string? Experiens { get; set; }

    }

    #endregion

    #region Work Experience

    public class BaseWorkExperienceModel
    {
        public int JobId { get; set; }
        public int WorkingTypeId { get; set; }
        public bool IsWorking { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string WorkingCompany { get; set; }
        public string? Description { get; set; }
    }

    public class AddWorkExperienceModel : BaseWorkExperienceModel
    {

    }

    public class EditWorkExperienceModel : BaseWorkExperienceModel
    {
        public int Id { get; set; }
    }

    public class DetailWorkExperienceModel : BaseWorkExperienceModel
    {
        public int Id { get; set; }
        public string Job { get; set; }
    }

    #endregion

    #region Education Information

    public class BaseEducationInformationModel
    {
        public string School { get; set; }
        public string Section { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? Description { get; set; }
        public bool IsContinue { get; set; }
        public bool IsBreak { get; set; }
    }

    public class AddEducationInformationModel : BaseEducationInformationModel
    {

    }

    public class EditEducationInformationModel : BaseEducationInformationModel
    {
        public int Id { get; set; }
    }

    public class DetailEducationInformationModel : BaseEducationInformationModel
    {
        public int Id { get; set; }
    }

    #endregion

    #region Skill Information

    public class BaseSkillInformationModel
    {
        public string SkillName { get; set; }
        public string Description { get; set; }
        public int Rating { get; set; }
    }

    public class AddSkillInformationModel : BaseSkillInformationModel
    {

    }

    public class EditSkillInformationModel : BaseSkillInformationModel
    {
        public int Id { get; set; }
    }

    public class DetailSkillInformationModel : BaseSkillInformationModel
    {
        public int Id { get; set; }
    }

    #endregion

    #region Disabled Status

    public class BaseDisabledStatusModel
    {
        public int CategoryId { get; set; }
        public int Percentage { get; set; }
        public bool IsHealthReport { get; set; }
        public bool IsChronicHealth { get; set; }
        public string ChronicDescription { get; set; }
        public bool IsContinuousMedicationUse { get; set; }
        public string ContinuousMedicationUseDescription { get; set; }
        public bool IsLossOfConsciousness { get; set; }
        public string LossOfConsciousnessDescription { get; set; }
        public bool IsInfectiousDisease { get; set; }
        public string InfectiousDiseaseDescription { get; set; }
    }

    public class AddDisabledStatusModel : BaseDisabledStatusModel
    {

    }

    public class EditDisabledStatusModel : BaseDisabledStatusModel
    {
        public int Id { get; set; }
    }

    public class DetailDisabledStatusModel : BaseDisabledStatusModel
    {
        public int Id { get; set; }
    }

    #endregion

    #region Certificate Information

    public class BaseCertificateInformationModel
    {
        public string CertificateName { get; set; }
        public string CertificationInstitution { get; set; }
        public DateTime StartDate { get; set; }
        public string Description { get; set; }
    }

    public class AddCertificateInformationModel : BaseCertificateInformationModel
    {

    }

    public class EditCertificateInformationModel : BaseCertificateInformationModel
    {
        public int Id { get; set; }
    }

    public class DetailCertificateInformationModel : BaseCertificateInformationModel
    {
        public int Id { get; set; }
    }

    #endregion

    #region Ability Information

    public class BaseAbilityInformationModel
    {
        public int AbilityId { get; set; }
        public string AbilityName { get; set; }
        public string Description { get; set; }
        public int Degree { get; set; }
    }
    public class BaseAbilityInformationModel1
    {
        public int AbilityId { get; set; }
        public string Description { get; set; }
        public int Degree { get; set; }
    }

    public class AddAbilityInformationModel : BaseAbilityInformationModel1
    {

    }

    public class EditAbilityInformationModel : BaseAbilityInformationModel
    {
        public int Id { get; set; }
    }

    public class DetailAbilityInformationModel : BaseAbilityInformationModel
    {
        public int Id { get; set; }
    }

    #endregion

    #region Social Media Information

    public class BaseSocialMediaInformationModel
    {
        public string YoutubeLink { get; set; }
        public string LinkedinLink { get; set; }
        public string InstagramLink { get; set; }
        public string FacebookLink { get; set; }
        public string TwitterLink { get; set; }
    }

    public class AddSocialMediaInformationModel : BaseSocialMediaInformationModel
    {

    }

    public class EditSocialMediaInformationModel : BaseSocialMediaInformationModel
    {
        public int Id { get; set; }
    }

    public class DetailSocialMediaInformationModel : BaseSocialMediaInformationModel
    {
        public int Id { get; set; }
    }

    #endregion

    #region Bank And Personal Information

    public class BaseBankAndPersonalInformationModel
    {
        public string BankName { get; set; }
        public string BranchName { get; set; }
        public string BranchCode { get; set; }
        public string AccountName { get; set; }
        public string IBAN { get; set; }
        public string TCIdentityNumber { get; set; }
        public string TCSerialNumber { get; set; }

        public DateTime ExpiryDate { get; set; }
        public string FatherName { get; set; }
        public string MotherName { get; set; }
        public string IssuingAuthority { get; set; }
        public string SettlementBarcodeNumber { get; set; }
        public string CriminalRecordBarcodeNumber { get; set; }
    }

    public class AddBankAndPersonalInformationModel : BaseBankAndPersonalInformationModel
    {

    }

    public class EditBankAndPersonalInformationModel : BaseBankAndPersonalInformationModel
    {
        public int Id { get; set; }
    }

    public class DetailBankAndPersonalInformationModel : BaseBankAndPersonalInformationModel
    {
        public int Id { get; set; }
    }

    #endregion

    #region Rating

    public class EmployeeRatingResponse
    {
        public int? Id { get; set; }
        public string? Image { get; set; } = "";
        public int ApplyForJobId { get; set; }
        public int JobId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int Rate { get; set; }
        public string? Comment { get; set; }
    }

    public class EmployeeAddRatingModel
    {
        public int ApplyForJobId { get; set; }
        public int Rate { get; set; }
        public string Comment { get; set; }
    }

    public class EmployeeEditRatingModel
    {
        public int Rate { get; set; }
        public string Comment { get; set; }
    }

    #endregion

    #region CV
    public class GetCVinfoResponse
    {
        public GetCVinfoResponsePersonal Personal { get; set; } = new GetCVinfoResponsePersonal();
        public List<DetailWorkExperienceModel> WorkExperiences { get; set; } = new();
        public List<DetailEducationInformationModel> EducationInformations { get; set; } = new();
        public List<DetailCertificateInformationModel> CertificateInformations { get; set; } = new();
        public List<DetailAbilityInformationModel> AbilityInformations { get; set; } = new();
    }

    public class GetCVinfoResponsePersonal
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string GenderValue { get; set; }
        public string NationalityValue { get; set; }
        public string Location { get; set; }
        public int Rate { get; set; }
    }
    #endregion

    #region Report
    public class EmployeeReport
    {
        public int isApplyCount { get; set; }
        public int isFinisedCount { get; set; }

    }
    #endregion
}