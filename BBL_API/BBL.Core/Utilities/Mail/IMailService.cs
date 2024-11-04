using BBL.Core.Utilities.Results;

namespace BBL.Core.Utilities.Mail
{
    public interface IMailService
    {
        Task<IResult> Send(EmailMessage emailMessage);
    }
}