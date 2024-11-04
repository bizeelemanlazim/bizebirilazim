using BBL.Core.Models.API.Company;
using FluentValidation;

namespace BBL.Business.ValidationRules.FluentValidation.API.CompanyValidation
{
    public class EditCompanyValidator : AbstractValidator<EditCompanyModel>
    {
        public EditCompanyValidator()
        {
            RuleFor(x => x.Id).ExZoreControl();

            RuleFor(x => x.CompanyName).ExNotEmptyAndNotNull();
        }
    }
}
