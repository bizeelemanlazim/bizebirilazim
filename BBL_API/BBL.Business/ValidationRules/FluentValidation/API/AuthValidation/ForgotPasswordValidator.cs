using BBL.Core.Models.API.Auth;
using FluentValidation;

namespace BBL.Business.ValidationRules.FluentValidation.API.AuthValidation
{
    public class ForgotPasswordValidator : AbstractValidator<ForgotPasswordSendModel>
    {
        public ForgotPasswordValidator()
        {
            RuleFor(x => x.Token).ExNotEmptyAndNotNull();

            RuleFor(x => x.UserId).ExNotEmptyAndNotNull();

            RuleFor(x => x.Password).ExPassword();

            RuleFor(x => x.ConfirmPassword).ExPassword();

            RuleFor(x => x).Custom((x, context) =>
            {
                if (x.Password != x.ConfirmPassword)
                    context.AddFailure(nameof(x.Password), ResultMessages.PasswordsShouldMatch);
            });
        }
    }
}