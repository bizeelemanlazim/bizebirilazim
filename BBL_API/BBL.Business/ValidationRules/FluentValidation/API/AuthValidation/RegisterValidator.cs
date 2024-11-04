using BBL.Core.Enums;
using BBL.Core.Models.API.Auth;
using FluentValidation;

namespace BBL.Business.ValidationRules.FluentValidation.API.AuthValidation
{
    public class RegisterValidator : AbstractValidator<RegisterModel>
    {
        public RegisterValidator()
        {
            RuleFor(x => x.UserTypeId).ExZoreControl();

            RuleFor(x => x.FirstName).ExNotEmptyAndNotNull();

            RuleFor(x => x.LastName).ExNotEmptyAndNotNull();

            RuleFor(x => x.PhoneNumber).ExPhone();

            RuleFor(x => x.Email).ExEmail();

            RuleFor(x => x.Password).ExPassword();

            RuleFor(x => x.ConfirmPassword)
            .ExPassword()
            .NotEmpty().WithMessage("Şifre tekrarı boş olamaz")
            .Equal(x => x.Password).WithMessage(ResultMessages.PasswordsShouldMatch);

            When(x => x.UserTypeId == (int)UserType.Employer, () =>
            {
                RuleFor(x => x.CommercialTitle)
                    .ExNotEmptyAndNotNull();
            });
        }
    }
}