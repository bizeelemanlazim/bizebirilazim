using BBL.API.Controllers.Base;
using BBL.Business.Abstract.API;
using BBL.Business.Middleware.Authorization;
using BBL.Core.Constants;
using BBL.Core.Enums;
using BBL.Core.Models.API.Ad;
using BBL.Core.Models.API.Base;
using BBL.Core.Models.API.Employee;
using BBL.Core.Utilities.Results;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace BBL.API.Controllers
{
    /// <summary>
    /// sa
    /// </summary>
    [Route("api/advertisement-management")]
    [ApiController]
    //[ApiVersion("1.0")]
    [AuthorizeBySelectedRole($"{UserRoles.Employer},{UserRoles.Employee}")]
    [EnableCors("AllowOrigin")]

    public class AdController : BaseApiController
    {
        private readonly IAdService _adService;

        public AdController(IAdService adService)
        {
            _adService = adService;
        }
        #region ad process

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("advertisement-and-order-summary")]
        public async Task<IActionResult> Post([FromBody] InsertAdAndOrderSummary model)
        {
            var result = await _adService.AddAd(model);
            return StatusResult(result);
        }

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("advertisement-and-order-summary")]
        public async Task<IActionResult> UpdateAdAndOrderSummary(EditAdAndOrderSummary model)
        {
            var result = await _adService.UpdateAd(model);
            return StatusResult(result);
        }

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("advertisement")]
        public async Task<IActionResult> UpdateAdActive([FromBody] EditAddActive model)
        {
            var result = await _adService.UpdateAdActive(model);
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Task<PaginationResult<DetailAdAndOrderSummary>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("advertisement-and-order-summary")]
        public async Task<IActionResult> DetailAdAndOrderSummary( [FromQuery] OrderSkipTakeReq req, JobStatus jobStatus)
        {
            var result = await _adService.DetailAdAndOrderSummary(jobStatus, req);
            return StatusResult(result);
        }
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<DetailAdAndOrderSummary2>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("advertisement-and-order-summary/{id}")]
        public async Task<IActionResult> AdAndOrderSummary(int id)
        {
            var result = await _adService.AdAndOrderSummary(id);
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("advertisement-and-order-summary/finish/{id}")]
        public async Task<IActionResult> AdFinish(int id)
        {
            var result = await _adService.AdFinish(id);
            return StatusResult(result);
        }
        #endregion

        #region Employee process
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<EmployeeUserApplyForAJobModelCount>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("apply-for-a-job")]
        public async Task<IActionResult> ApplyForAJobList( int AdId, [FromQuery] OrderSkipTakeReq req, bool isActive = true)
        {
            var result = await _adService.ApplyForAJobList(isActive, AdId, req);
            return StatusResult(result);
        }

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("apply-for-a-job/{id}")]
        public async Task<IActionResult> ApplyForAJob(int id)
        {
            var result = await _adService.ApplyForAJob(id);
            return StatusResult(result);
        }

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpDelete("apply-for-a-job/{id}")]
        public async Task<IActionResult> ApplyForAJobDelete(int id)
        {
            var result = await _adService.ApplyForAJobDelete(id);
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<EmployeeUserApplyForAJobModel>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("finish-for-a-job/{id}")]
        public async Task<IActionResult> FinishForAJobList(int id)
        {
            var result = await _adService.FinishForAJobList(id);
            return StatusResult(result);
        }

        #endregion

    }
}