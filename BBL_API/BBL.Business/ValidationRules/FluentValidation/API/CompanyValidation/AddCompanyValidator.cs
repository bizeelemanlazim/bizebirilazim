using BBL.Core.Models.API.Company;
using FluentValidation;

namespace BBL.Business.ValidationRules.FluentValidation.API.CompanyValidation
{
    public class AddCompanyValidator : AbstractValidator<AddCompanyModel>
    {
        public AddCompanyValidator()
        {
            RuleFor(x => x.CompanyName).ExNotEmptyAndNotNull();
        }
    }
}
