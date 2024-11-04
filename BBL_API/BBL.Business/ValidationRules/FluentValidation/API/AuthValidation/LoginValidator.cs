using BBL.Core.Models.API.Auth;
using FluentValidation;

namespace BBL.Business.ValidationRules.FluentValidation.API.AuthValidation
{
    public class LoginValidator : AbstractValidator<LoginModel>
    {
        public LoginValidator()
        {
            RuleFor(x => x.Email).ExEmail();

            RuleFor(x => x.Password).ExPassword();
        }
    }
}