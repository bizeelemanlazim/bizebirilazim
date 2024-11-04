namespace BBL.Core.Utilities.Security.JWT
{
    public class AccessToken : IAccessToken
    {
        public List<string> Claims { get; set; }
        public String Token { get; set; }
        public String Expiration { get; set; }
        public String RefreshToken { get; set; }
    }
}