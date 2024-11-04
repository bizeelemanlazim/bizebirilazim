using BBL.Core.Models.API.Employee;
using FluentValidation;

namespace BBL.Business.ValidationRules.FluentValidation.API.EmployeeValidaiton.CertificateInformation
{
    public class EditCertificateInformationValidator : AbstractValidator<EditCertificateInformationModel>
    {
        public EditCertificateInformationValidator()
        {
            RuleFor(x => x.Id)
              .ExZoreControl();

            RuleFor(x => x.CertificateName)
               .ExNotEmptyAndNotNull();

            RuleFor(x => x.CertificationInstitution)
                .ExNotEmptyAndNotNull();

            
        }
    }
}