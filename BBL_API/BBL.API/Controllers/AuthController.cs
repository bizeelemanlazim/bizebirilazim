using BBL.API.Controllers.Base;
using BBL.Business.Abstract.API;
using BBL.Core.Models.API.Auth;
using BBL.Core.Utilities.Results;
using BBL.Core.Utilities.Security.JWT;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BBL.API.Controllers
{
    [Route("api/auth-management")]
    [ApiController]
    //[ApiVersion("1.0")]
    [EnableCors("AllowOrigin")]
    public class AuthController : BaseApiController
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        #region Google with login

        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<AccessToken>))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpPost("login/google")]
        public async Task<IActionResult> LoginWithGoogle(GoogleTokenModel googleAccessToken)
        {
            var result = await _authService.LoginWithGoogle(googleAccessToken);
            return StatusResult(result);
        }
        #endregion

        /// <summary>
        /// {
        ///"email": "system@bizebirilazim.com",
        ///"password": "45tr45TR."
        ///}
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult<AccessToken>))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var result = await _authService.Login(model);
            return StatusResult(result);
        }

        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(string))]
        [HttpPost("refresh-token")]
        public async Task<IActionResult> LoginWithRefreshToken([FromBody] LoginWithRefreshTokenModel model)
        {
            var result = await _authService.LoginWithRefreshToken(model);
            return StatusResult(result);
        }

        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var result = await _authService.Register(model);
            return StatusResult(result);
        }

        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPut("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel model)
        {
            var result = await _authService.ChangePassword(model);
            return StatusResult(result);
        }

        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("forgot-password-email-send")]
        public async Task<IActionResult> ForgotPasswordEmailSend([FromBody] ForgotPasswordEmailSendModel model)
        {
            var result = await _authService.ForgotPasswordEmailSend(model);
            return StatusResult(result);
        }

        [AllowAnonymous]
        [Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpPost("forgot-password-send")]
        public async Task<IActionResult> ForgotPasswordSend([FromBody] ForgotPasswordSendModel model)
        {
            var result = await _authService.ForgotPasswordSend(model);
            return StatusResult(result);
        }

        [AllowAnonymous]
        //[Consumes("application/json")]
        [Produces("application/json", "text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ApiResult))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(string))]
        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail([FromQuery] String Token, [FromQuery] String UserId)//ConfirmEmailModel model
        {
            var result = await _authService.ConfirmEmail(Token, UserId);//model
            return StatusResult(result);
        }
    }
}