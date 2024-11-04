namespace BBL.Models.Business.API.Employee
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
        public string BirthDate { get; set; }
        public string Address { get; set; }
    }

    public class AddEmployeeUserModel : BaseEmployeeUserModel
    {
        public string AspNetUserId { get; set; }
    }

    public class DetailEmployeeUserModel : BaseEmployeeUserModel
    {

    }

    public class EditEmployeeUserModel : BaseEmployeeUserModel
    {

    }

    #endregion

    #region Work Experience

    public class BaseWorkExperienceModel
    {
        public int JobId { get; set; }
        public int WorkingTypeId { get; set; }
        public bool IsWorking { get; set; }
        public string StartDate { get; set; }
        public string? EndDate { get; set; }
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
    }

    #endregion

    #region Education Information

    public class BaseEducationInformationModel
    {
        public string School { get; set; }
        public string Section { get; set; }
        public string StartDate { get; set; }
        public string? EndDate { get; set; }
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
        public string StartDate { get; set; }
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
        public string ExpiryDate { get; set; }
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
}