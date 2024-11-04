using BBL.Core.Models.API.Company;
using System.Text.Json.Serialization;

namespace BBL.Core.Models.API.Ad
{
    #region Ad


    public class BaseAdModel
    {
        public int JobId { get; set; }
        public byte WorkType { get; set; }
        public List<Gender>? Gender { get; set; } = new List<Gender>();
        public string? WorkingTime { get; set; }//Mesai Suresi
        public DateTime WorkStartDate { get; set; }
        public DateTime WorkEndDate { get; set; }
        public string? WorkingStartTime { get; set; }//Mesai Baslangic Saati
        public string? Attribute { get; set; }
        public List<Criterion>? Criterion { get; set; } = new List<Criterion>();
        public bool IsMyAddress { get; set; }
        public int? CityId { get; set; } //
        public int? DistrictId { get; set; } //
        public int? SectorId { get; set; }
        public int? EducationId { get; set; }
        public int? ExperienceId { get; set; }

        public string? Address { get; set; }
        public decimal Price { get; set; }
        public bool IsMyRecruitment { get; set; }
    }
    public class BaseAdModel2
    {
        public int JobId { get; set; }
        public byte WorkType { get; set; }
        public List<Gender>? Gender { get; set; } = new List<Gender>();
        public string WorkingTime { get; set; }//Mesai Suresi
        public DateTime WorkStartDate { get; set; }
        public DateTime WorkEndDate { get; set; }
        public string WorkingStartTime { get; set; }//Mesai Baslangic Saati
        public string? Attribute { get; set; }
        public List<Criterion>? Criterion { get; set; } = new List<Criterion>(); 
        public bool IsMyAddress { get; set; }
        public int? CityId { get; set; } //
        public int? DistrictId { get; set; } //
        public int? SectorId { get; set; }
        public int? EducationId { get; set; }
        public string? Education { get; set; }
        public int? ExperienceId { get; set; }
        public string? Experience { get; set; }
        public string? Address { get; set; }
        public decimal Price { get; set; }
        public bool IsMyRecruitment { get; set; }
    }

    public class BaseAdModel3
    {
        public int JobId { get; set; }
        public int WorkType { get; set; }
        public List<Gender>? Gender { get; set; } = new List<Gender>();
        public string WorkingTime { get; set; }//Mesai Suresi
        public DateTime WorkStartDate { get; set; }
        public DateTime WorkEndDate { get; set; }
        public string WorkingStartTime { get; set; }//Mesai Baslangic Saati
        public string? Attribute { get; set; }
        public List<Criterion>? Criterion { get; set; } = new List<Criterion>();
        public bool IsMyAddress { get; set; }
        public int? CityId { get; set; } //
        public string? City { get; set; }
        public int? SectorId { get; set; }
        public int? EducationId { get; set; }
        public string? Education { get; set; }
        public int? ExperienceId { get; set; }
        public string? Experience { get; set; }
        public string? Sector { get; set; }
        public int? DistrictId { get; set; } //
        public string? District { get; set; }
        public string? Address { get; set; }
        public decimal Price { get; set; }
        public bool IsMyRecruitment { get; set; }
    }
    public class InsertAddModel : BaseAdModel
    {
    }

    public class EditAddModel : BaseAdModel
    {
        public int Id { get; set; }

        public bool IsActive { get; set; }
    }

    public class EditAddActive 
    {
        public int Id { get; set; }

        public bool IsActive { get; set; }
    }

    public class DetailAdModel : BaseAdModel2
    {
        public int Id { get; set; }

        public bool IsActive { get; set; }
    }
    public class DetailAdModel2 : BaseAdModel3
    {
        public int Id { get; set; }

        public bool IsActive { get; set; }

        public string JobName { get; set; }
    }

    public class CompanyModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }


    public class InsertAdAndOrderSummary
    {
        public InsertAddModel InsertAddModel { get; set; }
        public InsertOrderSummaryModel InsertOrderSummaryModel { get; set; }
    }

    public class EditAdAndOrderSummary
    {
        public EditAddModel EditAddModel { get; set; }
        public EditOrderSummaryModel EditOrderSummaryModel { get; set; } =new EditOrderSummaryModel();
    }
    /*
    public class DetailAdAndOrderSummaryCount
    {
        public int TotalCount { get; set; }
        public List<DetailAdAndOrderSummary> data { get; set; } = new List<DetailAdAndOrderSummary>();

    }
    */
    public class DetailAdAndOrderSummary
    {
        public CompanyModel DetailCompanyModel { get; set; }
        public DetailAdModel DetailAdModel { get; set; }
        public DetailOrderSummary DetailOrderSummary { get; set; }
    }

    public class DetailAdAndOrderSummary2
    {
        public CompanyModel DetailCompanyModel { get; set; }
        public DetailAdModel2 DetailAdModel { get; set; }
        public DetailOrderSummary DetailOrderSummary { get; set; }
    }

    public class Criterion
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
    public class WorkType
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
    public class Gender
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
    #endregion

    #region Employee
    public class EmployeeUserApplyForAJobModelCount
    {
        public int TotalCount { get; set; }
        public List<EmployeeUserApplyForAJobModel> data { get; set; } = new List<EmployeeUserApplyForAJobModel>();
    }

    public class EmployeeUserApplyForAJobModel
    {
        public int? Id { get; set; }
        [JsonIgnore]
        public string? ImageName { get; set; } = "";
        public string? Image { get; set; } = "";
        public int? ApplyForJobId { get; set; }
        public string City { get; set; }
        public string Gender { get; set; }
        public string Nationality { get; set; }
        public string? Name { get; set; }
        public int? Age { get; set; }
        public bool? IsApply { get; set; }
    }
    #endregion

    #region OrderSummary

    public class BaseOrderSummaryModel
    {
        public string? JobName { get; set; } = null!;
        public string? OperationTime { get; set; }
        public string? Location { get; set; }
        public decimal ProgressPayment { get; set; }
        public decimal LegalDeduction { get; set; }
        public decimal CommissionFee { get; set; }
        public decimal TotalFees { get; set; }
        public int? CityId { get; set; }
        public int? DistrictId { get; set; }
    }

    public class InsertOrderSummaryModel : BaseOrderSummaryModel
    {

    }

    public class EditOrderSummaryModel : BaseOrderSummaryModel
    {
        public int Id { get; set; }
    }

    public class DetailOrderSummary : BaseOrderSummaryModel
    {
        public int Id { get; set; }
    }

    #endregion
}
