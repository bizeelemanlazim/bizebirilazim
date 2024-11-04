using BBL.Core.Models.API.Employee;
using FluentValidation;

namespace BBL.Business.ValidationRules.FluentValidation.API.EmployeeValidaiton.SkillInformation
{
    public class EditSkillInformationValidator : AbstractValidator<EditSkillInformationModel>
    {
        public EditSkillInformationValidator()
        {
            RuleFor(x => x.Id).ExZoreControl();

            RuleFor(x => x.SkillName).ExNotEmptyAndNotNull();

            RuleFor(x => x.Rating)
                .InclusiveBetween(1, 5)
                .WithMessage("Lütfen 1-5 arasında bir değer giriniz");
        }
    }
}