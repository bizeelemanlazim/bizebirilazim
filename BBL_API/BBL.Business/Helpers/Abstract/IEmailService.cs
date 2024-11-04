using BBL.Core.Utilities.Mail;
using BBL.Core.Utilities.Results;

namespace BBL.Business.Helpers.Abstract
{
    public interface IEmailService
    {
        Task<IResult> SendEmail(EmailMessage emailMessage);
        Task<IResult> ConfirmEmailSend(string userId, string url);
        Task<IResult> ResetPasswordMailSend(string userId, string url);
    }
}