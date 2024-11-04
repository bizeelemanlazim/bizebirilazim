namespace BBL.Core.Models.API.Utilities
{
    public class BaseUtilitiesModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class NationalityModel : BaseUtilitiesModel { }

    public class DrivingLicenceModel : BaseUtilitiesModel { }

    public class CityAndDistrictModel
    {
        public CityModel City { get; set; }
        public List<DistrictModel> Districts { get; set; }
    }

    public class DistrictModel : BaseUtilitiesModel
    {
        public int CityId { get; set; }
        public string Description { get; set; }
    }

    public class CityModel : BaseUtilitiesModel
    {
        public string Description { get; set; }
    }

    public class JobModel : BaseUtilitiesModel
    {
        public string JobCode { get; set; }
    }

    public class WorkingTypeModel : BaseUtilitiesModel { }

    public class UserTypeModel : BaseUtilitiesModel { }

    public class MaritalStatusTypeModel : BaseUtilitiesModel { }

    public class GenderTypeModel : BaseUtilitiesModel { }
}