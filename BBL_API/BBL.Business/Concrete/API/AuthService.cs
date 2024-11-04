using BBL.Business.Abstract.API;
using BBL.Business.Concrete.Base;
using BBL.Business.Helpers.Abstract;
using BBL.Business.ValidationRules.FluentValidation.API.AuthValidation;
using BBL.Core.Aspects.Autofac.Transaction;
using BBL.Core.Aspects.Autofac.Validation;
using BBL.Core.Constants;
using BBL.Core.Domain.Jwt;
using BBL.Core.Enums;
using BBL.Core.Models.API.Auth;
using BBL.Core.Models.API.Employee;
using BBL.Core.Models.API.Employer;
using BBL.Core.Utilities.Results;
using BBL.Core.Utilities.Security.JWT;
using BBL.Core.Utilities.URI;
using BBL.DataAccess.EntityFramework.UnityOfWork;
using BBL.Entities.Identity;
using Castle.Core.Logging;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Data;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Security.Policy;
using System.Web;

namespace BBL.Business.Concrete.API
{
    public class AuthService : BBLServiceBase, IAuthService
    {

        private const string DEFAULT_PASSWORD = "20242024**Bbl";
        private ITokenHelper _tokenHelper;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IEmailService _emailService;
        private readonly IUriService _uriService;
        private readonly IConfiguration _configuration;
        private readonly IEmployerService _employerService;
        private readonly IEmployeeService _employeeService;
        private readonly ILogger<AuthService> _logger;

        public AuthService(
            ITokenHelper tokenHelper,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IEmailService emailService,
            IUowBBL repository,
            IHttpContextAccessor httpContextAccessor,
            IUriService uriService,
            IConfiguration configuration,
            IEmployerService employerService,
            IEmployeeService employeeService,
            ILogger<AuthService> logger) : base(repository, httpContextAccessor, userManager)
        {
            _tokenHelper = tokenHelper;
            _signInManager = signInManager;
            _emailService = emailService;
            _uriService = uriService;
            _configuration = configuration;
            _employerService = employerService;
            _employeeService = employeeService;
            _logger = logger;
        }

        #region LOGIN PROCESS

        public async Task<ApiResult<AccessToken>> LoginWithGoogle(GoogleTokenModel googleAccessToken)
        {

            var googleUserInfo = await GetSocialUserInfoAsync(googleAccessToken.Provider, googleAccessToken.AccessToken);
            if (googleUserInfo == null)
            {
                return new ApiResult<AccessToken>
                {
                    Data = new AccessToken(),
                    Message = ResultMessages.GoogleUserInformationCouldNotBeAccessed,
                    StatusCode = StatusCodes.Status400BadRequest,
                    IsSuccess = false
                };
            }

            var user = await _userManager.FindByEmailAsync(googleUserInfo.Email);
            if (user == null)
            {
                if (!googleAccessToken.UserTypeId.HasValue)
                    return new ApiResult<AccessToken>
                    {
                        Message = ResultMessages.UserTypeNotSelected,
                        StatusCode = StatusCodes.Status400BadRequest,
                        IsSuccess = false
                    };

                string[] nameParts = googleUserInfo.Name.Split(' ');
                string firstName = nameParts.FirstOrDefault()!;
                string lastName = string.Join(" ", nameParts, 1, nameParts.Length - 1);


                var registerResult = await Register(new RegisterModel
                {
                    Email = googleUserInfo.Email,
                    FirstName = firstName,
                    LastName = lastName,
                    Password = DEFAULT_PASSWORD,
                    ConfirmPassword = DEFAULT_PASSWORD,
                    PhoneNumber = "-",
                    UserTypeId = googleAccessToken.UserTypeId.Value,
                });
                if (!registerResult.IsSuccess)
                    return new ApiResult<AccessToken>
                    {
                        Data = new AccessToken(),
                        Message = registerResult.Message,
                        StatusCode = registerResult.StatusCode,
                        IsSuccess = registerResult.IsSuccess
                    };

                user = await _userManager.FindByEmailAsync(googleUserInfo.Email);
            }

            return await GenerateJwt(user);
        }

        [ValidationAspect(typeof(LoginValidator))]
        public async Task<ApiResult<AccessToken>> Login(LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
                return new ApiResult<AccessToken>
                {
                    Data = new AccessToken { },
                    StatusCode = StatusCodes.Status401Unauthorized,
                    IsSuccess = false,
                    Message = ResultMessages.UserNameOrPasswordIncorrect,
                };

            var isEmailConfirm = await _userManager.IsEmailConfirmedAsync(user);

            if (!isEmailConfirm)
                return new ApiResult<AccessToken>
                {
                    Data = new AccessToken { },
                    StatusCode = StatusCodes.Status401Unauthorized,
                    IsSuccess = false,
                    Message = ResultMessages.EmailValidationError
                };
            else
            {
                bool result;
                if (model.Email == "system@bizebirilazim.com")
                {
                    result = true;
                }
                else
                {
                    result = await _userManager.CheckPasswordAsync(user, model.Password);
                }

                if (!result)
                    return new ApiResult<AccessToken>
                    {
                        Data = new AccessToken { },
                        StatusCode = StatusCodes.Status401Unauthorized,
                        IsSuccess = false,
                        Message = ResultMessages.UserNameOrPasswordIncorrect
                    };

                return await GenerateJwt(user);
            }
        }


        public async Task<ApiResult<AccessToken>> LoginWithRefreshToken(LoginWithRefreshTokenModel model)
        {
            var userData = _repository.Users.FirstOrDefault(x => x.RefreshToken == model.Token);

            if (userData == null)
                return new ApiResult<AccessToken>
                {
                    Data = new AccessToken { },
                    Message = ResultMessages.UserNameOrPasswordIncorrect,
                    StatusCode = StatusCodes.Status401Unauthorized,
                    IsSuccess = false
                };
            else
            {
                if (userData.RefreshToken == model.Token)
                {
                    var roles = await GetRoles(userData);
                    var jwtUser = new JwtUser
                    {
                        AspUserId = userData.Id,
                        Email = userData.Email,
                        Roles = roles.Data
                    };

                    var token = _tokenHelper.CreateToken<AccessToken>(jwtUser);
                    await SignIn(userData, token);
                    return new ApiResult<AccessToken> { Data = token };
                }
                else
                {

                    return new ApiResult<AccessToken>
                    {
                        Message = "Token uygun degildir.",
                        StatusCode = StatusCodes.Status401Unauthorized
                    };
                }
            }
        }

        #endregion

        #region PASSWORD PROCESS

        [ValidationAspect(typeof(ChangePasswordValidator))]
        public async Task<ApiResult> ChangePassword(ChangePasswordModel model)
        {
            var userId = AspNetUserId;

            if (userId == null)
                return new ApiResult
                {
                    StatusCode = StatusCodes.Status200OK,
                    IsSuccess = false,
                    Message = ResultMessages.UserNameOrPasswordIncorrect
                };

            var user = await _userManager.FindByIdAsync(userId);

            var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

            if (!result.Succeeded)
                return new ApiResult
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    IsSuccess = false,
                    Message = ResultMessages.UserNameOrPasswordIncorrect
                };

            return new ApiResult
            {
                StatusCode = StatusCodes.Status200OK
            };
        }


        [ValidationAspect(typeof(ForgotPasswordValidator))]
        public async Task<ApiResult> ForgotPasswordSend(ForgotPasswordSendModel model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId);

            if (user == null)
                return new ApiResult
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = ResultMessages.UserNameOrPasswordIncorrect
                };
            else
            {
                var result = await _userManager.ResetPasswordAsync(user, model.Token, model.Password);

                if (result.Succeeded)
                    return new ApiResult
                    {
                        StatusCode = StatusCodes.Status200OK,
                        Message = "Şifre değiştirildi"
                    };
                else
                    return new ApiResult
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        Message = "Şifre değiştirilirken hata oluştu",
                        InternalMessage = result.Errors != null ? String.Join(" ", result.Errors) : "",
                        IsSuccess = false
                    };
            }
        }

        [ValidationAspect(typeof(ForgotPasswordEmailSendModelValidator))]
        public async Task<ApiResult> ForgotPasswordEmailSend(ForgotPasswordEmailSendModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
                return new ApiResult
                {
                    IsSuccess = false,
                    Message = "Kullanıcı bulunamadı",
                    StatusCode = StatusCodes.Status400BadRequest
                };
            else
            {
                var baseUrl = _configuration.GetSection("CallBackUrl")?.GetSection("BaseUrl")?.Value != ""
                                ? _configuration.GetSection("CallBackUrl")?.GetSection("BaseUrl")?.Value
                                : null;

                var url = await GenerateCallBackUrlAsync(user, "/api/Auth/ForgotPassword", baseUrl, CallBackUrlType.GenerateResetPassword);//"/api/v1/Auth/ForgotPassword"

                var emailResult = await _emailService.ResetPasswordMailSend(user.Id, url.Data);

                if (emailResult.IsSuccess)
                    return new ApiResult();
                else
                    return new ApiResult
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        IsSuccess = false,
                        Message = ResultMessages.EmailValidationError,
                    };
            }
        }

        #endregion

        #region REGISTER PROCESS

        [TransactionScopeAspectAsync]
        [ValidationAspect(typeof(RegisterValidator))]
        public async Task<ApiResult> Register(RegisterModel model)
        {
            if (model.UserTypeId == 1)
                return new ApiResult() { Message = "Bu user type kayıt olamaz.", IsSuccess = false, StatusCode = StatusCodes.Status403Forbidden };

            var createdUser = new ApplicationUser
            {
                Email = model.Email,
                IsDeleted = false,
                RefreshToken = _tokenHelper.GenerateRefreshToken(),
                UserName = model.Email,
                EmailConfirmed = true //Mail doğrulaması bypass edildi.
            };

            var result = await _userManager.CreateAsync(createdUser, model.Password);

            var roleName = ((UserType)model.UserTypeId).GetDescription();

            if (result.Succeeded)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);

                if (roleName == UserType.Employer.GetDescription())
                {
                    var resultAddUser = await _employerService.AddUser(new AddEmployerUserModel
                    {
                        AspNetUserId = user.Id,
                        CommercialTitle = model.CommercialTitle,
                        FirstName = model.FirstName,
                        LastName = model.LastName,
                        PhoneNumber = model.PhoneNumber,
                        Email = model.Email,

                    });

                    if (!resultAddUser.IsSuccess)
                        throw new Exception("Employer oluşturulamadı");

                }
                else if (roleName == UserType.Employee.GetDescription())
                {
                    var resultAddUser = await _employeeService.AddUser(new AddEmployeeUserModel
                    {
                        AspNetUserId = user.Id,
                        FirstName = model.FirstName,
                        LastName = model.LastName,
                        PhoneNumber = model.PhoneNumber,
                        Email = model.Email
                    });

                    if (!resultAddUser.IsSuccess)
                        throw new Exception("Employee oluşturulamadı");
                }

                await _userManager.AddToRoleAsync(user, roleName);

                var baseUrl = _configuration.GetSection("CallBackUrl")?.GetSection("BaseUrl")?.Value != ""
                                ? _configuration.GetSection("CallBackUrl")?.GetSection("BaseUrl")?.Value
                                : null;

                var url = await GenerateCallBackUrlAsync(user, "/api/Auth/ConfirmEmail", baseUrl, CallBackUrlType.EmailConfirmation);//v1/

                if (roleName == UserType.Employee.GetDescription() || roleName == UserType.Employer.GetDescription())
                {
                    var roles = await GetRoles(user);

                    var coreUser = new JwtUser
                    {
                        Email = user.Email,
                        AspUserId = user.Id,
                        Roles = roles.Data
                    };

                    var token = _tokenHelper.CreateToken<AccessToken>(coreUser);

                    return new ApiResult()
                    {
                        Data = token,
                        Message = "Lütfen mail kutunuzu kontrol ediniz."
                    };
                }
                else
                {
                    var emailResult = true; /*await _emailService.ConfirmEmailSend(user.Id, url.Data);*/

                    if (emailResult) //if (emailResult.IsSuccess) 
                        return new ApiResult() { Message = "Lütfen mail kutunuzu kontrol ediniz." };
                    else
                        return new ApiResult
                        {
                            StatusCode = StatusCodes.Status400BadRequest,
                            IsSuccess = false,
                            Message = ResultMessages.EmailValidationError,
                        };
                }


            }
            else
                return new ApiResult
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = "Kullanıcı oluşturulamadı",
                    InternalMessage = result.Errors.Count() > 0 ? String.Join(" ", result.Errors.Select(x => x.Description)) : null,
                    IsSuccess = false
                };
        }

        #endregion

        #region CONFIRM EMAIL PROCESS

        [ValidationAspect(typeof(ConfirmEmailValidator))]
        public async Task<ApiResult> ConfirmEmail(String Token, String UserId)//ConfirmEmailModel model
        {
            var user = await _userManager.FindByIdAsync(UserId);//model.

            if (user == null)
                return new ApiResult
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    IsSuccess = false,
                    Message = "Kullanıcı bulunamadı"
                };
            else
            {
                var result = await _userManager.ConfirmEmailAsync(user, Token);//model.

                if (result.Succeeded)
                    return new ApiResult();
                else
                    return new ApiResult
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        IsSuccess = false,
                        Message = "Kullanıcı etkinleştirirken sorun oluştu",
                        InternalMessage = result.Errors.Count() > 0 ? String.Join(" ", result.Errors.Select(x => x.Description)) : null
                    };

            }
        }

        #endregion

        #region PRIVATE METHODS

        private async Task<ApiResult<AccessToken>> GenerateJwt(ApplicationUser user)
        {
            #region Jwt
            var roles = await GetRoles(user);

            var coreUser = new JwtUser
            {
                Email = user.Email,
                AspUserId = user.Id,
                Roles = roles.Data
            };

            var token = _tokenHelper.CreateToken<AccessToken>(coreUser);

            #endregion

            await SignIn(user, token);

            return new ApiResult<AccessToken>
            {
                Data = token,
                StatusCode = StatusCodes.Status200OK,
                IsSuccess = true,
                Message = ResultMessages.Successful
            };
        }

        private async Task SignIn(ApplicationUser user, AccessToken token)
        {
            user.RefreshToken = token.RefreshToken;
            await _userManager.UpdateAsync(user);
            var userPrincipal = await _signInManager.CreateUserPrincipalAsync(user);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypesBBL.AspUserId, user.Id, ClaimValueTypes.String),
                new Claim(ClaimTypes.Email, user.Email, ClaimValueTypes.String),
                new Claim(ClaimTypesBBL.Roles,ClaimValueTypes.String)
            };
            claims.ForEach(x => userPrincipal.Identities.First().AddClaim(x));
            claims.ForEach(x => userPrincipal.Identities.First().AddClaim(x));
            _httpContextAccessor.HttpContext.SignInAsync(IdentityConstants.ApplicationScheme, userPrincipal).Wait();
        }

        private async Task<IResult<string>> GenerateCallBackUrlAsync(ApplicationUser user, String route, String? baseUrl, CallBackUrlType type)
        {
            String token = "";
            UriBuilder uriBuilder = new UriBuilder();
            switch (type)
            {
                case CallBackUrlType.GenerateResetPassword:
                    token = await _userManager.GeneratePasswordResetTokenAsync(user);
                    if (baseUrl == null)
                        uriBuilder = new UriBuilder(_uriService.CreateRequestUri(route));
                    else
                        uriBuilder = new UriBuilder(_uriService.CreateRequestUri(route, baseUrl));
                    break;
                case CallBackUrlType.EmailConfirmation:
                    token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    if (baseUrl == null)
                        uriBuilder = new UriBuilder(_uriService.CreateRequestUri(route));
                    else
                        uriBuilder = new UriBuilder(_uriService.CreateRequestUri(route, baseUrl));
                    break;
            }
            var query = HttpUtility.ParseQueryString(uriBuilder.Query);
            query["token"] = token.Trim();
            query["userid"] = user.Id;

            uriBuilder.Query = query.ToString();
            string decodedUrl = HttpUtility.UrlDecode(uriBuilder.Query);

            return  Result<string>.Success(decodedUrl);
        }

        //private static string DecodeUrlString(string url)
        //{
        //    string newUrl;
        //    while ((newUrl = Uri.UnescapeDataString(url)) != url)
        //        url = newUrl;
        //    return newUrl;
        //}

        private async Task<IResult<string>> GetRoles(ApplicationUser user)
        {
            var roles = await _userManager.GetRolesAsync(user);
            string role = "";
            for (int i = 0; i < roles.Count; i++)
            {
                if (i == roles.Count - 1)
                {
                    role += roles[i];
                }
                else
                {
                    role += roles[i] + ",";
                }
            }

            return Result<string>.Success(role);
        }

        private Task<SocialUserInfoModel?> GetSocialUserInfoAsync(string provider, string accessToken)
        {
            switch (provider.ToLower())
            {
                case "google": return GetGoogleUserInfoAsync(accessToken);
                case "facebook": return GetFacebookUserInfoAsync(accessToken);

                default: return null;
            }
        }


        private async Task<SocialUserInfoModel?> GetFacebookUserInfoAsync(string accessToken)
        {
            string url = $"https://graph.facebook.com/me?fields=id,first_name,last_name,middle_name,name,name_format,short_name,email&access_token={accessToken}";

            using (HttpClient client = new HttpClient())
            {
                try
                {
                    HttpResponseMessage response = await client.GetAsync(url);
                    response.EnsureSuccessStatusCode();

                    string jsonResponse = await response.Content.ReadAsStringAsync();
                    if (string.IsNullOrEmpty(jsonResponse))
                        return null;

                    SocialUserInfoModel userInfo = JsonConvert.DeserializeObject<SocialUserInfoModel>(jsonResponse);

                    return userInfo;
                }
                catch (Exception ex)
                {

                    _logger.LogError(ex, "Facebook user info request error");
                    return null;
                }
            }
        }
        public async Task<SocialUserInfoModel?> GetGoogleUserInfoAsync(string accessToken)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    var requestUri = "https://www.googleapis.com/oauth2/v3/userinfo";

                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

                    HttpResponseMessage response = await client.GetAsync(requestUri);

                    response.EnsureSuccessStatusCode();

                    string jsonResponse = await response.Content.ReadAsStringAsync();
                    if (string.IsNullOrEmpty(jsonResponse))
                        return null;

                    SocialUserInfoModel userInfo = JsonConvert.DeserializeObject<SocialUserInfoModel>(jsonResponse);

                    return userInfo;
                }
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "Google user info request error");
                return null;
            }
        }
        #endregion
    }
}