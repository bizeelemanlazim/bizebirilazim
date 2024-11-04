using BBL.Core.Constants;
using BBL.Core.Utilities.Results;
using BBL.Entities.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace BBL.Business.Middleware.Authorization
{
    public class AuthorizeBySelectedRole : AuthorizeAttribute, IAuthorizationFilter
    {
        private string _roles;
        public AuthorizeBySelectedRole(string roleName)
        {
            _roles = roleName;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var _signinManager = context.HttpContext.RequestServices.GetRequiredService<SignInManager<ApplicationUser>>();

            var roles = _roles.Split(',').AsEnumerable();

            var selectedRoles = context.HttpContext.User.FindAll(ClaimTypesBBL.Roles).Select(x => x.Value);

            var roleMatches = (from selectedRole in selectedRoles
                               join role in roles on selectedRole equals role
                               select selectedRole).ToList();

            if (selectedRoles.Count() > 0 && roleMatches.Count() > 0) return;

            if (roleMatches == null || roleMatches.Count == 0)
            {
                _signinManager.SignOutAsync();
                context.Result = new JsonResult(new ApiResult() { StatusCode = StatusCodes.Status401Unauthorized, Message = ResultMessages.IsValidRole, IsSuccess = false });
                return;
            }

        }
    }
}
