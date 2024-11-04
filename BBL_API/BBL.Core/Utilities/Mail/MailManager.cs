using BBL.Core.Utilities.Results;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MailKit.Net.Smtp;
using MimeKit;

namespace BBL.Core.Utilities.Mail
{
    public class MailManager : IMailService
    {
        private readonly EmailConfiguration _emailConfig;
        private readonly ILogger<MailManager> _logger;

        public MailManager(ILogger<MailManager> logger,
            IOptions<EmailConfiguration> emailConfig)
        {
            _emailConfig = emailConfig.Value;
            _logger = logger;
        }

        public async Task<IResult> Send(EmailMessage emailMessage)
        {

            /*
             * try
            {
                var fromAddress = new MailAddress(_emailConfig.SenderEmail, _emailConfig.SenderName);

                var smtp = new System.Net.Mail.SmtpClient(_emailConfig.SmtpServer)
                {
                    // Host = _emailConfig.SmtpServer,
                    Port = 587,//_emailConfig.SmtpPort,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = true,
                    Credentials = new NetworkCredential(_emailConfig.UserName, _emailConfig.Password),
                };

                using (var message = new MailMessage())
                {
                    message.From = fromAddress;
                    foreach (var toAddress in emailMessage.ToAddresses)
                    {
                        message.To.Add(new MailAddress(toAddress.Address, toAddress.Name));
                    }

                    message.Subject = emailMessage.Subject;
                    message.Body = emailMessage.Content;
                    message.IsBodyHtml = true;

                    smtp.Send(message);
                }

                _logger.LogInformation("Şifremi unuttum e-postası başarıyla gönderildi.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "E-posta gönderilirken hata oluştu!");
                return Result.Error("E-posta gönderilirken hata oluştu!");
            }
            */

            // E-posta mesajını oluşturma
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Bize Biri Lazım", "noreply@bizebirilazim.com"));

            foreach (var email in emailMessage.ToAddresses)
            {
                message.To.Add(new MailboxAddress(email.Name, email.Address));
            }

            message.Subject = emailMessage.Subject;


            var bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = emailMessage.Content;

            message.Body = bodyBuilder.ToMessageBody();

            // SMTP istemcisiyle gönderim
            using (var client = new SmtpClient())
            {
                try
                {
                    // Gmail SMTP sunucusu için bağlantı örneği
                    client.Connect("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);
                    client.Authenticate("ali@bizebirilazim.com", "7415963**iiLA"); // E-posta adresi ve şifre

                    client.Send(message);
                    client.Disconnect(true);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"E-posta gönderimi başarısız: {ex.Message}");
                }
            }

            return Result.Success();
        }
    }
}