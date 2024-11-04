using BBL.API.Controllers.Base;
using BBL.Business.Abstract.API;
using BBL.Business.Middleware.Authorization;
using BBL.Core.Constants;
using BBL.Core.Models.API.Base;
using BBL.Core.Models.API.Employer;
using BBL.Core.Utilities.Results;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace BBL.API.Controllers
{
    [Route("api/employer-management")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    //[ApiVersion("1.0")]
    //[AuthorizeBySelectedRole(UserRoles.Employer)]
    public class EmployerController : BaseApiController
    {
        private readonly IEmployerService _employerService;

        public EmployerController(IEmployerService employerService)
        {
            _employerService = employerService;
        }

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("employers")]
        public async Task<IActionResult> Update([FromBody] EditEmployerUserModel model)
        {
            var result = await _employerService.UpdateUser(model);
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<DetailEmployerUserModel>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("employers")]
        public async Task<IActionResult> Detail()
        {
            var result = await _employerService.GetUserDetail();
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<EmployerPriceRate>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("price-rate-details")]
        public async Task<IActionResult> PriceRateDetail()
        {
            var result = await _employerService.GetUserPriceRate();
            return StatusResult(result);
        }

        #region Employer Image Process

        [Consumes("multipart/form-data")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpPost("images")]
        public async Task<IActionResult> AddImageEmployee([FromForm] IFormFile file)
        {
            var result = await _employerService.AddEmployerUserImage(file);
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpGet("images")]
        public IActionResult GetUserImage()
        {
            var result = _employerService.GetUserImage();
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpDelete("images")]
        public async Task<IActionResult> DeleteUserImage()
        {
            var result = await _employerService.DeleteUserImage();
            return StatusResult(result);
        }

        #endregion

        #region Rating
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<List<EmployerRatingResponse>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("employee-ratings")]
        public async Task<IActionResult> GetEmployeeRating([FromQuery] SkipTakeReq req)
        {
            var result = await _employerService.GetEmployeeRating(req);
            return StatusResult(result);
        }

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<List<EmployerRatingResponse>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("my-ratings")]
        public async Task<IActionResult> GetMyRating([FromQuery] SkipTakeReq req)
        {
            var result = await _employerService.GetMyRating(req);
            return StatusResult(result);
        }

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("rating")]
        public async Task<IActionResult> AddRating([FromBody] EmployerAddRatingModel req)
        {
            var result = await _employerService.AddRating(req);
            return StatusResult(result);
        }

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("rating/{ratingId}")]
        public async Task<IActionResult> EditRating([FromBody] EmployerEditRatingModel req, [FromRoute] int ratingId)
        {
            var result = await _employerService.EditRating(req, ratingId);
            return StatusResult(result);
        }
        #endregion

        #region Report
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<EmployerReport>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("get-report/{id}")]
        public async Task<IActionResult> GetMyReport(int id)
        {
            var result = await _employerService.Report(id);
            return StatusResult(result);
        }

        #endregion
    }
}
