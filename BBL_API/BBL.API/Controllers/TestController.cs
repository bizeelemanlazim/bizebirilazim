using BBL.API.Controllers.Base;
using BBL.Business.Abstract.API;
using BBL.Business.Middleware.Authorization;
using BBL.Core.Constants;
using BBL.Core.Models.API.Ad;
using BBL.Core.Models.API.Base;
using BBL.Core.Models.API.Employee;
using BBL.Core.Models.Application;
using BBL.Core.Utilities.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;


namespace BBL.API.Controllers
{
    [EnableCors("AllowOrigin")]
    [ApiController]
    [Route("api/[controller]")]//v{version:apiVersion}/

    public class TestController : ControllerBase
    {
        private readonly ApplicationSettingsModel _settings;

        public TestController(IOptions<ApplicationSettingsModel> options)
        {
            _settings = options.Value;
        }

        [HttpGet("GetSettings")]
        public IActionResult GetSettings()
        {
            return Ok(JsonConvert.SerializeObject(_settings));
        }
    }
}