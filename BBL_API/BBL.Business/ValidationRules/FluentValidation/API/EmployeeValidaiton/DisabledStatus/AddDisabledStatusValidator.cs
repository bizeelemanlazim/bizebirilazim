using BBL.Core.Models.API.Employee;
using FluentValidation;

namespace BBL.Business.ValidationRules.FluentValidation.API.EmployeeValidaiton.DisabledStatus
{
    public class AddDisabledStatusValidator : AbstractValidator<AddDisabledStatusModel>
    {
        public AddDisabledStatusValidator()
        {
            RuleFor(x => x.CategoryId)
                .ExZoreControl();

            RuleFor(x => x.Percentage)
                .ExZoreControl();

            RuleFor(x => x.IsHealthReport)
                .Must(x => x == false || x == true)
                .WithMessage("Lütfen geçerli bir değer girin");

            RuleFor(x => x.IsChronicHealth)
                .Must(x => x == false || x == true)
                .WithMessage("Lütfen geçerli bir değer girin");

            RuleFor(x => x.IsContinuousMedicationUse)
                .Must(x => x == false || x == true)
                .WithMessage("Lütfen geçerli bir değer girin");

            RuleFor(x => x.IsLossOfConsciousness)
                .Must(x => x == false || x == true)
                .WithMessage("Lütfen geçerli bir değer girin");

            RuleFor(x => x.IsInfectiousDisease)
                .Must(x => x == false || x == true)
                .WithMessage("Lütfen geçerli bir değer girin");
        }
    }
}