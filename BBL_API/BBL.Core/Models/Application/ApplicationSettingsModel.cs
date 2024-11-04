namespace BBL.Core.Models.Application
{
    public class ApplicationSettingsModel
    {
        public ConnectionStrings ConnectionStrings { get; set; }

        public TokenOptions TokenOptions { get; set; }
        public EmailConfiguration EmailConfiguration { get; set; }
        public SeriLogConfigurations SeriLogConfigurations { get; set; }
        public CallBackUrl CallBackUrl { get; set; }
        public Folder Folder { get; set; }
    }

    public class ConnectionStrings
    {
        public String BBLConnection { get; set; }
    }

    public class TokenOptions
    {
        public string Audience { get; set; }
        public string Issuer { get; set; }
        public string AccessTokenExpiration { get; set; }
        public string SecurityKey { get; set; }
    }

    public class EmailConfiguration
    {
        public string SmtpServer { get; set; }
        public int SmtpPort { get; set; }
        public string SenderName { get; set; }
        public string SenderEmail { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    public class SeriLogConfigurations
    {
        public MsSqlConfiguration MsSqlConfiguration { get; set; }
    }

    public class MsSqlConfiguration
    {
        public string ConnectionString { get; set; }
    }

    public class CallBackUrl
    {
        public string BaseUrl { get; set; }
    }

    public class Folder
    {
        public ImageFolder ImageFolder { get; set; }
    }

    public class ImageFolder
    {
        public string EmployeeUserImagePath { get; set; }
        public string EmployerUserImagePath { get; set; }
    }
}