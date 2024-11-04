using System;
using BBL.Business.Abstract.API;
using BBL.Core.Middleware.Caching;
using BBL.Core.Models.API.Utilities;
using BBL.Core.Utilities.Results;
using BBL.DataAccess.EntityFramework.UnityOfWork;

namespace BBL.Business.Helpers.Concrete
{
    public class UtilityHelper
    {
        private readonly IUtilitiesService _utilitiesService;

        public UtilityHelper(IUtilitiesService utilitiesService)
        {
            _utilitiesService = utilitiesService;
        }

        public string FindByID(int? id, string listName)
        {
            if (!(id > 0)) return "-";

            List<BaseUtilitiesModel> res = listName switch
            {
                CacheKeys.GetAllGenderType => GetGenderList(),
                CacheKeys.GetAllCity => GetCityList(),
                CacheKeys.GetAllDrivingLicence => GetDrivingLicenceList(),
                CacheKeys.GetAllJob => GetJobList(id ?? 0),
                CacheKeys.GetAllMaritalStatusType => GetMaritalStatusTypeList(),
                CacheKeys.GetAllNationality => GetNationalityList(),
                CacheKeys.GetAllUserType => GetUserTypeList(),
                CacheKeys.GetAllWorkingType => GetWorkingTypeList(),
                _ => new List<BaseUtilitiesModel>(),
            };

            return res.FirstOrDefault(x => x.Id == id)?.Name ?? "Bulunamadı";
        }

        public string FindDistrictByID(int? cityId, int? districtId)
        {
            if (!(cityId > 0) || !(districtId > 0)) return "-";

            var res = _utilitiesService.GetAllDistrict(cityId ?? default).Data;
            
            return res.FirstOrDefault(x => x.Id == districtId)?.Name ?? "Bulunamadı";
        }

        private List<BaseUtilitiesModel> GetGenderList()
        {
            List<BaseUtilitiesModel> res = new();
            var list = _utilitiesService.GetAllGenderType().Data;
            list.ForEach(res.Add);
            return res;
        }

        private List<BaseUtilitiesModel> GetCityList()
        {
            List<BaseUtilitiesModel> res = new();
            var list = _utilitiesService.GetAllCity().Data;
            list.ForEach(res.Add);
            return res;
        }

        private List<BaseUtilitiesModel> GetDrivingLicenceList()
        {
            List<BaseUtilitiesModel> res = new();
            var list = _utilitiesService.GetAllDrivingLicence().Data;
            list.ForEach(res.Add);
            return res;
        }

        private List<BaseUtilitiesModel> GetJobList(int id)
        {
            List<BaseUtilitiesModel> res = new();
            var data = _utilitiesService.FindJob(id).Data;
            res.Add(data);
            return res;
        }

        private List<BaseUtilitiesModel> GetMaritalStatusTypeList()
        {
            List<BaseUtilitiesModel> res = new();
            var list = _utilitiesService.GetAllMaritalStatusType().Data;
            list.ForEach(res.Add);
            return res;
        }

        private List<BaseUtilitiesModel> GetNationalityList()
        {
            List<BaseUtilitiesModel> res = new();
            var list = _utilitiesService.GetAllNationality().Data;
            list.ForEach(res.Add);
            return res;
        }

        private List<BaseUtilitiesModel> GetUserTypeList()
        {
            List<BaseUtilitiesModel> res = new();
            var list = _utilitiesService.GetAllUserType().Data;
            list.ForEach(res.Add);
            return res;
        }

        private List<BaseUtilitiesModel> GetWorkingTypeList()
        {
            List<BaseUtilitiesModel> res = new();
            var list = _utilitiesService.GetAllWorkingType().Data;
            list.ForEach(res.Add);
            return res;
        }
    }
}

