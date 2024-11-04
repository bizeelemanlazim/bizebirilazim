namespace BBL.Models.Business.API.Employer
{
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
        public string ProfileImageUrl { get; set; }
    }

    public class EditEmployerUserModel : BaseEmployerUserModel
    {

    }
}
