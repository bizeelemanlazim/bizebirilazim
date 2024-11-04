using BBL.Core.Models.API.Ad;
using BBL.Core.Models.API.Employee;

namespace BBL.Core.Models.API.Application
{
    public class DetailApplicationModel
    {
        public List<DetailAdModel> DetailAdModels { get; set; }
        public List<DetailApplicationEmployeeUserModel> DetailApplicationEmployeeUserModels { get; set; }
    }

    public class EditApplicationModel
    {
        public int ApplicationId { get; set; }
        public bool IsApproval { get; set; }
    }

    public class DetailApplicationEmployeeUserModel
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Age { get; set; }
        public string Location { get; set; }
        public string Gender { get; set; }
        public string Nationality { get; set; }
        public string EmployeeImageLink { get; set; }
        public List<DetailWorkExperienceModel> DetailWorkExperienceModels { get; set; }
        public List<DetailEducationInformationModel> DetailEducationInformationModels { get; set; }
        public List<DetailSkillInformationModel> DetailSkillInformationModels { get; set; }
        public List<DetailCertificateInformationModel> DetailCertificateInformationModels { get; set; }
    }
}
