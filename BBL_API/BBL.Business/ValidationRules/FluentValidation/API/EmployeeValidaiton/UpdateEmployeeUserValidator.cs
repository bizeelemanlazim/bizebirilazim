using BBL.Core.Models.API.Employee;
using FluentValidation;

namespace BBL.Business.ValidationRules.FluentValidation.API.EmployeeValidaiton
{
    public class UpdateEmployeeUserValidator : AbstractValidator<EditEmployeeUserModel>
    {
        public UpdateEmployeeUserValidator()
        {
            RuleFor(x => x.CityId).ExZoreControl();

            RuleFor(x => x.DistrictId).ExZoreControl();

            RuleFor(x => x.GenderId).ExZoreControl();

            RuleFor(x => x.MaritalStatusId).ExZoreControl();

            RuleFor(x => x.DrivingLicenceId).ExZoreControl();

            RuleFor(x => x.NationalityId).ExZoreControl();

            RuleFor(x => x.FirstName).ExNotEmptyAndNotNull();

            RuleFor(x => x.LastName).ExNotEmptyAndNotNull();

            RuleFor(x => x.PhoneNumber).ExPhone();

            // When(x => !string.IsNullOrEmpty(x.SecondPhoneNumber), () =>
            // {
            //     RuleFor(x => x.SecondPhoneNumber).ExPhone();
            // });

            //RuleFor(x => x.BirthDate).ExDate();

            RuleFor(x => x.Address).ExNotEmptyAndNotNull();
        }
    }
}