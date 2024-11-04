using BBL.Core.Models.API.Employee;
using FluentValidation;

namespace BBL.Business.ValidationRules.FluentValidation.API.EmployeeValidaiton.WorkExperience
{
    public class AddWorkExperienceValidator : AbstractValidator<AddWorkExperienceModel>
    {
        public AddWorkExperienceValidator()
        {
            RuleFor(x => x.JobId).ExZoreControl();

            RuleFor(x => x.WorkingTypeId).ExZoreControl();

            RuleFor(x => x.IsWorking)
                .Must(x => x == false || x == true)
                .WithMessage("Lütfen geçerli bir değer girin");

            //RuleFor(x => x.StartDate).emp().WithMessage("Lütfen geçerli bir değer girin");

            //When(x => x.EndDate.ep, () =>
            //{
            //    RuleFor(x => x.EndDate).ExDate();
            //});

            RuleFor(x => x.WorkingCompany).ExNotEmptyAndNotNull();
        }
    }
}
