namespace BBL.Core.Models.API.Auth
{
    public class LoginModel
    {
        public String Email { get; set; }
        public String Password { get; set; }
    }

    public class RegisterModel
    {
        public int UserTypeId { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String PhoneNumber { get; set; }
        public String Email { get; set; }
        public String Password { get; set; }
        public String ConfirmPassword { get; set; }
        public String? CommercialTitle { get; set; }
    }

    public class ChangePasswordModel
    {
        public String CurrentPassword { get; set; }
        public String NewPassword { get; set; }
        public String ConfirmPassword { get; set; }
    }

    public class ConfirmEmailModel
    {
        public String Token { get; set; }
        public String UserId { get; set; }
    }

    public class ForgotPasswordEmailSendModel
    {
        public String Email { get; set; }
    }

    public class ForgotPasswordSendModel
    {
        public String UserId { get; set; }
        public String Token { get; set; }
        public String Password { get; set; }
        public String ConfirmPassword { get; set; }
    }

    public class LoginWithRefreshTokenModel
    {
        public String Token { get; set; }
    }
    public class GoogleTokenModel
    {
        public string Provider { get; set; }
        public string AccessToken { get; set; }
        public int? UserTypeId { get; set; }
    }
}