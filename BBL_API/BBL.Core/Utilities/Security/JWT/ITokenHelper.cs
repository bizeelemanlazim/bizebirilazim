using BBL.Core.Domain.Jwt;

namespace BBL.Core.Utilities.Security.JWT
{
    public interface ITokenHelper
    {
        TAccessToken CreateToken<TAccessToken>(JwtUser user)

          where TAccessToken : IAccessToken, new();

        string GenerateRefreshToken();
    }
}
