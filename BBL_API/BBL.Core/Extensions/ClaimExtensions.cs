using BBL.Core.Constants;

namespace System.Security.Claims
{
    public static class ClaimExtensions
    {
        public static void AddAspUserId(this ICollection<Claim> claims, string aspUserId)
        {
            claims.Add(new Claim(ClaimTypesBBL.AspUserId, aspUserId));
        }

        public static void AddEmail(this ICollection<Claim> claims, string email)
        {
            claims.Add(new Claim(ClaimTypesBBL.Email, email));
        }

        public static void AddRoles(this ICollection<Claim> claims, String roles)
        {
            claims.Add(new Claim(ClaimTypesBBL.Roles, roles));
        }
    }
}