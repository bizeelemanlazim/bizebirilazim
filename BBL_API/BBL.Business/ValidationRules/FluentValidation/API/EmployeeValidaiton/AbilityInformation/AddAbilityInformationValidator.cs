using BBL.Core.Models.API.Employee;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BBL.Business.ValidationRules.FluentValidation.API.EmployeeValidaiton.AbilityInformation
{
    public class AddAbilityInformationValidator : AbstractValidator<AddAbilityInformationModel>
    {
        public AddAbilityInformationValidator()
        {
      


            RuleFor(x => x.Degree)
                .ExZoreControl();
        }
    }
}
