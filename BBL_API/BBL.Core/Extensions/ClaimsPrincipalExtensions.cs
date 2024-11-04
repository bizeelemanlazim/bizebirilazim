using BBL.Core.Constants;
using System.Security.Claims;
using System.Security.Principal;

namespace BBL
{
    public static class ClaimsPrincipalExtensions
    {
        public static string GetUserId(this ClaimsPrincipal principal)
        {
            if (principal == null)
            {
                throw new ArgumentNullException(nameof(principal));
            }
            var claim = principal.FindFirst(ClaimTypes.NameIdentifier);

            return claim?.Value;
        }

        public static bool IsImpersonating(this ClaimsPrincipal principal)
        {
            if (principal == null)
            {
                throw new ArgumentNullException(nameof(principal));
            }

            var isImpersonating = principal.HasClaim("IsImpersonating", "true");

            return isImpersonating;
        }

        public static string GetMainUserId(this ClaimsPrincipal principal)
        {
            if (principal == null)
            {
                throw new ArgumentNullException(nameof(principal));
            }

            var mainUserId = principal.FindFirst("MainUser").Value;

            return mainUserId;
        }

        public static bool HasMainUserId(this ClaimsPrincipal principal)
        {
            if (principal == null)
            {
                throw new ArgumentNullException(nameof(principal));
            }

            var hasMainUserId = principal.HasClaim(x => x.Type == ClaimTypesBBL.MainUserId);

            return hasMainUserId;
        }

        public static void UpdateClaim(this IPrincipal currentPrincipal, string key, string value)
        {
            var identity = currentPrincipal.Identity as ClaimsIdentity;
            if (identity == null)
                return;

            // check for existing claim and remove it
            var existingClaim = identity.FindFirst(key);
            if (existingClaim != null)
                identity.RemoveClaim(existingClaim);
        }

        public static string GetClaimValue(this IPrincipal currentPrincipal, string key)
        {
            var identity = currentPrincipal.Identity as ClaimsIdentity;
            if (identity == null)
                return null;


            var claim = identity.Claims.First(c => c.Type == key).Value;
            return claim;
        }
    }
}
