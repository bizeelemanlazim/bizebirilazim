using BBL.Core.Models.API.Auth;
using BBL.Core.Utilities.Results;
using BBL.Core.Utilities.Security.JWT;
using Microsoft.AspNetCore.Authentication;

namespace BBL.Business.Abstract.API
{
    public interface IAuthService
    {
        #region LOGIN PROCESS
        Task<ApiResult<AccessToken>> LoginWithGoogle(GoogleTokenModel googleAccessToken); Task<ApiResult<AccessToken>> Login(LoginModel model);

        Task<ApiResult<AccessToken>> LoginWithRefreshToken(LoginWithRefreshTokenModel model);

        #endregion

        #region REGISTER PROCESS

        Task<ApiResult> Register(RegisterModel model);

        #endregion

        #region PASSWORD PROCESS

        Task<ApiResult> ChangePassword(ChangePasswordModel model);

        Task<ApiResult> ForgotPasswordEmailSend(ForgotPasswordEmailSendModel model);

        Task<ApiResult> ForgotPasswordSend(ForgotPasswordSendModel model);

        #endregion

        #region CONFIRM EMAIL PROCESS
        Task<ApiResult> ConfirmEmail(String Token, String UserId); //ConfirmEmailModel model

        #endregion
    }
}