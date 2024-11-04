using BBL.Core.Models.API.Employee;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BBL.Business.ValidationRules.FluentValidation.API.EmployeeValidaiton.AbilityInformation
{
    public class EditAbilityInformationValidator : AbstractValidator<AddAbilityInformationModel>
    {
        public EditAbilityInformationValidator()
        {


            RuleFor(x => x.Degree)
                .ExZoreControl();
        }
    }
}
