using BBL.Core.Models.API.Employee;
using FluentValidation;

namespace BBL.Business.ValidationRules.FluentValidation.API.EmployeeValidaiton.BankAndPersonalInformation
{
    public class EditBankAndPersonalInformationValidator : AbstractValidator<EditBankAndPersonalInformationModel>
    {
        public EditBankAndPersonalInformationValidator()
        {
            RuleFor(x => x.Id)
                .ExZoreControl();

            RuleFor(x => x.BankName)
               .ExNotEmptyAndNotNull()
               .MaximumLength(100)
               .WithMessage("En fazla 100 karakter olabilir");

            RuleFor(x => x.BranchName)
              .ExNotEmptyAndNotNull()
              .MaximumLength(100)
              .WithMessage("En fazla 100 karakter olabilir");

            RuleFor(x => x.BranchCode)
              .ExNotEmptyAndNotNull()
              .MaximumLength(100)
              .WithMessage("En fazla 100 karakter olabilir");

            RuleFor(x => x.AccountName)
              .ExNotEmptyAndNotNull()
              .MaximumLength(100)
              .WithMessage("En fazla 100 karakter olabilir");

            RuleFor(x => x.IBAN)
              .ExNotEmptyAndNotNull()
              .MinimumLength(26)
              .MaximumLength(26)
              .WithMessage("Lütfen geçerli bir IBAN giriniz. Örn:TR330006100519786457841326");

            RuleFor(x => x.TCIdentityNumber)
               .ExNotEmptyAndNotNull()
               .MaximumLength(11)
               .MinimumLength(11)
               .WithMessage("Lütfen 11 karakter olacak şekilde giriniz.")
               .Custom((x, context) =>
               {
                   if (x.ToCharArray().Where(y => !Char.IsNumber(y)).Count() > 0)
                       context.AddFailure(context.DisplayName, "Lütfen sadece sayısal değer giriniz");
               });

            //RuleFor(x => x.ExpiryDate)
            //    .ExDate();

            RuleFor(x => x.FatherName)
              .ExNotEmptyAndNotNull()
              .MaximumLength(50)
              .WithMessage("En fazla 50 karakter olabilir");

            RuleFor(x => x.MotherName)
              .ExNotEmptyAndNotNull()
              .MaximumLength(50)
              .WithMessage("En fazla 50 karakter olabilir");

            RuleFor(x => x.IssuingAuthority)
              .ExNotEmptyAndNotNull()
              .MaximumLength(100)
              .WithMessage("En fazla 100 karakter olabilir");

            RuleFor(x => x.SettlementBarcodeNumber)
              .ExNotEmptyAndNotNull()
              .MaximumLength(100)
              .WithMessage("En fazla 100 karakter olabilir");

            RuleFor(x => x.CriminalRecordBarcodeNumber)
              .ExNotEmptyAndNotNull()
              .MaximumLength(100)
              .WithMessage("En fazla 100 karakter olabilir");
        }
    }
}