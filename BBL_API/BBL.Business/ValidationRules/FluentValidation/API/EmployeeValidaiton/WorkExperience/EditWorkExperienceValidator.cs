using BBL.Core.Models.API.Employee;
using FluentValidation;

namespace BBL.Business.ValidationRules.FluentValidation.API.EmployeeValidaiton.WorkExperience
{
    public class EditWorkExperienceValidator : AbstractValidator<EditWorkExperienceModel>
    {
        public EditWorkExperienceValidator()
        {
            RuleFor(x => x.Id).ExZoreControl();

            RuleFor(x => x.JobId).ExZoreControl();

            RuleFor(x => x.WorkingTypeId).ExZoreControl();

            RuleFor(x => x.IsWorking)
                .Must(x => x == false || x == true)
                .WithMessage("Lütfen geçerli bir değer girin");

            //RuleFor(x => x.StartDate).ExDate();

            //When(x => !String.IsNullOrEmpty(x.EndDate), () =>
            //{
            //    RuleFor(x => x.EndDate).ExDate();
            //});

            RuleFor(x => x.WorkingCompany).ExNotEmptyAndNotNull();
        }
    }
}
