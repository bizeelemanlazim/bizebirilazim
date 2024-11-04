using System;
using System.Threading.Tasks;
using BBL.API.Controllers.Base;
using BBL.Business.Abstract.API;
using BBL.Core.Models.API.Base;
using BBL.Core.Models.API.Employee;
using BBL.Core.Utilities.Results;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace BBL.API.Controllers
{
    [Route("api/employee-management")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    //[ApiVersion("1.0")]
    public class EmployeesController : BaseApiController
    {
        private readonly IEmployeeService _employeeService;

        public EmployeesController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        #region Employee Process

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("employees")]
        public async Task<IActionResult> EmployeeUpdate([FromBody] EditEmployeeUserModel model)
        {
            var result = await _employeeService.UpdateUser(model);
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<DetailEmployeeUserModel>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("employees")]
        public IActionResult EmployeeDetail()
        {
            var result = _employeeService.GetUserDetail();
            return StatusResult(result);
        }

        #endregion

        #region Ad Process
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<DetailEmployeeAdAndOrderSummaryCount>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("employee-advertisement-and-order-summary")]
        public async Task<IActionResult> DetailAdAndOrderSummary([FromQuery] OrderSkipTakeReq req,DetailEmployeeAdAndOrderSummaryFilter filter)
        {
            var result = await _employeeService.DetailAdAndOrderSummary(req,filter);
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<ApplyForAJobListDetailEmployeeAdAndOrderSummaryCount>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("apply-for-a-job")]
        public async Task<IActionResult> ApplyForAJobList( [FromQuery] OrderSkipTakeReq req, bool isActive = true)
        {
            var result = await _employeeService.ApplyForAJobList(isActive, req);
            return StatusResult(result);
        }


        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("apply-for-a-job/{adId}")]
        public async Task<IActionResult> ApplyForAJob(int adId)
        {
            var result = await _employeeService.ApplyForAJob(adId);
            return StatusResult(result);
        }

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpDelete("apply-for-a-job/{adId}")]
        public async Task<IActionResult> ApplyForAJobDelete(int adId)
        {
            var result = await _employeeService.ApplyForAJobDelete(adId);
            return StatusResult(result);
        }

        #endregion

        #region Work Experience Process

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<AddWorkExperienceModel>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("work-experiences")]
        public async Task<IActionResult> AddWorkExperience([FromBody] AddWorkExperienceModel model)
        {
            var result = await _employeeService.AddWorkExperience(model);
            return StatusResult(result);
        }

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("work-experiences/{id}")]
        public async Task<IActionResult> EditWorkExperience([FromBody] BaseWorkExperienceModel model, [FromRoute] int id)
        {
            var result = await _employeeService.EditWorkExperience(model, id);
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<List<DetailWorkExperienceModel>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("work-experiences")]
        public IActionResult DetailWorkExperience()
        {
            var result = _employeeService.GetAllDetailWorkExperience();
            return StatusResult(result);
        }

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpDelete("work-experiences/{id}")]
        public IActionResult DeleteWorkExperience(int id)
        {
            var result = _employeeService.DeleteWorkExperience(id);
            return StatusResult(result);
        }

        #endregion

        #region Education Information Process

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<AddEducationInformationModel>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("education-informations")]
        public async Task<IActionResult> AddEducationInformation([FromBody] AddEducationInformationModel model)
        {
            var result = await _employeeService.AddEducationInformation(model);
            return StatusResult(result);
        }

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("education-informations/{id}")]
        public async Task<IActionResult> EditEducationInformation([FromBody] BaseEducationInformationModel model, [FromRoute] int id)
        {
            var result = await _employeeService.EditEducationInformation(model, id);
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<List<DetailEducationInformationModel>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("education-informations")]
        public IActionResult DetailEducationInformation()
        {
            var result = _employeeService.GetAllDetailEducationInformation();
            return StatusResult(result);
        }

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpDelete("education-informations/{id}")]
        public IActionResult DeleteEducationInformation(int id)
        {
            var result = _employeeService.DeleteEducationInformation(id);
            return StatusResult(result);
        }

        #endregion

        #region Employee Image Process

        [Consumes("multipart/form-data")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpPost("images")]
        public async Task<IActionResult> AddImageEmployee([FromForm] IFormFile file)
        {
            var result = await _employeeService.AddEmployeeUserImage(file);
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpGet("images")]
        public IActionResult GetUserImage()
        {
            var result = _employeeService.GetUserImage();
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpDelete("images")]
        public async Task<IActionResult> DeleteUserImage()
        {
            var result = await _employeeService.DeleteUserImage();
            return StatusResult(result);
        }

        #endregion

        #region Certificate Information Process

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<AddCertificateInformationModel>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("certificate-informations")]
        public async Task<IActionResult> AddCertificateInformation([FromBody] AddCertificateInformationModel model)
        {
            var result = await _employeeService.AddCertificateInformation(model);
            return StatusResult(result);
        }

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("certificate-informations/{id}")]
        public async Task<IActionResult> EditCertificateInformation([FromBody] BaseCertificateInformationModel model, [FromRoute] int id)
        {
            var result = await _employeeService.EditCertificateInformation(model, id);
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<List<DetailCertificateInformationModel>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("certificate-informations")]
        public IActionResult DetailCertificateInformation()
        {
            var result = _employeeService.GetAllDetailCertificateInformation();
            return StatusResult(result);
        }

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpDelete("certificate-informations/{id}")]
        public async Task<IActionResult> DeleteCertificateInformation(int id)
        {
            var result = await _employeeService.DeleteCertificateInformation(id);
            return StatusResult(result);
        }

        #endregion

        #region Certificate Information Process

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<AddAbilityInformationModel>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("Ability-informations")]
        public async Task<IActionResult> AddAbilityInformation([FromBody] AddAbilityInformationModel model)
        {
            var result = await _employeeService.AddAbilityInformation(model);
            return StatusResult(result);
        }

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("Ability-informations/{id}")]
        public async Task<IActionResult> EditAbilityInformation([FromBody] BaseAbilityInformationModel1 model, [FromRoute] int id)
        {
            var result = await _employeeService.EditAbilityInformation(model, id);
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<List<DetailAbilityInformationModel>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("Ability-informations")]
        public IActionResult DetailAbilityInformation()
        {
            var result = _employeeService.GetAllDetailAbilityInformation();
            return StatusResult(result);
        }

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpDelete("Ability-informations/{id}")]
        public async Task<IActionResult> DeleteAbilityInformation(int id)
        {
            var result = await _employeeService.DeleteAbilityInformation(id);
            return StatusResult(result);
        }

        #endregion

        #region Social Media Information Process

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<AddSocialMediaInformationModel>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("social-media-informations")]
        public async Task<IActionResult> AddSocialMediaInformation([FromBody] AddSocialMediaInformationModel model)
        {
            var result = await _employeeService.AddSocialMediaInformation(model);
            return StatusResult(result);
        }

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("social-media-informations/{id}")]
        public async Task<IActionResult> EditSocialMediaInformation([FromBody] BaseSocialMediaInformationModel model, [FromRoute] int id)
        {
            var result = await _employeeService.EditSocialMediaInformation(model, id);
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<DetailSocialMediaInformationModel>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("social-media-informations")]
        public IActionResult DetailSocialMediaInformation()
        {
            var result = _employeeService.GetDetailSocialMediaInformation();
            return StatusResult(result);
        }

        #endregion

        #region Bank And Personal Informations

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<AddBankAndPersonalInformationModel>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("bank-and-personal-informations")]
        public async Task<IActionResult> AddBankAndPersonalInformation([FromBody] AddBankAndPersonalInformationModel model)
        {
            var result = await _employeeService.AddBankAndPersonalInformation(model);
            return StatusResult(result);
        }

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("bank-and-personal-informations/{id}")]
        public async Task<IActionResult> EditBankAndPersonalInformation([FromBody] BaseBankAndPersonalInformationModel model, [FromRoute] int id)
        {
            var result = await _employeeService.EditBankAndPersonalInformation(model, id);
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<DetailBankAndPersonalInformationModel>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("bank-and-personal-informations")]
        public IActionResult DetailBankAndPersonalInformation()
        {
            var result = _employeeService.GetDetailBankAndPersonalInformation();
            return StatusResult(result);
        }

        #endregion

        #region Disabled Status

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<AddDisabledStatusModel>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("disabled-statuses")]
        public async Task<IActionResult> AddDisabledStatus([FromBody] AddDisabledStatusModel model)
        {
            var result = await _employeeService.AddDisabledStatus(model);
            return StatusResult(result);
        }

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("disabled-statuses/{id}")]
        public async Task<IActionResult> EditDisabledStatus([FromBody] BaseDisabledStatusModel model, [FromRoute] int id)
        {
            var result = await _employeeService.EditDisabledStatus(model, id);
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<DetailDisabledStatusModel>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("disabled-statuses")]
        public IActionResult DetailDisabledStatusModel()
        {
            var result = _employeeService.GetAllDetailDisabledStatus();
            return StatusResult(result);
        }


        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpDelete("disabled-statuses/{id}")]
        public async Task<IActionResult> DeleteDisabledStatus([FromQuery] int id)
        {
            var result = await _employeeService.DeleteDisabledStatus(id);
            return StatusResult(result);
        }

        #endregion

        #region Rating
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<List<EmployeeRatingResponse>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("employer-ratings")]
        public async Task<IActionResult> GetEmployerRating([FromQuery] SkipTakeReq req)
        {
            var result = await _employeeService.GetEmployerRating(req);
            return StatusResult(result);
        }

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<List<EmployeeRatingResponse>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("my-ratings")]
        public async Task<IActionResult> GetMyRating([FromQuery] SkipTakeReq req)
        {
            var result = await _employeeService.GetMyRating(req);
            return StatusResult(result);
        }

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("rating")]
        public async Task<IActionResult> AddRating([FromBody] EmployeeAddRatingModel req)
        {
            var result = await _employeeService.AddRating(req);
            return StatusResult(result);
        }

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("rating/{ratingId}")]
        public async Task<IActionResult> EditRating([FromBody] EmployeeEditRatingModel req, [FromRoute] int ratingId)
        {
            var result = await _employeeService.EditRating(req, ratingId);
            return StatusResult(result);
        }
        #endregion

        #region CV

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<GetCVinfoResponse>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("cv-informations/{employeeId}")]
        public async Task<IActionResult> GetCVinfo(int employeeId)
        {
            var result = await _employeeService.GetCVinfo(employeeId);
            return StatusResult(result);
        }

        #endregion

        #region Report
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<EmployeeReport>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("get-report")]
        public async Task<IActionResult> GetMyReport()
        {
            var result = await _employeeService.Report();
            return StatusResult(result);
        }
        #endregion
    }
}