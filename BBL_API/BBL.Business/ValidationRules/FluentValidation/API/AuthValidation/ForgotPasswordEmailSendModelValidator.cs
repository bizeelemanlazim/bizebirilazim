using BBL.Core.Models.API.Auth;
using FluentValidation;

namespace BBL.Business.ValidationRules.FluentValidation.API.AuthValidation
{
    public class ForgotPasswordEmailSendModelValidator : AbstractValidator<ForgotPasswordEmailSendModel>
    {
        public ForgotPasswordEmailSendModelValidator()
        {
            RuleFor(x => x.Email).ExEmail();
        }
    }
}