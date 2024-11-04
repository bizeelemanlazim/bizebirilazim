using BBL.Core.Models.API.Employee;
using FluentValidation;

namespace BBL.Business.ValidationRules.FluentValidation.API.EmployeeValidaiton.SocialMediaInformation
{
    public class AddSocialInformationValidator : AbstractValidator<AddSocialMediaInformationModel>
    {
        public AddSocialInformationValidator()
        {
            RuleFor(x => x.YoutubeLink)
                .ExNotEmptyAndNotNull()
                .MaximumLength(100)
                .WithMessage("En fazla 100 karakter olabilir");

            RuleFor(x => x.LinkedinLink)
                .ExNotEmptyAndNotNull()
                .MaximumLength(100)
                .WithMessage("En fazla 100 karakter olabilir");

            RuleFor(x => x.InstagramLink)
                .ExNotEmptyAndNotNull()
                .MaximumLength(100)
                .WithMessage("En fazla 100 karakter olabilir");

            RuleFor(x => x.FacebookLink)
                .ExNotEmptyAndNotNull()
                .MaximumLength(100)
                .WithMessage("En fazla 100 karakter olabilir");

            RuleFor(x => x.TwitterLink)
                .ExNotEmptyAndNotNull()
                .MaximumLength(100)
                .WithMessage("En fazla 100 karakter olabilir");
        }
    }
}
