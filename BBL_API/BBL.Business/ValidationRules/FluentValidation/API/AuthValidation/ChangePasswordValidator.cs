using BBL.Core.Models.API.Auth;
using FluentValidation;

namespace BBL.Business.ValidationRules.FluentValidation.API.AuthValidation
{
    public class ChangePasswordValidator : AbstractValidator<ChangePasswordModel>
    {
        public ChangePasswordValidator()
        {
            RuleFor(x => x.NewPassword).ExPassword();

            RuleFor(x => x.ConfirmPassword).ExPassword();

            RuleFor(x => x).Custom((x, context) =>
            {
                if (x.NewPassword != x.ConfirmPassword)
                    context.AddFailure(nameof(x.NewPassword), ResultMessages.PasswordsShouldMatch);
            });
        }
    }
}