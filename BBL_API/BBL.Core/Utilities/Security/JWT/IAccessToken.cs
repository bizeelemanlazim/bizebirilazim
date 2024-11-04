namespace BBL.Core.Utilities.Security.JWT
{
    public interface IAccessToken
    {
        String Expiration { get; set; }
        string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}
