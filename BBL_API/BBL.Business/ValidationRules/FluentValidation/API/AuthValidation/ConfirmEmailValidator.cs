using BBL.Core.Models.API.Auth;
using FluentValidation;

namespace BBL.Business.ValidationRules.FluentValidation.API.AuthValidation
{
    public class ConfirmEmailValidator : AbstractValidator<ConfirmEmailModel>
    {
        public ConfirmEmailValidator()
        {
            RuleFor(x => x.Token).ExNotEmptyAndNotNull();

            RuleFor(x => x.UserId).ExNotEmptyAndNotNull();
        }
    }
}