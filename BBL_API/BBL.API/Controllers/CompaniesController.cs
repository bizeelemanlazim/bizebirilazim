using BBL.API.Controllers.Base;
using BBL.Business.Abstract.API;
using BBL.Core.Models.API.Company;
using BBL.Core.Utilities.Results;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace BBL.API.Controllers
{
    [Route("api/company-management")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    //[ApiVersion("1.0")]
    public class CompaniesController : BaseApiController
    {
        private readonly ICompanyService _companyService;

        public CompaniesController(ICompanyService companyService)
        {
            _companyService = companyService;
        }

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost]//("AddCompany")
        public async Task<IActionResult> AddCompany([FromBody] AddCompanyModel model)
        {
            var result = await _companyService.AddCompany(model);
            return StatusResult(result);
        }

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("{id}")]//("EditCompany")
        public async Task<IActionResult> EditCompany([FromBody] BaseCompanyModel model, [FromRoute] int id)
        {
            var result = await _companyService.EditCompany(model, id);
            return StatusResult(result);
        }

        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<List<DetailCompanyModel>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet]//("GetCompany")
        public IActionResult GetCompany()
        {
            var result = _companyService.GetCompany();
            return StatusResult(result);
        }

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var result = _companyService.DeleteCompany(id);
            return StatusResult(result);
        }
    }
}
