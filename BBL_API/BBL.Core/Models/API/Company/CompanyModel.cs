namespace BBL.Core.Models.API.Company
{
    public class BaseCompanyModel
    {
        public string CompanyName { get; set; }
        public string Description { get; set; }
    }

    public class AddCompanyModel : BaseCompanyModel
    {
    }

    public class DetailCompanyModel : BaseCompanyModel
    {
        public int Id { get; set; }

    }

    public class EditCompanyModel : BaseCompanyModel
    {
        public int Id { get; set; }

    }
}
