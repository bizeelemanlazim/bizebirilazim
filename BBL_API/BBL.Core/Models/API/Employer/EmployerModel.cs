namespace BBL.Core.Models.API.Employer
{
    #region Employer

    public class BaseEmployerUserModel
    {

        public int? CompanyTypeId { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CommercialTitle { get; set; }
        public string PhoneNumber { get; set; }
        public string TaxNumber { get; set; }
        public string TaxOffice { get; set; }
        public string RecordNumber { get; set; }
        public string MersisNumber { get; set; }
        public string Address { get; set; }
        public int? CityId { get; set; }
        public int? DistrictId { get; set; }
        public string FoundedDate { get; set; }
        public int? EmployeesCount { get; set; }
        public string ActivityFields { get; set; }
        public decimal? CapitalPrice { get; set; }
        public string Description { get; set; }
    }

    public class AddEmployerUserModel : BaseEmployerUserModel
    {
        public string AspNetUserId { get; set; }
    }

    public class DetailEmployerUserModel : BaseEmployerUserModel
    {
        public string City { get; set; }
        public string District { get; set; }
        public string ProfileImageUrl { get; set; }
    }

    public class EditEmployerUserModel : BaseEmployerUserModel
    {

    }

    #endregion

    #region Employer Price Rate


    public class EmployerPriceRate
    {
        public decimal CommissionFee { get; set; }
        public decimal LegalDeduction { get; set; }
    }

    #endregion

    #region Rating

    public class EmployerRatingResponse
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

    public class EmployerAddRatingModel : EmployerEditRatingModel
    {
        public int ApplyForJobId { get; set; }
    }

    public class EmployerEditRatingModel
    {
        public int Rate { get; set; }
        public string Comment { get; set; }
    }

    #endregion

    #region Report
    public class EmployerReport
    {
        public int isActiveAdCount { get; set; }
        public int isPassiveAdCount { get; set; }
        public AdReport AdReport { get; set; } = new AdReport();
        public List<ApplyCountForDate> MoonReport { get; set; } = new List<ApplyCountForDate> { };

    }
    public class AdReport
    {
        public int AdId { get; set; }
        public string jobName { get; set; }
        public int ApplyCount { get; set; }

    }

    public class ApplyCountForDate
    {
        public string Moon { get; set; }
        public int ApplyCount { get; set; }
        public int isActiveAdCount { get; set; }
        public int isPassiveAdCount { get; set; }


    }



    #endregion
}