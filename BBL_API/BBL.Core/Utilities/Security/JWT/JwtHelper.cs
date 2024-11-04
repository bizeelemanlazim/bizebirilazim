using BBL.Core.Domain.Jwt;
using BBL.Core.Utilities.Security.Encyption;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace BBL.Core.Utilities.Security.JWT
{
    public class JwtHelper : ITokenHelper
    {
        private readonly TokenOptions _tokenOptions;

        private DateTime _accessTokenExpiration;

        public JwtHelper(IConfiguration configuration)
        {
            Configuration = configuration;
            _tokenOptions = Configuration.GetSection("TokenOptions").Get<TokenOptions>();
        }

        public IConfiguration Configuration { get; }




        public TAccessToken CreateToken<TAccessToken>(JwtUser user)
            where TAccessToken : IAccessToken, new()
        {
            _accessTokenExpiration = DateTime.Now.AddDays(_tokenOptions.AccessTokenExpiration);
            var securityKey = SecurityKeyHelper.CreateSecurityKey(_tokenOptions.SecurityKey);
            var signingCredentials = SigningCredentialsHelper.CreateSigningCredentials(securityKey);
            var jwt = CreateJwtSecurityToken(_tokenOptions, user, signingCredentials);
            var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
            var token = new JwtSecurityTokenHandler().WriteToken(jwt);

            return new TAccessToken()
            {
                Token = token,
                Expiration = _accessTokenExpiration.ToString(),
                RefreshToken = GenerateRefreshToken()
            };
        }
        
        public JwtSecurityToken CreateJwtSecurityToken(
            TokenOptions tokenOptions,
            JwtUser user,
            SigningCredentials signingCredentials)
        {
            var jwt = new JwtSecurityToken(
               issuer: tokenOptions.Issuer,
               audience:tokenOptions.Audience,
                expires: _accessTokenExpiration,
                notBefore: DateTime.Now,
                claims: SetClaims(user),
                signingCredentials: signingCredentials);
            return jwt;
        }
        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];

            using var generator = new RNGCryptoServiceProvider();
            generator.GetBytes(randomNumber);

            return Convert.ToBase64String(randomNumber);
        }

        private IEnumerable<Claim> SetClaims(JwtUser user)
        {
            var claims = new List<Claim>();
            claims.AddEmail(user.Email);
            claims.AddAspUserId(user.AspUserId);
            claims.AddRoles(user.Roles);
            return claims;
        }
    }
}
