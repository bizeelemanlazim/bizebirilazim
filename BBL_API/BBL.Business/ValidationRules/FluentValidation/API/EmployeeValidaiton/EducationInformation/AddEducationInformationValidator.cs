using BBL.Core.Models.API.Employee;
using FluentValidation;

namespace BBL.Business.ValidationRules.FluentValidation.API.EmployeeValidaiton.EducationInformation
{
    public class AddEducationInformationValidator : AbstractValidator<AddEducationInformationModel>
    {
        public AddEducationInformationValidator()
        {
            RuleFor(x => x.School).ExNotEmptyAndNotNull();

            RuleFor(x => x.Section).ExNotEmptyAndNotNull();

            //RuleFor(x => x.StartDate).ExDate();

            //When(x => !string.IsNullOrEmpty(x.EndDate), () =>
            //{
            //    RuleFor(x => x.EndDate).ExDate();
            //});

            RuleFor(x => x.IsContinue)
                .Must(x => x == false || x == true)
                .WithMessage("Lütfen geçerli bir değer girin");

            RuleFor(x => x.IsBreak)
                .Must(x => x == false || x == true)
                .WithMessage("Lütfen geçerli bir değer girin");

        }
    }
}
