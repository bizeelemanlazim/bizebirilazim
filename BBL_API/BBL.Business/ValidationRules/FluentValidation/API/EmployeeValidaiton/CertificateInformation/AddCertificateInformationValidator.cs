using BBL.Core.Models.API.Employee;
using FluentValidation;

namespace BBL.Business.ValidationRules.FluentValidation.API.EmployeeValidaiton.CertificateInformation
{
    public class AddCertificateInformationValidator : AbstractValidator<AddCertificateInformationModel>
    {
        public AddCertificateInformationValidator()
        {
            RuleFor(x => x.CertificateName)
               .ExNotEmptyAndNotNull();

            RuleFor(x => x.CertificationInstitution)
                .ExNotEmptyAndNotNull();

           
        }
    }
}