using BBL.API.Controllers.Base;
using BBL.Business.Abstract.API;
using BBL.Core.Models.API.Base;
using BBL.Core.Models.API.Utilities;
using BBL.Core.Utilities.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace BBL.API.Controllers
{
    [Route("api/utilities-management")]
    [ApiController]
    //[ApiVersion("1.0")]
    [AllowAnonymous]
    [EnableCors("AllowOrigin")]
    public class UtilitiesController : BaseApiController
    {
        private readonly IUtilitiesService _utilitiesService;
        private readonly IConfiguration _config;

        public UtilitiesController(IConfiguration config, IUtilitiesService utilitiesService)
        {
            _config = config;
            _utilitiesService = utilitiesService;
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<List<CityModel>>))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpGet("cities")]
        public IActionResult GetAllCity()
        {
            var result = _utilitiesService.GetAllCity();
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<List<DistrictModel>>))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpGet("districts")]
        public IActionResult GetAllDistrict([FromQuery] int cityId)
        {
            var result = _utilitiesService.GetAllDistrict(cityId);
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<List<NationalityModel>>))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpGet("nationalities")]
        public IActionResult GetAlNationality()
        {
            var result = _utilitiesService.GetAllNationality();
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<List<DrivingLicenceModel>>))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpGet("driving-licences")]
        public IActionResult GetAllDrivingLicence()
        {
            var result = _utilitiesService.GetAllDrivingLicence();
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<List<JobModel>>))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpGet("jobs")]
        public IActionResult GetAllJob([FromQuery] SearchSkipTakeReq req)
        {
            var result = _utilitiesService.GetAllJob(req);
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<List<UserTypeModel>>))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpGet("user-types")]
        public IActionResult GetAllUserType()
        {
            var result = _utilitiesService.GetAllUserType();
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<List<MaritalStatusTypeModel>>))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpGet("marital-status-types")]
        public IActionResult GetAllMaritalStatusType()
        {
            var result = _utilitiesService.GetAllMaritalStatusType();
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<List<GenderTypeModel>>))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpGet("gender-types")]
        public IActionResult GetAllGenderType()
        {
            var result = _utilitiesService.GetAllGenderType();
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<List<WorkingTypeModel>>))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpGet("working-types")]
        public IActionResult GetAllWorkingType()
        {
            var result = _utilitiesService.GetAllWorkingType();
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<List<BaseUtilitiesModel>>))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpGet("sector-types")]
        public IActionResult GetAllSectorType()
        {
            var result = _utilitiesService.GetAllSectorType();
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<List<BaseUtilitiesModel>>))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpGet("education-types")]
        public IActionResult GetAllEducationType()
        {
            var result = _utilitiesService.GetAllEducationType();
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<List<BaseUtilitiesModel>>))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpGet("experience-types")]
        public IActionResult GetAllExperienceType()
        {
            var result = _utilitiesService.GetAllExperienceType();
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<List<BaseUtilitiesModel>>))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpGet("company-types")]
        public IActionResult GetAllCompanyType()
        {
            var result = _utilitiesService.GetAllCompanyType();
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<List<BaseUtilitiesModel>>))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpGet("fund-types")]
        public IActionResult GetAllFundType()
        {
            var result = _utilitiesService.GetAllFundType();
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<List<BaseUtilitiesModel>>))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpGet("criteria-types")]
        public IActionResult GetAllCriteriaType([FromQuery] SearchSkipTakeReq req)
        {
            var result = _utilitiesService.GetAllCriteriaType(req);
            return StatusResult(result);
        }
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<List<BaseUtilitiesModel>>))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpGet("ability-types")]
        public IActionResult GetAllAbilityType([FromQuery] SearchSkipTakeReq req)
        {
            var result = _utilitiesService.GetAllAbilityType(req);
            return StatusResult(result);
        }
    }
}